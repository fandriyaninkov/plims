import { ActionNames } from 'src/app/core/actions/action-names';
import { AdminTreeItemInfo, SamplingPlaceViewModel, SamplingPointFullViewModel, UserViewModel } from 'src/app/core/nswag/plims-generated';

//#region Admin
export class SetSelectedTreeNode {
  static readonly type = `${ActionNames.admin} Set Selected Tree Node`;
  constructor(public node: AdminTreeItemInfo) {}
}

export class GetTree {
  static readonly type = `${ActionNames.admin} Get Tree`;
}
//#endregion

//#region Users

export class GetUsers {
  static readonly type = `${ActionNames.admin} Get Users`;
}

export class SetSelectedUser {
  static readonly type = `${ActionNames.admin} Set Selected User`;
  constructor(public user: UserViewModel) {}
}

export class OpenUserEditingModal {
  static readonly type = `${ActionNames.admin} Open User Editing Modal`;
}

export class OpenUserCreatingModal {
  static readonly type = `${ActionNames.admin} Open User Creating Modal`;
}

export class DeleteUser {
  static readonly type = `${ActionNames.admin} Delete User`;
}

export class CreateUser {
  static readonly type = `${ActionNames.admin} Create User`;
  constructor(public user: UserViewModel) {}
}

export class UpdateUser {
  static readonly type = `${ActionNames.admin} Update User`;
  constructor(public user: UserViewModel) {}
}
//#endregion

//#region Sampling Place
export class GetPlacesTree {
  static readonly type = `${ActionNames.admin} Get Places Tree`;
}

export class GetPointsTree {
  static readonly type = `${ActionNames.admin} Get Points Tree`;
  constructor(public placeId: number) {}
}

export class SetSelectedPlaceId {
  static readonly type = `${ActionNames.admin} Set Selected Place Id`;
  constructor(public placeId: number) {}
}

export class SetSelectedPointId {
  static readonly type = `${ActionNames.admin} Set Selected Point Id`;
  constructor(public pointId: number) {}
}

export class OpenSamplingPlaceCreatingWindow {
  static readonly type = `${ActionNames.admin} Open Sampling Place Creating Window`;
}

export class OpenSamplingPlaceEditingWindow {
  static readonly type = `${ActionNames.admin} Open Sampling Place Editing Window`;
}

export class OpenPlaceOrPointEditWindow {
  static readonly type = `${ActionNames.admin} Open Place Or Point Edit Window`;
}

export class OpenPlaceOrPointCreateWindow {
  static readonly type = `${ActionNames.admin} Open Place Or Point Create Window`;
}

export class OpenSamplingPointEditWindow {
  static readonly type = `${ActionNames.admin} Open Sampling Point Edit Window`;
}

export class OpenSamplingPointCreateWindow {
  static readonly type = `${ActionNames.admin} Open Sampling Point Create Window`;
}

export class CreatePlace {
  static readonly type = `${ActionNames.admin} Create Place`;
  constructor(public place: SamplingPlaceViewModel) {}
}

export class UpdatePlace {
  static readonly type = `${ActionNames.admin} Update Place`;
  constructor(public place: SamplingPlaceViewModel) {}
}

export class DeletePlace {
  static readonly type = `${ActionNames.admin} Delete Place`;
}

export class DeletePlaceOrPoint {
  static readonly type = `${ActionNames.admin} Delete Place Or Point`;
}

export class CreatePoint {
  static readonly type = `${ActionNames.admin} Create Point`;
  constructor(public point: SamplingPointFullViewModel) {}
}

export class UpdatePoint {
  static readonly type = `${ActionNames.admin} Update Point`;
  constructor(public point: SamplingPointFullViewModel) {}
}

export class DeletePoint {
  static readonly type = `${ActionNames.admin} Delete Point`;
}
//#endregion
