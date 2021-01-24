import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { _HttpClient } from '@delon/theme';
import { Subscription, zip } from 'rxjs';
import { filter } from 'rxjs/operators';
import { StudentActivitiesComponent } from './activities/student-activities.component';
import { StudentGradesComponent } from './grades/student-grades.component';
import Student from '../../models/student.model';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentProfileComponent implements OnInit, OnDestroy {
  private router$!: Subscription;
  private studentService: StudentService;

  @Input() class: Student;

  constructor(private route: ActivatedRoute, private router: Router, private http: _HttpClient, private cdr: ChangeDetectorRef) {
    this.route.params.subscribe((params) => console.log(params));
    this.route.params.subscribe((params) => this.studentService.getAll());
  }
  @ViewChild('tagInput', { static: false }) private tagInput!: ElementRef<HTMLInputElement>;
  user: any;
  notice: any;
  //selectedStudent: any;

  tabs = [
    {
      key: 'activities',
      tab: 'Activities',
    },
    {
      key: 'grades',
      tab: 'Grades',
    },
  ];
  pos = 0;
  taging = false;
  tagValue = '';

  private setActive(): void {
    const key = this.router.url.substr(this.router.url.lastIndexOf('/') + 1);
    const idx = this.tabs.findIndex((w) => w.key === key);
    if (idx !== -1) {
      this.pos = idx;
    }
  }

  ngOnInit(): void {
    zip(this.http.get('/user/current'), this.http.get('/api/notice')).subscribe(([user, notice]) => {
      this.user = user;
      this.notice = notice;
      this.cdr.detectChanges();
    });
    this.router$ = this.router.events.pipe(filter((e) => e instanceof ActivationEnd)).subscribe(() => this.setActive());
    this.setActive();
  }

  to(item: { key: string }): void {
    this.router.navigateByUrl(`/students/components/student-profile/${item.key}`);
  }
  tagShowIpt(): void {
    this.taging = true;
    this.cdr.detectChanges();
    this.tagInput.nativeElement.focus();
  }

  tagBlur(): void {
    const { user, cdr, tagValue } = this;
    if (tagValue && user.tags.filter((tag: { label: string }) => tag.label === tagValue).length === 0) {
      user.tags.push({ label: tagValue });
    }
    this.tagValue = '';
    this.taging = false;
    cdr.detectChanges();
  }

  tagEnter(e: KeyboardEvent): void {
    // tslint:disable-next-line: deprecation
    if (e.keyCode === 13) {
      this.tagBlur();
    }
  }

  ngOnDestroy(): void {
    this.router$.unsubscribe();
  }
}
