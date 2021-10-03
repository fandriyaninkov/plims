import { ChemicalAnalysisTreeItem, SamplingPlaceViewModel } from './../../../core/nswag/plims-generated';
import { GetPlacesTree, GetPointsTree, ResetSelectedPlaceAndPoint, SetSelectedPlaceAndPointIds } from './../actions/chemical-analyzes.actions';
import {
  State,
  Actions,
  ofActionSuccessful,
  Store,
  StateContext,
  Action,
  Selector,
} from '@ngxs/store';
import { Injectable } from '@angular/core';
import { CreateNewElement, DisableEditDeleteButtons, EditSelectedElement, DeleteSelectedElement, DisableCreateButton } from 'src/app/core/actions/toolbar.actions';
import {
  GetPoints,
  SetSamplingDate,
  GetAnalysis,
  SetSelectedAnalysis,
  DeleteSelectedAnalysis,
  SetLaboratoryAssistants,
  SetAnalysisInfo,
  OpenChemicalAnalyzesEditingModal,
  OpenChemicalAnalyzesCreatingModal,
  CreateChemicalAnalysis,
  UpdateChemicalAnalysis,
} from '../actions/chemical-analyzes.actions';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ChemicalAnalyzesDetailsComponent } from '../components/chemical-analyzes-details/chemical-analyzes-details.component';
import {
  SamplingPlacesService,
  SamplingPointsService,
  ChemicalAnalysisService,
  UserService,
  ChemicalAnalysisViewModel,
  UserShortInfoViewModel,
} from 'src/app/core/nswag/plims-generated';
import { tap } from 'rxjs/operators';
import { ChemicalAnalyzesStateModel } from './chemical-analyzes-state-model';
import { forkJoin } from 'rxjs';
import { ChemicalAnalysisDetailsData } from '../components/chemical-analyzes-details/chemical-analysis-details-data';
import { TreeNode } from 'primeng/api';

@State<ChemicalAnalyzesStateModel>({
  name: 'chemicalAnalyzes',
  defaults: {
    points: [],
    samplingDate: null,
    analysis: [],
    selectedAnalysis: null,
    analysisInfo: null,
    laboratoryAssistants: [],
    treeNodes: [],
    selectedPlaceId: null,
    selectedPointId: null
  },
})
@Injectable()
export class ChemicalAnalyzesState {

  @Selector()
  static analysis(state: ChemicalAnalyzesStateModel) {
    return state.analysis;
  }

  @Selector()
  static selectedAnalysis(state: ChemicalAnalyzesStateModel) {
    return state.selectedAnalysis;
  }

  @Selector()
  static assistants(state: ChemicalAnalyzesStateModel) {
    return state.laboratoryAssistants;
  }

  @Selector()
  static treeNodes(state: ChemicalAnalyzesStateModel) {
    return state.treeNodes;
  }

  constructor(
    private _actions: Actions,
    private _store: Store,
    private _dialogService: DialogService,
    private _placesService: SamplingPlacesService,
    private _pointsService: SamplingPointsService,
    private _chemicalAnalysisService: ChemicalAnalysisService,
    private _userService: UserService
  ) {
    this._store.dispatch(new DisableEditDeleteButtons(true));
    this._actions.pipe(ofActionSuccessful(CreateNewElement)).subscribe(() => {
      this._store.dispatch(new OpenChemicalAnalyzesCreatingModal());
    });
    this._actions.pipe(ofActionSuccessful(EditSelectedElement)).subscribe(() => {
      this._store.dispatch(new OpenChemicalAnalyzesEditingModal());
    });
    this._actions.pipe(ofActionSuccessful(DeleteSelectedElement)).subscribe(() => {
      this._store.dispatch(new DeleteSelectedAnalysis());
    })
  }

  @Action(OpenChemicalAnalyzesCreatingModal)
  openChemicalAnalyzesCreatingModal({ getState, dispatch }: StateContext<ChemicalAnalyzesStateModel>) {
    const state = getState();
    if (state.laboratoryAssistants.length > 0) {
      this._dialogService.open(ChemicalAnalyzesDetailsComponent, this.getDialogConfig(getState(), true));
      return;
    }
    return this._userService.getShortUserInfo().pipe(tap((result) => {
      dispatch(new SetLaboratoryAssistants(result));
      this._dialogService.open(ChemicalAnalyzesDetailsComponent, this.getDialogConfig(getState(), true));
    }))
    
  }

