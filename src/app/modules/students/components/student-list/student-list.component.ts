import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { STChange, STColumn, STComponent, STData } from '@delon/abc/st';
import { _HttpClient } from '@delon/theme';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { StudentService } from '../../services/student.service';
import Student from '../../models/student.model';
import { StudentDetailComponent } from '../student-detail/student-detail.component';
import { StudentProfileComponent } from '../student-profile/student-profile.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-class-list',
  templateUrl: './student-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentListComponent implements OnInit {
  selectedStudent: Student;

  q: {
    pi: number;
    ps: number;
    sorter: string;
    status: number | null;
    name: string;
    campusName: string;
    statusList: NzSafeAny[];
  } = {
    pi: 1,
    ps: 10,
    sorter: '',
    status: null,
    name: '',
    campusName: '',
    statusList: [],
  };
  data: Student[] = [];
  loading = false;
  @ViewChild('st', { static: true })
  st!: STComponent;
  columns: STColumn[] = [
    {
      title: '',
      index: 'id',
      type: 'checkbox',
    },
    { title: 'Name', index: 'name' },
    { title: 'Campus Name', index: 'campusName' },
    {
      title: 'Enabled',
      index: 'isDeleted',
    },
    {
      title: '',
      buttons: [
        {
          text: '',
          icon: 'edit',
          type: 'modal',
          modal: {
            component: StudentDetailComponent,
            paramsName: 'student',
          },
          //  click: (record) => {
          //    this.modalHelper.create(ClassDetailComponent, { record: { a: 1, b: '2', c: new Date() } }).subscribe(res => {
          //      this.msg.info(res);
          //    });
          //  }
        },
        {
          text: '',
          icon: 'delete',
          type: 'del',
          pop: {
            title: 'Are you sure?',
            okType: 'danger',
            icon: 'star',
          },
          click: (record, _modal, comp) => {
            this.studentService.delete(record.id).subscribe((data) => {
              this.msg.success(`Successfully Deleted ${data.name}】`);
              comp!.removeRow(record);
            });
          },
        },
        {
          text: '',
          icon: 'eye',
          type: 'link',

          click: (record) => {
            this.router.navigate(['students/profile']);
          },
        },
      ],
    },
  ];
  selectedRows: STData[] = [];
  description = '';
  totalCallNo = 0;
  expandForm = false;

  constructor(
    private studentService: StudentService,
    public msg: NzMessageService,
    private modalSrv: NzModalService,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.loading = true;
    this.studentService.getAll(this.q).subscribe((res) => {
      this.data = res;
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  stChange(e: STChange): void {
    switch (e.type) {
      case 'checkbox':
        this.selectedRows = e.checkbox!;
        this.totalCallNo = this.selectedRows.reduce((total, cv) => total + cv.callNo, 0);
        this.cdr.detectChanges();
        break;
      case 'filter':
        this.getData();
        break;
    }
  }

  remove(): void {}

  approval(): void {
    this.msg.success(`审批了 ${this.selectedRows.length} 笔`);
  }

  add(tpl: TemplateRef<{}>): void {
    this.modalSrv.create({
      nzTitle: 'Add',
      nzContent: tpl,
      nzOnOk: () => {
        this.loading = true;
      },
    });
  }

  reset(): void {
    // wait form reset updated finished
    setTimeout(() => this.getData());
  }

  onStudentCancel() {
    this.selectedStudent = null;
    console.log('cancel received');
  }

  onStudentSave() {
    this.selectedStudent = null;
    console.log('save received');
  }
}
