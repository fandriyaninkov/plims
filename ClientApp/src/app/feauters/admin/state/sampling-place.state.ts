import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { TreeNode } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DisableEditDeleteButtons } from 'src/app/core/actions/toolbar.actions';
import { SamplingPlacesService, SamplingPointsService } from 'src/app/core/nswag/plims-generated';
import { NotificationService } from 'src/app/core/services/notification.service';
import { CreatePlace, CreatePoint, DeletePlace, DeletePlaceOrPoint, DeletePoint, GetPlacesTree, GetPointsTree, OpenPlaceOrPointCreateWindow, OpenPlaceOrPointEditWindow, OpenSamplingPlaceCreatingWindow, OpenSamplingPlaceEditingWindow, OpenSamplingPointCreateWindow, OpenSamplingPointEditWindow, SetSelectedPlaceId, SetSelectedPointId, UpdatePlace, UpdatePoint } from '../actions/admin.actions';
import { SamplingPlaceDetailsComponent } from '../components/sampling-place/sampling-place-details/sampling-place-details.component';
import { SamplingPointDetailsComponent } from '../components/sampling-place/sampling-point-details/sampling-point-details.component';
import { SamplingPointDialogData } from '../components/sampling-place/sampling-point-details/sampling-point-dialog-data';
import { SelectCreateWindowComponent } from '../components/sampling-place/select-create-window/select-create-window.component';
import { SamplingPlaceStateModel } from './admin-model';

@State<SamplingPlaceStateModel>({
  name: 'samplingPlace',
  defaults: {
    treeNodes: [],
    selectedPlaceId: null,
    selectedPointId: null,
    loadingTree: false
  }
})
@Injectable()
export class SamplingPlaceState {

  @Selector()
  static treeNodes(state: SamplingPlaceStateModel) {
    return state.treeNodes;
  }

  @Selector()
  static loadingTree(state: SamplingPlaceStateModel) {
    return state.loadingTree;
  }

  constructor(
    private _placesService: SamplingPlacesService,
    private _pointsService: SamplingPointsService,
    private _dialogService: DialogService,
    private _notificationService: NotificationService
  ) {}

  @Action(GetPlacesTree)
  getPlacesTree({patchState}: StateContext<SamplingPlaceStateModel>) {
    patchState({loadingTree: true});
    return this._placesService.getTree().pipe(
      tap((result) => {
        const treeNodes = new Array<TreeNode>();
        result.forEach(item => {
          const node = {
            data: item,
            leaf: false,
            children: []
          } as TreeNode;
          treeNodes.push(node);
        });
        patchState({treeNodes: [...treeNodes], loadingTree: false});
      })
    );
  }

  @Action(SetSelectedPlaceId)
  setSelectedPlacesIdAndPointId({patchState, dispatch}: StateContext<SamplingPlaceStateModel>,
                                {placeId}: SetSelectedPlaceId) {
    patchState({selectedPlaceId: placeId, selectedPointId: null});
    const disableButtons = placeId === undefined || placeId === null;
    dispatch(new DisableEditDeleteButtons(disableButtons));
  }

  @Action(SetSelectedPointId)
  setSelectedPointId({patchState, dispatch}: StateContext<SamplingPlaceStateModel>, {pointId}: SetSelectedPointId) {
    patchState({selectedPlaceId: null, selectedPointId: pointId});
    const disableButton = pointId === undefined || pointId === null;
    dispatch(new DisableEditDeleteButtons(disableButton));
  }

  @Action(GetPointsTree)
  getPointsTree({getState, patchState}: StateContext<SamplingPlaceStateModel>, {placeId}: GetPointsTree) {
    const state = getState();
    patchState({loadingTree: true});
    return this._pointsService.getPointChildItems(placeId).pipe(
      tap((result) => {
        const children = new Array<TreeNode>();
        result.forEach(item => {
          const node = {
            data: item,
            leaf: true
          } as TreeNode;
          children.push(node);
        });
        state.treeNodes.filter(x => x.data.id === placeId).map(x => x.children = [...children]);
        patchState({treeNodes: [...state.treeNodes], loadingTree: false});
      })
    );
  }

  @Action(OpenSamplingPlaceEditingWindow)
  openSamplingPlaceEditingWindow({getState}: StateContext<SamplingPlaceStateModel>) {
    const state = getState();
    if (!state.selectedPlaceId) {
      const message = 'Не выбрано место отбора!';
      this._notificationService.sendErrorMessage(message);
      throw new Error(message);
      return;
    }
    return this._placesService.getSamplingPlace(state.selectedPlaceId)
      .pipe(tap((result) => {
        this._dialogService.open(SamplingPlaceDetailsComponent, {
          header: 'Редактирование места отбора',
          width: '60%',
          data: result
        });
      }));
  }

  @Action(OpenSamplingPlaceCreatingWindow)
  openSamplingPlaceCreatingWindow() {
    return this._dialogService.open(SamplingPlaceDetailsComponent, {
      header: 'Создание места отбора',
      width: '60%'
    });
  }

  @Action(OpenPlaceOrPointEditWindow)
  openPlaceOrPointEditWindow({getState, dispatch}: StateContext<SamplingPlaceStateModel>) {
    const state = getState();
    if (state.selectedPlaceId && state.selectedPointId) {
      const message = 'Ошибка при определинии открытия окна редактирования точек и мест отбора!';
      this._notificationService.sendErrorMessage(message);
      throw new Error(message);
      return;
    }
    if (state.selectedPlaceId) {
      dispatch(new OpenSamplingPlaceEditingWindow());
      return;
    }
    if (state.selectedPointId) {
      dispatch(new OpenSamplingPointEditWindow());
      return;
    }
  }

  @Action(OpenPlaceOrPointCreateWindow)
  openPlaceOrPointCreateWindow() {
    return this._dialogService.open(SelectCreateWindowComponent, {
      header: 'Выбор окна создания элемента',
      width: '60%'
    });
  }

  @Action(OpenSamplingPointEditWindow)
  openSamplingPointEditWindow({getState}: StateContext<SamplingPlaceStateModel>) {
    const state = getState();
    if (!state.selectedPointId) {
      const message = 'Не выбрана точка отбора!';
      this._notificationService.sendErrorMessage(message);
      throw new Error(message);
      return;
    }
    const gettingSamplePlaces = this._placesService.getSamplingPlacesInfo();
    const gettingSamplePointInfo = this._pointsService.getPoint(state.selectedPointId);

    return forkJoin([gettingSamplePlaces, gettingSamplePointInfo])
      .pipe(tap((result => {
        const dialogData = {
          places: result[0],
          point: result[1]
        } as SamplingPointDialogData;
        this._dialogService.open(SamplingPointDetailsComponent, {
          header: 'Редактировани точки отбора',
          width: '60%',
          data: dialogData
        });
      })));
  }

  @Action(OpenSamplingPointCreateWindow)
  openSamplingPointCreateWindow({getState}: StateContext<SamplingPlaceStateModel>) {
    return this._placesService.getSamplingPlacesInfo()
      .pipe(tap((result) => {
        const dialogData = {
          places: result
        } as SamplingPointDialogData;
        this._dialogService.open(SamplingPointDetailsComponent, {
          header: 'Создание точки отбора',
          width: '60%',
          data: dialogData
        });
      }));
  }

  @Action(CreatePlace)
  createPlace({dispatch}: StateContext<SamplingPlaceStateModel>, {place}: CreatePlace) {
    return this._placesService.createSamplingPlace(place)
      .pipe(tap((res) => {
        dispatch(new GetPlacesTree());
        this._notificationService.sendCreateElementMessage('Создано новое место отбора!');
      }));
  }

  @Action(UpdatePlace)
  updatePlace({dispatch}: StateContext<SamplingPlaceStateModel>, {place}: UpdatePlace) {
    return this._placesService.updateSamplingPlace(place)
      .pipe(tap((res) => {
        dispatch(new GetPlacesTree());
        this._notificationService.sendEditElementMessage('Изменены данные места отбора!');
      }));
  }

  @Action(DeletePlace)
  deletePlace({getState, dispatch}: StateContext<SamplingPlaceStateModel>) {
    const state = getState();
    if (!state.selectedPlaceId) {
      const message = 'Удаление невозможно. Не выбрано место отбора';
      this._notificationService.sendErrorMessage(message);
      throw new Error(message);
      return;
    }
    return this._placesService.deleteSamplingPlace(state.selectedPlaceId)
      .pipe(tap((res) => {
        dispatch(new GetPlacesTree());
        this._notificationService.sendDeleteElementMessage('Место отбора удалено!')
      }));
  }

  @Action(DeletePlaceOrPoint)
  deletePlaceOrPoint({getState, dispatch}: StateContext<SamplingPlaceStateModel>) {
    const state = getState();
    if (state.selectedPlaceId && state.selectedPointId) {
      const message = 'Ошибка при определинии удаления точек и мест отбора!';
      this._notificationService.sendErrorMessage(message);
      throw new Error(message);
      return;
    }
    if (state.selectedPlaceId) {
      dispatch(new DeletePlace());
      return;
    }
    if (state.selectedPointId) {
      dispatch(new DeletePoint());
      return;
    }
  }

  @Action(CreatePoint)
  createPoint({dispatch}: StateContext<SamplingPlaceStateModel>, {point}: CreatePoint) {
    return this._pointsService.createPoint(point)
      .pipe(tap((res) => {
        dispatch(new GetPlacesTree());
        this._notificationService.sendCreateElementMessage('Создана новая точка отбора!');
      }));
  }

  @Action(UpdatePoint)
  updatePoint({dispatch}: StateContext<SamplingPlaceStateModel>, {point}: UpdatePoint) {
    return this._pointsService.updatePoint(point)
      .pipe(tap((res) => {
        dispatch(new GetPlacesTree());
        this._notificationService.sendEditElementMessage('Изменены данные точки отбора!');
      }));
  }

  @Action(DeletePoint)
  deletePoint({getState, dispatch}: StateContext<SamplingPlaceStateModel>) {
    const state = getState();
    if (!state.selectedPointId) {
      const message = 'Удаление невозможно. Не выбрана точка отбора';
      this._notificationService.sendErrorMessage(message);
      throw new Error(message);
      return;
    }
    return this._pointsService.deletePoint(state.selectedPointId)
      .pipe(tap((res) => {
        dispatch(new GetPlacesTree());
        this._notificationService.sendDeleteElementMessage('Удалена точка отбора!');
      }));
  }
}
