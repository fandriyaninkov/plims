import { ChemicalAnalysisTreeItem, ChemicalAnalysisTreeItemType } from './../../../../../core/nswag/plims-generated';
import { GetPlacesTree, GetPointsTree, ResetSelectedPlaceAndPoint, SetSelectedPlaceAndPointIds } from './../../../actions/chemical-analyzes.actions';
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { TreeNode } from 'primeng/api';
import { ChemicalAnalyzesState } from '../../../state/chemical-analyzes.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chemical-analysis-tree',
  templateUrl: './chemical-analysis-tree.component.html',
  styleUrls: ['./chemical-analysis-tree.component.scss']
})
export class ChemicalAnalysisTreeComponent implements OnInit {

  @Select(ChemicalAnalyzesState.treeNodes) treeNodes$: Observable<TreeNode[]>;

  private _selected: TreeNode;

  public get selected(): TreeNode {
    return this._selected;
  }

  public set selected(value: TreeNode) {
    this._selected = value;
    this.updateSelectedItemState();
  }

  constructor(private _store: Store) { }

  ngOnInit(): void {
    this._store.dispatch(new GetPlacesTree());
  }

  loadNode(event) {
    if (event.node) {
      this._store.dispatch(new GetPointsTree(event.node.data.id));
    }
  }

  private updateSelectedItemState() {
    const data = this._selected.data as ChemicalAnalysisTreeItem;
    if (!data) {
      this._store.dispatch(new ResetSelectedPlaceAndPoint());
      return;
    }

    if (data.type === ChemicalAnalysisTreeItemType.Place) {
      this._store.dispatch(new SetSelectedPlaceAndPointIds(data.id, null));
    } else {
      this._store.dispatch(new SetSelectedPlaceAndPointIds(data.parentId, data.id));
    }
  }

}
