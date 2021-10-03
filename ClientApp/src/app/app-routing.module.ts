import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChemicalAnalyzesModule } from './feauters/chemical-analyzes/chemical-analyzes.module';
import { AdminModule } from './feauters/admin/admin.module';

const routes: Routes = [
  // {
  //   path: 'chemicalanalyzes',
  //   loadChildren: () => ChemicalAnalyzesModule
  // },
  {
    path: 'admin',
    loadChildren: () => AdminModule
  },
  {
    path: 'gascondensatecontentwmr',
    loadChildren: () => import('./feauters/gas-condensate-content-wmr/gas-condensate-content-wmr.module')
      .then(m => m.GasCondensateContentWmrModule)
  },
  // {
  //   path: '',
  //   component: AppComponent, pathMatch: 'full'
  // },
  // {
  //   path: '**',
  //   component: AppComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
