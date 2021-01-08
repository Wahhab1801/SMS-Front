import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { ClassRoutingModule } from './class-routing.module';

import { ClassListComponent } from './components/class-list/class-list.component';
import { ClassDetailComponent } from './components/class-detail/class-detail.component';

const COMPONENTS = [ClassListComponent, ClassDetailComponent];

@NgModule({
  imports: [SharedModule, ClassRoutingModule],
  declarations: [...COMPONENTS],
})
export class ClassModule {}
