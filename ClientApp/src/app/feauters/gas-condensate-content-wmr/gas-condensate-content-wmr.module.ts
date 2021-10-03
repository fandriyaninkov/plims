import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GasCondensateContentWmrRoutingModule } from './gas-condensate-content-wmr-routing.module';
import { GasCondensateContentWmrComponent } from './gas-condensate-content-wmr.component';
import { GasCondensateContentWmrTreeComponent } from './components/gas-condensate-content-wmr-tree/gas-condensate-content-wmr-tree.component';
import { TreeModule } from 'primeng/tree';
import { GasCondensateContentWmrFilterComponent } from './components/gas-condensate-content-wmr-filter/gas-condensate-content-wmr-filter.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GasCondensateContentWmrTableComponent } from './components/gas-condensate-content-wmr-table/gas-condensate-content-wmr-table.component';
import { TableModule } from 'primeng/table';
import { GasCondensateContentWmrService, SamplingPlacesService, SamplingPointsService, UserService } from 'src/app/core/nswag/plims-generated';
import { NgxsModule } from '@ngxs/store';
import { GasCondensateContentWmrState } from './state/gas-condensate-content-wmr.state';
import { HttpClientModule } from '@angular/common/http';
import { GasCondensateContentWmrDetailsComponent } from './components/gas-condensate-content-wmr-details/gas-condensate-content-wmr-details.component';
import { DialogService } from 'primeng/dynamicdialog';
import { DropdownModule } from 'primeng/dropdown';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { ChartComponent } from './components/chart/chart.component';

import 'hammerjs';
import 'chartjs-plugin-zoom';


@NgModule({
  declarations: [GasCondensateContentWmrComponent, GasCondensateContentWmrTreeComponent, GasCondensateContentWmrFilterComponent, GasCondensateContentWmrTableComponent, GasCondensateContentWmrDetailsComponent, ChartComponent],
  imports: [
    CommonModule,
    FormsModule,
    GasCondensateContentWmrRoutingModule,
    TreeModule,
    CalendarModule,
    TableModule,
    ReactiveFormsModule,
    DropdownModule,
    TabMenuModule,
    TabViewModule,
    NgxsModule.forFeature([GasCondensateContentWmrState])
  ],
  providers: [SamplingPlacesService, SamplingPointsService, UserService, DialogService, GasCondensateContentWmrService]
})
export class GasCondensateContentWmrModule { }
