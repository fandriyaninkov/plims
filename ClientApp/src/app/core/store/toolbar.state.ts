import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { CreateNewElement, EditSelectedElement, DeleteSelectedElement, DisableEditDeleteButtons, OpenPrintMenu, DisableCreateButton } from '../actions/toolbar.actions';

export interface ToolbarStateModel {
  disableEditDeleteButtons: boolean;
  disableCreateButton: boolean;
}

@State<ToolbarStateModel>({
  name: 'toolbar',
  defaults: {
    disableEditDeleteButtons: true,
    disableCreateButton: true
  },
})
@Injectable()
export class ToolbarState {

  @Selector()
  static disableEditDeleteButtons(state: ToolbarStateModel) {
    return state.disableEditDeleteButtons;
  }

  @Selector()
  static disableCreateButton(state: ToolbarStateModel) {
    return state.disableCreateButton;
  }

  @Action(CreateNewElement)
  createNewElement() {
    
  }

  @Action(EditSelectedElement)
  editSelectedElement() {

  }

  @Action(DeleteSelectedElement)
  deleteSelectedElement() {

  }

  @Action(DisableEditDeleteButtons)
  disableEditDeleteButtons({patchState}: StateContext<ToolbarStateModel>, { disable }: DisableEditDeleteButtons) {
    patchState({disableEditDeleteButtons: disable});
  }

  @Action(OpenPrintMenu)
  openPrintMenu() {

  }

  @Action(DisableCreateButton)
  disableCreateButton({patchState}: StateContext<ToolbarStateModel>, payload: DisableCreateButton) {
    patchState({disableCreateButton: payload.disable});
  }
}
