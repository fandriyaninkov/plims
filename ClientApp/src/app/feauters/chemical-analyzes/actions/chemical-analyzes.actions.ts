import { SamplingPlaceViewModel, SamplingPointViewModel, ChemicalAnalysisGridViewModel, ChemicalAnalysisViewModel, UserShortInfoViewModel } from 'src/app/core/nswag/plims-generated';
import { ActionNames } from 'src/app/core/actions/action-names';

export class OpenChemicalAnalyzesCreatingModal {
  static readonly type = `${ActionNames.chemicalAnalysis} Open Chemical Analyzes Creating Modal`;
}

export class OpenChemicalAnalyzesEditingModal {
  static readonly type = `${ActionNames.chemicalAnalysis} Open Chemical Analyzes Editing Modal`;
}

export class GetPlacesTree {
  static readonly type = `${ActionNames.chemicalAnalysis} Get Places Tree`;
} 

export class ResetSelectedPlaceAndPoint {
  static readonly type = `${ActionNames.chemicalAnalysis} Reset Selected Place And Point`;
}

export class SetSelectedPlaceAndPointIds {
  static readonly type = `${ActionNames.chemicalAnalysis} Set Selected Place And Point Ids`;

  constructor(public placeId: number, public pointId: number) {}
}

export class SetSamplingDate {
  static readonly type = `${ActionNames.chemicalAnalysis} Set Sampling Date`;

  constructor(public samplingDate: Date) {}
}

export class GetPoints {
  static readonly type = `${ActionNames.chemicalAnalysis} Get Points`;
}

export class GetPointsTree {
  static readonly type = `${ActionNames.chemicalAnalysis} Get Points Tree`;
  constructor(public placeId: number) {}
}

export class GetAnalysis {
  static readonly type = `${ActionNames.chemicalAnalysis} Get Analysis`;
}

export class SetSelectedAnalysis {
  static readonly type = `${ActionNames.chemicalAnalysis} Set Selected Analysis`;
  constructor(public analysis: ChemicalAnalysisGridViewModel) {}
}

export class DeleteSelectedAnalysis {
  static readonly type = `${ActionNames.chemicalAnalysis} Delete Selected Analysis`;
}

export class SetLaboratoryAssistants {
  static readonly type = `${ActionNames.chemicalAnalysis} Set Laboratory Assistants`;
  constructor(public assistants: UserShortInfoViewModel[]) {}
}

export class SetAnalysisInfo {
  static readonly type = `${ActionNames.chemicalAnalysis} Set Analysis Info`;
  constructor(public analysisInfo: ChemicalAnalysisViewModel) {}
}

export class CreateChemicalAnalysis {
  static readonly type = `${ActionNames.chemicalAnalysis} Create Chemical Analysis`;
  constructor(public analysis: ChemicalAnalysisViewModel) {}
}

export class UpdateChemicalAnalysis {
  static readonly type = `${ActionNames.chemicalAnalysis} Update Chemical Analysis`;
  constructor(public analysis: ChemicalAnalysisViewModel) {}
}