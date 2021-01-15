import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '../../shared';
import { FeeRoutingModule } from './fee-routing.module';

import { FeeListComponent } from './components/fee-list/fee-list.component';
import { AddExpenseComponent } from './components/add-expense/add-expense.component';

const COMPONENTS = [FeeListComponent, AddExpenseComponent];

@NgModule({
  imports: [SharedModule, FeeRoutingModule],
  declarations: [...COMPONENTS],
})
export class FeeModule {}
