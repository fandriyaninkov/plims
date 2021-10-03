import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { MenuItem } from 'primeng/api';
import { SetSelectedTab } from './actions/gas-condensate-content-wmr.actions';

@Component({
  selector: 'app-gas-condensate-content-wmr',
  templateUrl: './gas-condensate-content-wmr.component.html',
  styleUrls: ['./gas-condensate-content-wmr.component.scss']
})
export class GasCondensateContentWmrComponent implements OnInit {


  constructor(
    private _store: Store
  ) { }

  ngOnInit(): void {
  }

  changeSelectedTab(e) {
    this._store.dispatch(new SetSelectedTab(e.index));
  }

}
