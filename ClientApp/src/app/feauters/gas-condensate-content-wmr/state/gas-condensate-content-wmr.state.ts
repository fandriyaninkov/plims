import { Injectable } from '@angular/core';
import { Action, Actions, ofActionSuccessful, Selector, State, StateContext, Store } from '@ngxs/store';
import * as moment from 'moment';
import { TreeNode } from 'primeng/api';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { forkJoin, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CreateNewElement, DeleteSelectedElement, DisableCreateButton, DisableEditDeleteButtons, EditSelectedElement } from 'src/app/core/actions/toolbar.actions';
import { ChemicalAnalysisTreeItem, GasCondensateContentWmrService, GasCondensateContentWmrViewModel, SamplingPlacesService, SamplingPlaceViewModel, SamplingPointsService, TimeScaleBoundingViewModel, UserService, UserShortInfoViewModel } from 'src/app/core/nswag/plims-generated';
import { NotificationService } from 'src/app/core/services/notification.service';
import { GetGasCondensateContentWmrAnalyzes, GetPlacesTree, GetPointsTree, ResetSelectedTreeItems, SetSamplingDateRange , SetSelectedPlaceAndPointId, GetPoints, OpenGasCondensateContentWmrCreateWindow, OpenGasCondensateContentWmrEditWindow, SetLaboratoryAssistants, SetAnalysisInfo, SetSelectedAnalysisId, CreateGasCondensateContentWmr, UpdateGasCondensateContentWmr, DeleteGasCondensateContentWmr, SetSelectedTab, LoadingData, GetChartInfo, SetTimeAxisBounding } from '../actions/gas-condensate-content-wmr.actions';
import { GasCondensateContentWmrDetailsComponent } from '../components/gas-condensate-content-wmr-details/gas-condensate-content-wmr-details.component';
import { GasCondensateContentWmrDialogData } from '../components/gas-condensate-content-wmr-details/gas-condensate-content-wmr-dialog-data';
import { GasCondensateContentWmrStateModel, TabType } from './gas-condensate-content-wmr-state-model';

@State<GasCondensateContentWmrStateModel>({
  name: 'gasCondensateContentWMR',
  defaults: {
    treeNodes: [],
    selectedPlaceId: null,
    selectedPointId: null,
    startSamplingDate: null,
    endSamplingDate: null,
    laboratoryAssistants: [],
    points: [],
    analyzes: [],
    analysisInfo: null,
    selectedAnalysId: null,
    activeTab: TabType.Table,
    chartInfo: null,
    timeAxisBounding: null
  }
})
@Injectable()
export class GasCondensateContentWmrState {

  @Selector()
  static treeNodes(state: GasCondensateContentWmrStateModel) {
    return state.treeNodes;
  }

  @Selector()
  static analysis(state: GasCondensateContentWmrStateModel) {
    return state.analyzes;
  }

  constructor(
    private _placesService: SamplingPlacesService,
    private _pointsService: SamplingPointsService,
    private _actions: Actions,
    private _store: Store,
    private _dialogService: DialogService,
    private _userService: UserService,
    private _gasCondensateContentWmr: GasCondensateContentWmrService,
    private _notificationService: NotificationService
  ) {
    this._store.dispatch(new DisableEditDeleteButtons(true));
    this._actions.pipe(ofActionSuccessful(CreateNewElement)).subscribe(() => {
      this._store.dispatch(new OpenGasCondensateContentWmrCreateWindow());
    });
    this._actions.pipe(ofActionSuccessful(EditSelectedElement)).subscribe(() => {
      this._store.dispatch(new OpenGasCondensateContentWmrEditWindow());
    });
    this._actions.pipe(ofActionSuccessful(DeleteSelectedElement)).subscribe(() => {
      this._store.dispatch(new DeleteGasCondensateContentWmr());
    });
  }

  @Action(GetPlacesTree)
  getPlacesTree({patchState}: StateContext<GasCondensateContentWmrStateModel>) {
    return this._placesService.getTree()
      .pipe(tap((res => {
        const treeNodes = new Array<TreeNode>();
        res.forEach(item => {
          const node = {
            label: item.name,
            data: item,
            leaf: false,
            expandedIcon: 'pi pi-folder-open',
            collapsedIcon: 'pi pi-folder'
          } as TreeNode;
          treeNodes.push(node);
        })
        patchState({treeNodes});
      })));
  }

  @Action(GetPointsTree)
  getPointsTree({getState, patchState}: StateContext<GasCondensateContentWmrStateModel>, {placeId}: GetPointsTree) {
    const state = getState();
    return this._pointsService.getPointChildItems(placeId)
      .pipe(tap((res) => {
        const children = new Array<TreeNode>();
        res.forEach(item => {
          const node = {
            label: item.name,
            data: item,
            expandedIcon: 'pi pi-folder-open',
            collapsedIcon: 'pi pi-folder'
          } as TreeNode;
          children.push(node);
        });
        const treeNodes = state.treeNodes;
        treeNodes.filter(x => x.data.id === placeId).map(x => x.children = children);
        patchState({treeNodes: [...treeNodes]});
      }));
  }

