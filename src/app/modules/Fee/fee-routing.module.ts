import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeeListComponent } from './components/fee-list/fee-list.component';
import { AddExpenseComponent } from './components/add-expense/add-expense.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: FeeListComponent },
  { path: 'detail', component: AddExpenseComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeeRoutingModule {}
