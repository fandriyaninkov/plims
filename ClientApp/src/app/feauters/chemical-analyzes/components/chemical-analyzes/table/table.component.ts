import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ChemicalAnalyzesState } from '../../../state/chemical-analyzes.state';
import { Observable } from 'rxjs';
import { ChemicalAnalysisGridViewModel } from 'src/app/core/nswag/plims-generated';
import { SetSelectedAnalysis } from '../../../actions/chemical-analyzes.actions';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  cols = [
    { field: 'regCode', header: 'Номер пробы' },
    { field: 'samplingPlace', header: 'Место отбора проб' },
    { field: 'samplingDate', header: 'Дата отбора пробы' },
    { field: 'deliveringDate', header: 'Дата доставки пробы' },
    { field: 'analysisDate', header: 'Дата анализа' },
    { field: 'laboratoryAssistant', header: 'Лаборант' },
    { field: 'samplingPoint', header: 'Точка отбора' },
  ];

  @Select(ChemicalAnalyzesState.analysis) rows$: Observable<ChemicalAnalysisGridViewModel[]>;

  private _selectedAnalysis: ChemicalAnalysisGridViewModel;

  get selectedAnalysis() {
    return this._selectedAnalysis;
  } 

  set selectedAnalysis(value: ChemicalAnalysisGridViewModel) {
    this._selectedAnalysis = value;
    this._store.dispatch(new SetSelectedAnalysis(this._selectedAnalysis));
  }

  constructor(private _store: Store) {}

  ngOnInit(): void {}
}