  @Action(OpenChemicalAnalyzesEditingModal)
  openChemicalAnalyzesEditingModal({getState, dispatch}: StateContext<ChemicalAnalyzesStateModel>) {
    const state = getState();
    if (!state.selectedAnalysis) {
      new Error('Отсутствует выбранный анализ!')
      return;
    }
    if (state.laboratoryAssistants.length > 0) {
      return this._chemicalAnalysisService.getAnalysisById(state.selectedAnalysis.id).pipe(
        tap((result) => {
          dispatch(new SetAnalysisInfo(result))
          this._dialogService.open(ChemicalAnalyzesDetailsComponent, this.getDialogConfig(getState(), false));
        })
      );
    }
    const gettingUsers = this._userService.getShortUserInfo();
    const gettingAnalysisInfo = this._chemicalAnalysisService.getAnalysisById(state.selectedAnalysis.id);
    return forkJoin([gettingUsers, gettingAnalysisInfo]).pipe(tap((result) => {
      const assistants = result[0] as UserShortInfoViewModel[];
      if (assistants) {
        dispatch(new SetLaboratoryAssistants(assistants));
      }
      const analysisInfo = result[1] as ChemicalAnalysisViewModel;
      if (analysisInfo) {
        dispatch(new SetAnalysisInfo(analysisInfo))
      }
      this._dialogService.open(ChemicalAnalyzesDetailsComponent, this.getDialogConfig(getState(), false));
    }))
  }

  @Action(GetPlacesTree)
  getPlacesTree({patchState}: StateContext<ChemicalAnalyzesStateModel>) {
    return this._placesService.getTree().pipe(
      tap((result) => {
        const treeNodes = new Array<TreeNode>();
        result.forEach(item => {
          const node = {
            label: item.name,
            data: item,
            leaf: false,
            expandedIcon: 'pi pi-folder-open',
            collapsedIcon: 'pi pi-folder'
          } as TreeNode;
          treeNodes.push(node);
        })
        patchState({treeNodes: treeNodes});
      })
    )
  }

  @Action(ResetSelectedPlaceAndPoint)
  resetSelectedPlaceAndPoint({patchState, dispatch}: StateContext<ChemicalAnalyzesStateModel>) {
    patchState({selectedPointId: null, selectedPlaceId: null});
    dispatch(new DisableCreateButton(true));
  }

  @Action(SetSelectedPlaceAndPointIds)
  setSelectedPlaceAndPointIds({ patchState, dispatch, getState }: StateContext<ChemicalAnalyzesStateModel>, payload: SetSelectedPlaceAndPointIds) {
    const state = getState();
    if (state.selectedPointId === payload.pointId && state.selectedPlaceId === payload.placeId) {
      return;
    }
    patchState({selectedPointId: payload.pointId, selectedPlaceId: payload.placeId});
    const disableButton = payload.placeId === undefined || payload.placeId === null;
    dispatch(new DisableCreateButton(disableButton));
    dispatch(new GetPoints());
    dispatch(new GetAnalysis());
  }

  @Action(GetPoints)
  getPoints({getState, patchState }: StateContext<ChemicalAnalyzesStateModel>) {
    const state = getState();
    if (!state.selectedPlaceId) {
      return;
    }
    return this._pointsService.getSamplingPointsByPlaceId(state.selectedPlaceId)
      .pipe(
        tap((result) => {
          patchState({ points: result });
        })
      );
  }

  @Action(GetPointsTree)
  getPointsTree({getState, patchState}: StateContext<ChemicalAnalyzesStateModel>, payload: GetPointsTree) {
    const state = getState();
    return this._pointsService.getPointChildItems(payload.placeId).pipe(tap((result) => {
      const children = new Array<TreeNode>();
      result.forEach(item => {
        const node = {
          label: item.name,
          data: item,
          expandedIcon: 'pi pi-folder-open',
          collapsedIcon: 'pi pi-folder'
        } as TreeNode;
        children.push(node);
      });
      const treeNodes = state.treeNodes;
      treeNodes.filter(x => x.data.id === payload.placeId).map(x => x.children = children);
      patchState({treeNodes: treeNodes});
    }));
  }

