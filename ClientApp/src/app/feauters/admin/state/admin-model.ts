import { TreeNode } from 'primeng/api';
import { AdminTreeItemInfo, SamplingPlaceViewModel, UserViewModel } from 'src/app/core/nswag/plims-generated';

export interface AdminStateModel {
  menuTreeNodes: TreeNode[];
  selectedTreeItemInfo: AdminTreeItemInfo;
}

export interface UserStateModel {
  users: UserViewModel[];
  selectedUser: UserViewModel;
}

export interface SamplingPlaceStateModel {
  treeNodes: TreeNode[];
  selectedPlaceId: number;
  selectedPointId: number;
  loadingTree: boolean;
}
