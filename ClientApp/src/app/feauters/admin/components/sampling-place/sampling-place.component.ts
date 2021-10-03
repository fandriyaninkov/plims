import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Actions, Select, Store } from '@ngxs/store';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/core/constants';
import { ChemicalAnalysisTreeItem, ChemicalAnalysisTreeItemType } from 'src/app/core/nswag/plims-generated';
import { GetPlacesTree, GetPointsTree, SetSelectedPlaceId, SetSelectedPointId } from '../../actions/admin.actions';
import { SamplingPlaceState } from '../../state/sampling-place.state';

@Component({
  selector: 'app-sampling-place',
  templateUrl: './sampling-place.component.html',
  styleUrls: ['./sampling-place.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SamplingPlaceComponent implements OnInit, AfterViewInit {

  cols = [
    { field: 'name', header: 'Название'}
  ];

  @Select(SamplingPlaceState.treeNodes) tableItems$: Observable<TreeNode[]>;
  @Select(SamplingPlaceState.loadingTree) loading$: Observable<boolean>;

  totalRecords: number;

  scrollHeight: string;

  private _selectedItem: TreeNode;

  set selectedItem(value: TreeNode) {
    this._selectedItem = value;
    this.updateSelectedItemState();
  }

  get selectedItem(): TreeNode {
    return this._selectedItem;
  }

  constructor(
              private _cdr: ChangeDetectorRef,
              private _store: Store,
              private _actions: Actions) { }

  ngOnInit(): void {
    this._store.dispatch(new GetPlacesTree());
  }

  ngAfterViewInit(): void {
    this.scrollHeight = `calc(100vh - ${Constants.topOffset}px)`;
    this._cdr.detectChanges();
  }

  onNodeExpand(event) {
    if (event.node) {
      this._store.dispatch(new GetPointsTree(event.node.data.id));
    }
  }

  private updateSelectedItemState() {
    const data = this._selectedItem.data as ChemicalAnalysisTreeItem;
    if (!data) {
      this._store.dispatch(new SetSelectedPlaceId(null));
      return;
    }
    switch (data.type) {
      case ChemicalAnalysisTreeItemType.Place: this._store.dispatch(new SetSelectedPlaceId(data.id)); break;
      case ChemicalAnalysisTreeItemType.Point: this._store.dispatch(new SetSelectedPointId(data.id)); break;
    }
  }

}