  @Action(SetSamplingDate)
  setSamplingDate({patchState, dispatch }: StateContext<ChemicalAnalyzesStateModel>, payload: SetSamplingDate) {
    patchState({samplingDate: payload.samplingDate});
    dispatch(new GetAnalysis());
  }

  @Action(GetAnalysis)
  getAnalysis({getState, patchState}: StateContext<ChemicalAnalyzesStateModel>) {
    const state = getState();
    if (!state.selectedPlaceId) {
      return;
    }
    return this._chemicalAnalysisService.getAnalysisByFilter(state.selectedPlaceId, state.selectedPointId , state.samplingDate)
    .pipe(tap((result) => {
      patchState({analysis: result});
    }));
  }

  @Action(SetSelectedAnalysis)
  setSelectedAnalysis({ patchState, dispatch }: StateContext<ChemicalAnalyzesStateModel>, payload: SetSelectedAnalysis) {
    patchState({selectedAnalysis: payload.analysis});
    const disable = payload.analysis === undefined || payload.analysis === null;
    dispatch(new DisableEditDeleteButtons(disable));
  }

  @Action(DeleteSelectedAnalysis)
  deleteSelectedAnalysis({getState, dispatch}: StateContext<ChemicalAnalyzesStateModel>) {
    const state = getState();
    if (!state.selectedAnalysis) {
      new Error('Не выбран анализ для удаления');
      return;
    }

    return this._chemicalAnalysisService.deleteAnalysis(state.selectedAnalysis.id)
      .pipe(tap((result) => {
        dispatch(new SetSelectedAnalysis(null));
        dispatch(new GetAnalysis());
      }))
  }

  @Action(SetLaboratoryAssistants)
  setLaboratoryAssistants({patchState}: StateContext<ChemicalAnalyzesStateModel>, payload: SetLaboratoryAssistants) {
    patchState({laboratoryAssistants: payload.assistants});
  }

  @Action(SetAnalysisInfo)
  setAnalysisInfo({patchState}: StateContext<ChemicalAnalyzesStateModel>, payload: SetAnalysisInfo) {
    patchState({analysisInfo: payload.analysisInfo});
  }

  @Action(CreateChemicalAnalysis)
  createChemicalAnalysis({dispatch}: StateContext<ChemicalAnalyzesStateModel>, payload: CreateChemicalAnalysis) {
    return this._chemicalAnalysisService.createAnalysis(payload.analysis).pipe(tap((result) => {
      dispatch(new GetAnalysis());
    }));
  }

  @Action(UpdateChemicalAnalysis)
  updateChemicalAnalysis({dispatch}: StateContext<ChemicalAnalyzesStateModel>, payload: UpdateChemicalAnalysis) {
    return this._chemicalAnalysisService.updateAnalysis(payload.analysis).pipe(tap((result) => {
      dispatch(new GetAnalysis());
    }))
  }

  private getDialogConfig(state: ChemicalAnalyzesStateModel, isCreatingDialog: boolean): DynamicDialogConfig {
    let analysis: ChemicalAnalysisViewModel;
    if (isCreatingDialog) {
      analysis = {} as ChemicalAnalysisViewModel;
    } else {
      analysis = state.analysisInfo;
    }
    const data = {
      analysisInfo: analysis,
      assistants: state.laboratoryAssistants,
      place: this.getSelectedPlaceInfoFromTree(state),
      points: state.points
    } as ChemicalAnalysisDetailsData;
    const dialogConfig = {
      header: 'Химический анализ',
      width: '60%',
      data
    } as DynamicDialogConfig;

    return dialogConfig;
  } 

  private getSelectedPlaceInfoFromTree(state: ChemicalAnalyzesStateModel) {
    const res = state.treeNodes.filter(x => x.data.id === state.selectedPlaceId).map(x => x.data as ChemicalAnalysisTreeItem)[0];
    if (!res) {
      throw Error('Не найдено выбранное место отбора');
    }

    return { id: res.id, name: res.name } as SamplingPlaceViewModel;
  }
}
