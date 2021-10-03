import { Actions } from "@ngxs/store";
import { ActionNames } from "src/app/core/actions/action-names";
import { GasCondensateContentWmrViewModel, UserShortInfoViewModel } from "src/app/core/nswag/plims-generated";
import { TabType } from "../state/gas-condensate-content-wmr-state-model";

export class GetPlacesTree {
  static readonly type = `${ActionNames.gasCondensateContentWMR} Get Places Tree`;
}

export class GetPointsTree {
  static readonly type = `${ActionNames.gasCondensateContentWMR} Get Points Tree`;
  constructor(public placeId: number) {}
}

export class ResetSelectedTreeItems {
  static readonly type = `${ActionNames.gasCondensateContentWMR} Reset Selected Tree Items`;
}

export class SetSamplingDateRange {
  static readonly type = `${ActionNames.gasCondensateContentWMR} Set Sampling Date Range`;
  constructor(public startDate: Date, public endDate: Date) {}
}

export class GetGasCondensateContentWmrAnalyzes {
  static readonly type = `${ActionNames.gasCondensateContentWMR} Get Gas Condensate Content Wmr Analyzes`;
}

export class OpenGasCondensateContentWmrEditWindow {
  static readonly type = `${ActionNames.gasCondensateContentWMR} Open Gas Condensate Content Wmr Edit Window`;
}

export class OpenGasCondensateContentWmrCreateWindow {
  static readonly type = `${ActionNames.gasCondensateContentWMR} Open Gas Condensate Content Wmr Create Window`;
}

export class GetPoints {
  static readonly type = `${ActionNames.gasCondensateContentWMR} Get Points`;
}

export class SetSelectedPlaceAndPointId {
  static readonly type = `${ActionNames.gasCondensateContentWMR} Set Selected Place And Point Id`;
  constructor(public placeId: number, public pointId: number) {}
}

export class SetLaboratoryAssistants {
  static readonly type = `${ActionNames.gasCondensateContentWMR} Set Laboratory Assistants`;
  constructor(public users: UserShortInfoViewModel[]) {}
}

export class SetSelectedAnalysisId {
  static readonly type = `${ActionNames.gasCondensateContentWMR} Set Selected Analys Id`;
  constructor(public analysisId: number) {}
}

export class SetAnalysisInfo {
  static readonly type = `${ActionNames.gasCondensateContentWMR} Set Analysis Info`;
  constructor(public analysisInfo: GasCondensateContentWmrViewModel) {}
}

export class CreateGasCondensateContentWmr {
  static readonly type = `${ActionNames.gasCondensateContentWMR} Create Gas Condensate Content Wmr`;
  constructor(public model: GasCondensateContentWmrViewModel) {}
}

export class UpdateGasCondensateContentWmr {
  static readonly type = `${ActionNames.gasCondensateContentWMR} Update Gas Condensate Content Wmr`;
  constructor(public model: GasCondensateContentWmrViewModel) {}
}

export class DeleteGasCondensateContentWmr {
  static readonly type = `${ActionNames.gasCondensateContentWMR} Delete Gas Condensate Content Wmr`;
}

export class SetSelectedTab {
  static readonly type = `${ActionNames.gasCondensateContentWMR} Set Selected Tab`;
  constructor(public activeTab: TabType) {}
}

export class GetChartInfo {
  static readonly type = `${ActionNames.gasCondensateContentWMR} Get Chart Info`;
}

export class LoadingData {
  static readonly type = `${ActionNames.gasCondensateContentWMR} Loading Data`;
}

export class SetTimeAxisBounding {
  static readonly type = `${ActionNames.gasCondensateContentWMR} Set Time Axis Bounding`;
  constructor(public startDate: Date, public endDate: Date) {}
}