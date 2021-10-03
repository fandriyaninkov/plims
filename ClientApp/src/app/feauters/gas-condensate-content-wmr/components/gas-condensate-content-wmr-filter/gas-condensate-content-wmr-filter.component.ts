import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Constants } from 'src/app/core/constants';
import { SetSamplingDateRange } from '../../actions/gas-condensate-content-wmr.actions';

@Component({
  selector: 'app-gas-condensate-content-wmr-filter',
  templateUrl: './gas-condensate-content-wmr-filter.component.html',
  styleUrls: ['./gas-condensate-content-wmr-filter.component.scss']
})
export class GasCondensateContentWmrFilterComponent implements OnInit {

  private _rangeDates: Date[];

  get rangeDates(): Date[] {
    return this._rangeDates;
  }

  set rangeDates(value: Date[]) {
    this._rangeDates = value;
  }

  ru: any;

  constructor(
    private _store: Store
  ) { }

  ngOnInit(): void {
    this.ru = Constants.ru;
  }

  onClosePanel() {
    if (!this._rangeDates) {
      return;
    }
    this._store.dispatch(new SetSamplingDateRange(this._rangeDates[0], this._rangeDates[1]));
  }

}
