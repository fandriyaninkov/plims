import { TreeNode } from 'primeng/api';
import { ChartViewModel, GasCondensateContentWmrTableViewModel, GasCondensateContentWmrViewModel, SamplingPointViewModel, TimeScaleBoundingViewModel, UserShortInfoViewModel } from 'src/app/core/nswag/plims-generated';

export interface GasCondensateContentWmrStateModel {
  treeNodes: TreeNode[];
  selectedPlaceId: number;
  selectedPointId: number;
  startSamplingDate: Date;
  endSamplingDate: Date;
  points: SamplingPointViewModel[];
  laboratoryAssistants: UserShortInfoViewModel[];
  analyzes: GasCondensateContentWmrTableViewModel[];
  analysisInfo: GasCondensateContentWmrViewModel;
  selectedAnalysId: number;
  activeTab: TabType;
  chartInfo: ChartViewModel;
  timeAxisBounding: TimeScaleBoundingViewModel;
}

export enum TabType {
  Table,
  Chart
}
