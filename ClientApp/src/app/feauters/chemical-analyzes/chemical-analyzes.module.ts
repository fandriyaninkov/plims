import { TableModule } from 'primeng/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChemicalAnalyzesRoutingModule } from './chemical-analyzer-routing.module';
import { ChemicalAnalyzesComponent } from './components/chemical-analyzes/chemical-analyzes.component';
import { FilterComponent } from './components/chemical-analyzes/filter/filter.component';
import { TableComponent } from './components/chemical-analyzes/table/table.component';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChemicalAnalyzesDetailsComponent } from './components/chemical-analyzes-details/chemical-analyzes-details.component';
import { DynamicDialogModule, DialogService } from 'primeng/dynamicdialog';
import { NgxsModule } from '@ngxs/store';
import { ChemicalAnalyzesState } from './state/chemical-analyzes.state';
import {
  SamplingPlacesService,
  SamplingPointsService,
  ChemicalAnalysisService,
  UserService,
} from 'src/app/core/nswag/plims-generated';
import { HttpClientModule } from '@angular/common/http';
import { ChemicalAnalysisTreeComponent } from './components/chemical-analyzes/chemical-analysis-tree/chemical-analysis-tree.component';
import { TreeModule } from 'primeng/tree';
import {SidebarModule} from 'primeng/sidebar';

@NgModule({
  declarations: [
    ChemicalAnalyzesComponent,
    FilterComponent,
    TableComponent,
    ChemicalAnalyzesDetailsComponent,
    ChemicalAnalysisTreeComponent,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TableModule,
    TreeModule,
    SidebarModule,
    DropdownModule,
    CalendarModule,
    DynamicDialogModule,
    ChemicalAnalyzesRoutingModule,
    NgxsModule.forFeature([ChemicalAnalyzesState]),
  ],
  providers: [DialogService, SamplingPlacesService, SamplingPointsService, ChemicalAnalysisService, UserService],
})
export class ChemicalAnalyzesModule {}
