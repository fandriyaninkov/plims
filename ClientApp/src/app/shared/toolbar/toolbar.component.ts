import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { CreateNewElement, DisableEditDeleteButtons, EditSelectedElement, DeleteSelectedElement, OpenPrintMenu } from 'src/app/core/actions/toolbar.actions';
import { ToolbarState } from 'src/app/core/store/toolbar.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Select(ToolbarState.disableEditDeleteButtons) disableEditDeleteButtons$: Observable<boolean>;
  @Select(ToolbarState.disableCreateButton) disableCreateButton$: Observable<boolean>;

  constructor(private _store: Store) { }

  ngOnInit(): void {
  }

  create() {
    this._store.dispatch(new CreateNewElement());
  }

  edit() {
    this._store.dispatch(new EditSelectedElement());
  }

  delete() {
    this._store.dispatch(new DeleteSelectedElement());
  }

  openPrint() {
    this._store.dispatch(new OpenPrintMenu());
  }

}
