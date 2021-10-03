import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { DialogService } from 'primeng/dynamicdialog';
import { tap } from 'rxjs/operators';
import { DisableEditDeleteButtons } from 'src/app/core/actions/toolbar.actions';
import { UserService, UserViewModel } from 'src/app/core/nswag/plims-generated';
import { NotificationService } from 'src/app/core/services/notification.service';
import { CreateUser, DeleteUser, GetUsers, OpenUserCreatingModal, OpenUserEditingModal, SetSelectedUser, UpdateUser } from '../actions/admin.actions';
import { UserDetailsComponent } from '../components/users/user-details/user-details.component';
import { UserStateModel } from './admin-model';

@State<UserStateModel>({
  name: 'user',
  defaults: {
    selectedUser: null,
    users: []
  }
})
@Injectable()
export class UserState {
  @Selector()
  static users(state: UserStateModel) {
    return state.users;
  }

  constructor(
    private _userService: UserService,
    private _dialogService: DialogService,
    private _notificationService: NotificationService
  ) { }

  @Action(GetUsers)
  getUsers({patchState}: StateContext<UserStateModel>) {
    return this._userService.getAllUsers().pipe(
      tap((result) => {
        patchState({users: result});
      })
    );
  }

  @Action(SetSelectedUser)
  setSelelctedUser({dispatch, patchState}: StateContext<UserStateModel>, {user}: SetSelectedUser) {
    patchState({selectedUser: user});
    const disable = user === undefined || user === null;
    dispatch(new DisableEditDeleteButtons(disable));
  }

  @Action(OpenUserEditingModal)
  openUserEditingModal({getState}: StateContext<UserStateModel>) {
    const state = getState();
    if (!state.selectedUser) {
      const message = 'Отсутствует выбранный пользователь!';
      this._notificationService.sendErrorMessage(message);
      throw new Error(message);
      return;
    }
    this._dialogService.open(UserDetailsComponent, {
      header: 'Редактирование пользователя',
      width: '60%',
      data: state.selectedUser
    });
  }

  @Action(OpenUserCreatingModal)
  openUserCreatingModal() {
    this._dialogService.open(UserDetailsComponent, {
      header: 'Редактирование пользователя',
      width: '60%',
      data: {} as UserViewModel
    });
  }

  @Action(DeleteUser)
  deleteUser({getState, dispatch}: StateContext<UserStateModel>) {
    const state = getState();
    if (!state.selectedUser) {
      const message = 'Удаление невозможно. Пользователь не выбран!';
      this._notificationService.sendErrorMessage(message);
      throw new Error(message);
      return;
    }
    return this._userService.deleteUser(state.selectedUser.id).pipe(
      tap((result) => {
        dispatch(new SetSelectedUser(null));
        dispatch(new GetUsers());
        this._notificationService.sendDeleteElementMessage('Пользователь удален');
      })
    );
  }

  @Action(CreateUser)
  createUser({dispatch}: StateContext<UserViewModel>, {user}: CreateUser) {
    return this._userService.createUser(user).pipe(
      tap((result) => {
        dispatch(new GetUsers());
        this._notificationService.sendCreateElementMessage('Новый пользователь добавлен!');
      })
    );
  }

  @Action(UpdateUser)
  updateUser({dispatch}: StateContext<UserViewModel>, {user}: UpdateUser) {
    return this._userService.updateUser(user).pipe(
      tap((result) => {
        dispatch(new GetUsers());
        this._notificationService.sendEditElementMessage('Данные пользователя изменены!');
      })
    );
  }
}
