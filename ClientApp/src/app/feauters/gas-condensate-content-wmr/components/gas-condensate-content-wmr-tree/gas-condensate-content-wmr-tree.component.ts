import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';
import { ChemicalAnalysisTreeItem, ChemicalAnalysisTreeItemType } from 'src/app/core/nswag/plims-generated';
import { GetPlacesTree, GetPointsTree, ResetSelectedTreeItems, SetSelectedPlaceAndPointId } from '../../actions/gas-condensate-content-wmr.actions';
import { GasCondensateContentWmrState } from '../../state/gas-condensate-content-wmr.state';

@Component({
  selector: 'app-gas-condensate-content-wmr-tree',
  templateUrl: './gas-condensate-content-wmr-tree.component.html',
  styleUrls: ['./gas-condensate-content-wmr-tree.component.scss']
})
export class GasCondensateContentWmrTreeComponent implements OnInit {

  @Select(GasCondensateContentWmrState.treeNodes) treeNodes$: Observable<TreeNode[]>;

  private _selected: TreeNode;

  public get selected(): TreeNode {
    return this._selected;
  }

  public set selected(value: TreeNode) {
    this._selected = value;
    this.updateSelectedItemState();
  }

  constructor(
    private _store: Store
  ) { }

  ngOnInit(): void {
    this._store.dispatch(new GetPlacesTree());
  }

  loadNode(event) {
    if (event.node) {
      this._store.dispatch(new GetPointsTree(event.node.data.id));
    }
  }

  private updateSelectedItemState() {
    const data = this.selected.data as ChemicalAnalysisTreeItem;
    if (!data) {
      this._store.dispatch(new ResetSelectedTreeItems());
      return;
    }

    if (data.type === ChemicalAnalysisTreeItemType.Place) {
      this._store.dispatch(new SetSelectedPlaceAndPointId(data.id, null));
    } else {
      this._store.dispatch(new SetSelectedPlaceAndPointId(data.parentId, data.id));
    }
  }

}
