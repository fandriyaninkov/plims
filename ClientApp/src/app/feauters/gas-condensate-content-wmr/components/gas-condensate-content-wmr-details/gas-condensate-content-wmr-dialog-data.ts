import { GasCondensateContentWmrViewModel, SamplingPlaceViewModel, SamplingPointViewModel, UserShortInfoViewModel } from "src/app/core/nswag/plims-generated";

export interface GasCondensateContentWmrDialogData {
  assistants: UserShortInfoViewModel[];
  place: SamplingPlaceViewModel;
  points: SamplingPointViewModel[];
  analysis: GasCondensateContentWmrViewModel;
}