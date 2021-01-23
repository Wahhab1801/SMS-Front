import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';
import { StudentProfileComponent } from './components/student-profile/student-profile.component';
import { StudentActivitiesComponent } from './components/student-profile/activities/student-activities.component';
import { StudentGradesComponent } from './components/student-profile/grades/student-grades.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: StudentListComponent },
  { path: 'detail', component: StudentDetailComponent },
  { path: 'profile', component: StudentProfileComponent },
  { path: 'activities', component: StudentActivitiesComponent },
  { path: 'gardes', component: StudentGradesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
