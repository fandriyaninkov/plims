import { Injectable } from '@angular/core';
import { Action, Actions, ofActionSuccessful, Selector, State, StateContext, Store } from '@ngxs/store';
import { TreeNode } from 'primeng/api';
import { tap } from 'rxjs/operators';
import { CreateNewElement, DeleteSelectedElement, DisableCreateButton, DisableEditDeleteButtons, EditSelectedElement } from 'src/app/core/actions/toolbar.actions';
import { AdminService, AdminTreeItemInfo, AdminTreeItemType } from 'src/app/core/nswag/plims-generated';
import { DeletePlaceOrPoint, DeleteUser, GetTree, OpenPlaceOrPointCreateWindow, OpenPlaceOrPointEditWindow, OpenUserCreatingModal, OpenUserEditingModal, SetSelectedTreeNode } from '../actions/admin.actions';
import { AdminStateModel } from './admin-model';
import { SamplingPlaceState } from './sampling-place.state';
import { UserState } from './user.state';

@State<AdminStateModel>({
  name: 'admin',
  defaults: {
    menuTreeNodes: [],
    selectedTreeItemInfo: null
  },
  children: [UserState, SamplingPlaceState]
})
@Injectable()
export class AdminState {

  @Selector()
  static treeItems(state: AdminStateModel) {
    return state.menuTreeNodes;
  }

  constructor(
    private _adminService: AdminService,
    private _actions: Actions,
    private _store: Store
  ) {
    this._store.dispatch(new DisableEditDeleteButtons(true));
    this._actions.pipe(ofActionSuccessful(CreateNewElement)).subscribe(() => {
      this.openCreatingNewElementModal();
    });
    this._actions.pipe(ofActionSuccessful(EditSelectedElement)).subscribe(() => {
      this.openEditingElementModal();
    });
    this._actions.pipe(ofActionSuccessful(DeleteSelectedElement)).subscribe(() => {
      this.deleteElement();
    });
  }

  @Action(SetSelectedTreeNode)
  setSelectedTreeNode({patchState, dispatch}: StateContext<AdminStateModel>, {node}: SetSelectedTreeNode) {
    patchState({selectedTreeItemInfo: node});
    const disableCreateButton = node === undefined || node === null;
    dispatch(new DisableCreateButton(disableCreateButton));
  }

  @Action(GetTree)
  getTree({patchState}: StateContext<AdminStateModel>) {
    return this._adminService.getTree().pipe(
      tap((result) => {
        const treeNodes = new Array<TreeNode>();
        result.forEach(item => {
          const node = {
            label: item.name,
            data: item
          } as TreeNode;
          treeNodes.push(node);
        });
        patchState({menuTreeNodes: treeNodes});
      })
    );
  }

  private openCreatingNewElementModal() {
    const selectedTreeItem = this._store.selectSnapshot<AdminTreeItemInfo>(state => state.admin.selectedTreeItemInfo);
    if (!selectedTreeItem) {
      throw new Error('Не выбран элемент дерева!');
      return;
    }
    switch (selectedTreeItem.type) {
      case AdminTreeItemType.Users: this._store.dispatch(new OpenUserCreatingModal()); break;
      case AdminTreeItemType.Places: this._store.dispatch(new OpenPlaceOrPointCreateWindow()); break;
      default: {
        throw new Error('Ошибка при выборе окна создания элемента!');
      }
    }
  }

  private openEditingElementModal() {
    const selectedTreeItem = this._store.selectSnapshot<AdminTreeItemInfo>(state => state.admin.selectedTreeItemInfo);
    if (!selectedTreeItem) {
      throw new Error('Не выбран элемент дерева!');
      return;
    }
    switch (selectedTreeItem.type) {
      case AdminTreeItemType.Users: this._store.dispatch(new OpenUserEditingModal()); break;
      case AdminTreeItemType.Places: this._store.dispatch(new OpenPlaceOrPointEditWindow()); break;
      default: {
        throw new Error('Ошибка при выборе окна редактирования элемента!');
      }
    }
  }

  private deleteElement() {
    const selectedTreeItem = this._store.selectSnapshot<AdminTreeItemInfo>(state => state.admin.selectedTreeItemInfo);
    if (!selectedTreeItem) {
      throw new Error('Не выбран элемент дерева!');
      return;
    }
    switch (selectedTreeItem.type) {
      case AdminTreeItemType.Users: this._store.dispatch(new DeleteUser()); break;
      case AdminTreeItemType.Places: this._store.dispatch(new DeletePlaceOrPoint()); break;
      default: {
        throw new Error('Ошибка при удалении элемента!');
      }
    }
  }

}
