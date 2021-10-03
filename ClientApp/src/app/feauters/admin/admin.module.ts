import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { TreeModule } from 'primeng/tree';
import { TableModule } from 'primeng/table';
import { UsersComponent } from './components/users/users.component';
import { AdminState } from './state/admin.state';
import { NgxsModule } from '@ngxs/store';
import { AdminService, SamplingPlacesService, SamplingPointsService, UserService } from 'src/app/core/nswag/plims-generated';
import { HttpClientModule } from '@angular/common/http';
import { UserState } from './state/user.state';
import { UserDetailsComponent } from './components/users/user-details/user-details.component';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SamplingPlaceComponent } from './components/sampling-place/sampling-place.component';
import {TreeTableModule} from 'primeng/treetable';
import { SamplingPlaceState } from './state/sampling-place.state';
import { SamplingPlaceDetailsComponent } from './components/sampling-place/sampling-place-details/sampling-place-details.component';
import { SamplingPointDetailsComponent } from './components/sampling-place/sampling-point-details/sampling-point-details.component';
import { DropdownModule } from 'primeng/dropdown';
import { SelectCreateWindowComponent } from './components/sampling-place/select-create-window/select-create-window.component';
import { RadioButtonModule } from 'primeng/radiobutton';



@NgModule({
  declarations: [AdminComponent, UsersComponent, UserDetailsComponent, SamplingPlaceComponent, SamplingPlaceDetailsComponent, SamplingPointDetailsComponent, SelectCreateWindowComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    TreeModule,
    TableModule,
    DynamicDialogModule,
    FormsModule,
    ReactiveFormsModule,
    TreeTableModule,
    DropdownModule,
    RadioButtonModule,
    NgxsModule.forFeature([AdminState, UserState, SamplingPlaceState]),
  ],
  providers: [UserService, AdminService, DialogService, SamplingPlacesService, SamplingPointsService]
})
export class AdminModule { }
