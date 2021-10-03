import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';
import { GetTree, SetSelectedTreeNode } from './actions/admin.actions';
import { AdminState } from './state/admin.state';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  @Select(AdminState.treeItems) menuTreeNodes$: Observable<TreeNode[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _store: Store) { }

  ngOnInit(): void {
    this._store.dispatch(new GetTree());
  }

  nodeSelect(node: TreeNode) {
    this._store.dispatch(new SetSelectedTreeNode(node.data));
    this.router.navigate([node.data.url], { relativeTo: this.route});
  }

}
