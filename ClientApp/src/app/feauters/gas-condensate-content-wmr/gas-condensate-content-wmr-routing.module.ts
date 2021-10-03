import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GasCondensateContentWmrComponent } from './gas-condensate-content-wmr.component';

const routes: Routes = [{ path: '', component: GasCondensateContentWmrComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GasCondensateContentWmrRoutingModule { }
