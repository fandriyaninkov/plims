import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { OpenSamplingPlaceCreatingWindow, OpenSamplingPointCreateWindow } from '../../../actions/admin.actions';

@Component({
  selector: 'app-select-create-window',
  templateUrl: './select-create-window.component.html',
  styleUrls: ['./select-create-window.component.scss']
})
export class SelectCreateWindowComponent implements OnInit {

  windowType = 'place';

  constructor(
    private _store: Store,
    private _dynamicDialogRef: DynamicDialogRef
  ) { }

  ngOnInit(): void {
  }

  goToWindow() {
    setTimeout(() => {
      switch (this.windowType) {
        case 'place': this._store.dispatch(new OpenSamplingPlaceCreatingWindow()); break;
        case 'point': this._store.dispatch(new OpenSamplingPointCreateWindow()); break;
      }
    }, 250);
    this.close();
  }

  cancel() {
    this.close();
  }

  close() {
    this._dynamicDialogRef.close();
  }

}
