import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/core/constants';
import { GasCondensateContentWmrTableViewModel } from 'src/app/core/nswag/plims-generated';
import { SetSelectedAnalysisId } from '../../actions/gas-condensate-content-wmr.actions';
import { GasCondensateContentWmrState } from '../../state/gas-condensate-content-wmr.state';

@Component({
  selector: 'app-gas-condensate-content-wmr-table',
  templateUrl: './gas-condensate-content-wmr-table.component.html',
  styleUrls: ['./gas-condensate-content-wmr-table.component.scss']
})
export class GasCondensateContentWmrTableComponent implements OnInit {

  cols = [
    { field: 'regCode', header: 'Номер пробы' },
    { field: 'samplingPlace', header: 'Место отбора пробы' },
    { field: 'samplingDate', header: 'Дата отбора пробы' },
    { field: 'deliveringDate', header: 'Дата доставки пробы' },
    { field: 'analysisDate', header: 'Дата анализа' },
    { field: 'laboratoryAssistant', header: 'Лаборант' },
    { field: 'wmrContent', header: 'Содержание газового конденсата, %' },
  ];

  @Select(GasCondensateContentWmrState.analysis) rows$: Observable<GasCondensateContentWmrTableViewModel[]>;

  private _selectedAnalysis: GasCondensateContentWmrTableViewModel;

  get selectedAnalysis() {
    return this._selectedAnalysis;
  }

  set selectedAnalysis(value: GasCondensateContentWmrTableViewModel) {
    this._selectedAnalysis = value;
    const analysId = this._selectedAnalysis ? this._selectedAnalysis.id : null;
    this._store.dispatch(new SetSelectedAnalysisId(analysId));
  }

  scrollHeight: string;

  constructor(
    private _store: Store
  ) { }

  ngOnInit(): void {
    this.scrollHeight = `calc(100vh - ${330}px)`;
  }

}
