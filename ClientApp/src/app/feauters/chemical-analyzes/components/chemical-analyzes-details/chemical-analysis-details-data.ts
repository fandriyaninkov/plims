import { SamplingPlaceViewModel, SamplingPointViewModel, ChemicalAnalysisViewModel, UserShortInfoViewModel } from 'src/app/core/nswag/plims-generated';

export interface ChemicalAnalysisDetailsData {
  place: SamplingPlaceViewModel;
  points: SamplingPointViewModel[];
  assistants: UserShortInfoViewModel[];
  analysisInfo: ChemicalAnalysisViewModel;
}