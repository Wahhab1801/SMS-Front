import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '../../shared';
import { StudentRoutingModule } from './student-routing.module';

import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';
import { StudentProfileComponent } from './components/student-profile/student-profile.component';
import { StudentActivitiesComponent } from './components/student-profile/activities/student-activities.component';
import { StudentGradesComponent } from './components/student-profile/grades/student-grades.component';

const COMPONENTS = [
  StudentListComponent,
  StudentDetailComponent,
  StudentProfileComponent,
  StudentActivitiesComponent,
  StudentGradesComponent,
];

@NgModule({
  imports: [SharedModule, StudentRoutingModule],
  declarations: [...COMPONENTS],
})
export class StudentModule {}
