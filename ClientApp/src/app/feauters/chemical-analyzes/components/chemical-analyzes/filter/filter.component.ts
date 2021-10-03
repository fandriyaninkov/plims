import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/core/constants';
import { Store } from '@ngxs/store';
import {
  SetSamplingDate,
} from '../../../actions/chemical-analyzes.actions';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {

  private _selectedDate: Date;

  get selectedDate(): Date {
    return this._selectedDate;
  }

  set selectedDate(value: Date) {
    this._selectedDate = value;
    this._store.dispatch(new SetSamplingDate(value));
  }

  ru: any;

  constructor(private _store: Store) {}

  ngOnInit(): void {
    this.ru = Constants.ru;
  }
}