  @Action(ResetSelectedTreeItems)
  resetSelectedTreeItems({patchState, dispatch}: StateContext<GasCondensateContentWmrStateModel>) {
    patchState({selectedPlaceId: null, selectedPointId: null});
    dispatch(new DisableCreateButton(true));
  }

  @Action(SetSamplingDateRange)
  setSamplingDateRange({patchState, dispatch}: StateContext<GasCondensateContentWmrStateModel>,
                       {startDate, endDate}: SetSamplingDateRange ) {
    patchState({startSamplingDate: startDate, endSamplingDate: endDate});
    dispatch(new LoadingData());
  }

  @Action(GetGasCondensateContentWmrAnalyzes)
  getGasCondensateContentWmrAnalysis({getState, patchState}: StateContext<GasCondensateContentWmrStateModel>) {
    const state = getState();
    if (!state.selectedPlaceId) {
      return;
    }
    return this._gasCondensateContentWmr.getGasCondensateContentWmrByFilter(state.selectedPlaceId,
      state.selectedPointId, state.startSamplingDate, state.endSamplingDate)
      .pipe(tap((res) => {
        patchState({analyzes: res});
      }));
  }

  @Action(SetSelectedPlaceAndPointId)
  setSelectedPlaceOrPointId({patchState, dispatch, getState}: StateContext<GasCondensateContentWmrStateModel>,
                            {placeId, pointId}: SetSelectedPlaceAndPointId) {
    const state = getState();
    if (state.selectedPlaceId === placeId && state.selectedPointId === pointId) {
      return;
    }
    patchState({selectedPlaceId: placeId, selectedPointId: pointId});
    const disableButtons = placeId === undefined || placeId === null;
    dispatch(new DisableCreateButton(disableButtons));
    dispatch(new GetPoints());
    dispatch(new LoadingData());
  }

  @Action(GetPoints)
  getPoints({getState, patchState}: StateContext<GasCondensateContentWmrStateModel>) {
    const state = getState();
    if (!state.selectedPlaceId) {
      return;
    }
    return this._pointsService.getSamplingPointsByPlaceId(state.selectedPlaceId)
      .pipe(tap((res => {
        patchState({points: res});
      })));
  }

  @Action(OpenGasCondensateContentWmrCreateWindow)
  openGasCondensateContentWmrCreateWindow({getState, dispatch}: StateContext<GasCondensateContentWmrStateModel>) {
    const state = getState();
    if (state.laboratoryAssistants.length > 0) {
      this._dialogService.open(GasCondensateContentWmrDetailsComponent, this.getDialogConfig(state, true));
      return;
    }
    return this._userService.getShortUserInfo()
      .pipe(tap((res) => {
        dispatch(new SetLaboratoryAssistants(res));
        this._dialogService.open(GasCondensateContentWmrDetailsComponent, this.getDialogConfig(getState()));
      }));
  }

  @Action(OpenGasCondensateContentWmrEditWindow)
  openGasCondensateContentWmrEditWindow({getState, dispatch}: StateContext<GasCondensateContentWmrStateModel>) {
    const state = getState();
    if (!state.selectedAnalysId) {
      const message = 'Отсутствует выбранный анализ!';
      this._notificationService.sendErrorMessage(message);
      throw new Error(message);
      return;
    }
    if (state.laboratoryAssistants.length > 0) {
      return this._gasCondensateContentWmr.getGasCondensateContentWmrById(state.selectedAnalysId)
        .pipe(tap((result) => {
          dispatch(new SetAnalysisInfo(result));
          this._dialogService.open(GasCondensateContentWmrDetailsComponent,
            this.getDialogConfig(getState()));
        }));
    }
    const gettingUser = this._userService.getShortUserInfo();
    const getAnalysisInfo = this._gasCondensateContentWmr.getGasCondensateContentWmrById(state.selectedAnalysId);
    return forkJoin([gettingUser, getAnalysisInfo]).pipe(tap((result) => {
      const assistants = result[0] as UserShortInfoViewModel[];
      if (assistants) {
        dispatch(new SetLaboratoryAssistants(assistants));
      }
      const analysis = result[1] as GasCondensateContentWmrViewModel;
      if (analysis) {
        dispatch(new SetAnalysisInfo(analysis));
      }
      this._dialogService.open(GasCondensateContentWmrDetailsComponent,
        this.getDialogConfig(getState()));
    }));
  }

  @Action(SetLaboratoryAssistants)
  setLaboratoryAssistants({patchState}: StateContext<GasCondensateContentWmrStateModel>, {users}: SetLaboratoryAssistants) {
    patchState({laboratoryAssistants: users});
  }

  @Action(SetAnalysisInfo)
  setAnalysisInfo({patchState}: StateContext<GasCondensateContentWmrStateModel>, {analysisInfo}: SetAnalysisInfo) {
    patchState({analysisInfo});
  }

