import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserViewModel } from 'src/app/core/nswag/plims-generated';
import { CreateUser, UpdateUser } from '../../../actions/admin.actions';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  userForm: FormGroup;

  submitted = false;

  get user(): UserViewModel {
    return this._config.data as UserViewModel;
  }

  get f() {
    return this.userForm.controls;
  }

  get validated() {
    return this.userForm.valid;
  }

  constructor(
    private _config: DynamicDialogConfig,
    private _store: Store,
    private _formBuilder: FormBuilder,
    private _dynamicDialogRef: DynamicDialogRef
  ) { }

  ngOnInit(): void {
    this.userForm = this._formBuilder.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      patronymic: [this.user.patronymic]
    });
  }

  save() {
    this.submitted = true;
    if (!this.validated) {
      return;
    }
    const user = {
      id: this.user.id,
      firstName: this.userForm.get('firstName').value,
      lastName: this.userForm.get('lastName').value,
      patronymic: this.userForm.get('patronymic').value
    } as UserViewModel;

    if (user.id) {
      this._store.dispatch(new UpdateUser(user));
    } else {
      this._store.dispatch(new CreateUser(user));
    }

    this.close();
  }

  cancel() {
    this.close();
  }

  close() {
    this._dynamicDialogRef.close();
  }

}
