import { ActionNames } from './action-names';

export class CreateNewElement {
  public static readonly type = `${ActionNames.toolbar} Create New Element`;
}

export class EditSelectedElement {
  public static readonly type = `${ActionNames.toolbar} Edit Selected Element`;
}

export class DeleteSelectedElement {
  public static readonly type = `${ActionNames.toolbar} Delete Selected Element`;
}

export class DisableEditDeleteButtons {
  public static readonly type = `${ActionNames.toolbar} Disable Edit And Delete Buttons`;
  constructor(public readonly disable: boolean) {}
}

export class OpenPrintMenu {
  public static readonly type = `${ActionNames.toolbar} Open Print Menu`;
}

export class DisableCreateButton {
  public static readonly type = `${ActionNames.toolbar} Disable Create Button`;
  constructor(public readonly disable: boolean) {}
}
