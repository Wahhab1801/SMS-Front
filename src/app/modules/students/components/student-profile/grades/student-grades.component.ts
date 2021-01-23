import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-student-grades',
  templateUrl: './student-grades.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentGradesComponent {
  list!: any[];

  constructor(private http: _HttpClient, private cdr: ChangeDetectorRef) {
    this.http.get('/api/list', { count: 8 }).subscribe((res) => {
      this.list = res;
      this.cdr.detectChanges();
    });
  }
}