  @Action(SetSelectedAnalysisId)
  setSelectedAnalysisId({patchState, dispatch}: StateContext<GasCondensateContentWmrStateModel>, {analysisId}: SetSelectedAnalysisId) {
    patchState({selectedAnalysId: analysisId});
    const disable = analysisId === undefined || analysisId === null;
    dispatch(new DisableEditDeleteButtons(disable));
  }

  @Action(CreateGasCondensateContentWmr)
  createGasCondensateContentWmr({dispatch}: StateContext<GasCondensateContentWmrStateModel>, {model}: CreateGasCondensateContentWmr) {
    return this._gasCondensateContentWmr.createGasCondensateContentWmr(model)
      .pipe(tap((result) => {
        dispatch(new LoadingData());
        this._notificationService.sendCreateElementMessage('Создан новый анализ!');
      }));
  }

  @Action(UpdateGasCondensateContentWmr)
  updateGasCondensateContentWmr({dispatch}: StateContext<GasCondensateContentWmrStateModel>, {model}: UpdateGasCondensateContentWmr) {
    return this._gasCondensateContentWmr.updateGasCondensateContentWmr(model)
      .pipe(tap(() => {
        dispatch(new LoadingData());
        this._notificationService.sendEditElementMessage('Данные анализа изменены!');
      }));
  }

  @Action(DeleteGasCondensateContentWmr)
  deleteGasCondensateContentWmr({getState, dispatch}: StateContext<GasCondensateContentWmrStateModel>) {
    const state = getState();
    if (!state.selectedAnalysId) {
      const message = 'Не выбран анализ для удаления';
      this._notificationService.sendErrorMessage(message);
      throw new Error(message);
      return;
    }
    return this._gasCondensateContentWmr.deleteGasCondensateContentWmr(state.selectedAnalysId)
      .pipe(tap(() => {
        dispatch(new SetSelectedAnalysisId(null));
        dispatch(new LoadingData());
        this._notificationService.sendDeleteElementMessage('Анализ удален!');
      }));
  }

  @Action(SetSelectedTab)
  setSelectedTab({patchState, dispatch}: StateContext<GasCondensateContentWmrStateModel>, {activeTab}: SetSelectedTab) {
    patchState({activeTab});
    dispatch(new LoadingData());
  }

  @Action(LoadingData)
  loadingDate({getState, dispatch}: StateContext<GasCondensateContentWmrStateModel>) {
    const state = getState();
    if (!state.selectedPlaceId) {
      return;
    }
    console.log('i am from LoadData actveTab:', state.activeTab);
    switch (state.activeTab) {
      case TabType.Table: dispatch(new GetGasCondensateContentWmrAnalyzes()); break;
      case TabType.Chart: dispatch(new GetChartInfo()); break;
    }
  }

  @Action(GetChartInfo)
  getChartInfo({getState, patchState}: StateContext<GasCondensateContentWmrStateModel>) {
    const state = getState();
    const startDate = state.timeAxisBounding.startDate;
    const endDate = state.timeAxisBounding.endDate;
    return this._gasCondensateContentWmr.getChartInfoOfGasCondensateContentWmr(state.selectedPlaceId,
                                                                               state.selectedPointId,
                                                                               startDate, endDate)
      .pipe(tap((result) => {
        patchState({chartInfo: result});
      }));
  }

  @Action(SetTimeAxisBounding)
  setTimeAxisBounding({patchState}: StateContext<GasCondensateContentWmrStateModel>, {startDate, endDate}: SetTimeAxisBounding) {
    if (!startDate) {
      // startDate = new Date(moment().subtract(30, 'days').calendar());
      startDate = new Date('2020-02-01T00:00:00');
    }
    if (!endDate) {
      endDate = new Date();
    }
    const timeAxisBounding = {
      startDate,
      endDate
    } as TimeScaleBoundingViewModel;
    patchState({timeAxisBounding});
  }

  private getDialogConfig(state: GasCondensateContentWmrStateModel, isCreateWindow = false) {
    const title = isCreateWindow ? 'Создание анализа: Содержание газового конденсата в ВМР' :
      'Редактирование анализа: Содержание газового конденсата в ВМР';
    const analysis = isCreateWindow ? null : state.analysisInfo;
    const data = {
      assistants: state.laboratoryAssistants,
      place: this.getSelectedPlaceInfoFromTree(state),
      points: state.points,
      analysis
    } as GasCondensateContentWmrDialogData;
    return {
      header: title,
      width: '60%',
      data
    } as DynamicDialogConfig;
  }

  private getSelectedPlaceInfoFromTree(state: GasCondensateContentWmrStateModel) {
    const res = state.treeNodes.filter(x => x.data.id === state.selectedPlaceId).map(x => x.data as ChemicalAnalysisTreeItem)[0];
    if (!res) {
      throw Error('Не найдено выбранное место отбора');
    }

    return { id: res.id, name: res.name } as SamplingPlaceViewModel;
  }
}
