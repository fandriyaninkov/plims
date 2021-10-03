import { TreeNode } from 'primeng/api';
import { ChemicalAnalysisGridViewModel, SamplingPointViewModel, ChemicalAnalysisViewModel, UserShortInfoViewModel } from 'src/app/core/nswag/plims-generated';

export interface ChemicalAnalyzesStateModel {
  selectedPlaceId: number;
  selectedAnalysis: ChemicalAnalysisGridViewModel;
  points: SamplingPointViewModel[];
  selectedPointId: number;
  samplingDate: Date;
  analysis: ChemicalAnalysisGridViewModel[];
  analysisInfo: ChemicalAnalysisViewModel;
  laboratoryAssistants: UserShortInfoViewModel[];
  treeNodes: TreeNode[];
}