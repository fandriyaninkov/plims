import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { ChemicalAnalyzesComponent } from './components/chemical-analyzes/chemical-analyzes.component';

const routes: Routes = [
  {
    path: '',
    component: ChemicalAnalyzesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChemicalAnalyzesRoutingModule {}