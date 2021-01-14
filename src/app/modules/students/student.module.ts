import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '../../shared';
import { StudentRoutingModule } from './student-routing.module';

import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';

const COMPONENTS = [StudentListComponent, StudentDetailComponent];

@NgModule({
  imports: [SharedModule, StudentRoutingModule],
  declarations: [...COMPONENTS],
})
export class StudentModule {}
