import { SamplingPlaceViewModel, SamplingPointFullViewModel } from "src/app/core/nswag/plims-generated";

export interface SamplingPointDialogData {
  places: SamplingPlaceViewModel[];
  point: SamplingPointFullViewModel;
}
