import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/core/constants';
import { UserViewModel } from 'src/app/core/nswag/plims-generated';
import { GetUsers, SetSelectedUser } from '../../actions/admin.actions';
import { UserState } from '../../state/user.state';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {

  cols = [
    { field: 'firstName', header: 'Имя'},
    { field: 'lastName', header: 'Фамилия'},
    { field: 'patronymic', header: 'Отчество'},
  ];

  @Select(UserState.users) users$: Observable<UserViewModel[]>;

  scrollHeight: string;

  private _selectedUser: UserViewModel;

  get selectedUser() {
    return this._selectedUser;
  }

  set selectedUser(value: UserViewModel) {
    this._selectedUser = value;
    this._store.dispatch(new SetSelectedUser(value));
  }

  constructor(private _store: Store, private _cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this._store.dispatch(new GetUsers());
  }

  ngAfterViewInit(): void {
    this.scrollHeight = `calc(100vh - ${Constants.topOffset}px)`;
    this._cdr.detectChanges();
  }

}
