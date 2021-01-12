import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { STChange, STColumn, STComponent, STData } from '@delon/abc/st';
import { _HttpClient } from '@delon/theme';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { map, tap } from 'rxjs/operators';
import { ClassService } from '../../services/class.service';
import Class from '../../models/class.model';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassListComponent implements OnInit {
  selectedClass: Class;

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
  data: any[] = [];
  loading = false;
  status = [
    { index: 0, text: 'default', value: false, type: 'default', checked: false },
    {
      index: 1,
      text: 'processing',
      value: false,
      type: 'processing',
      checked: false,
    },
    { index: 2, text: 'success', value: false, type: 'success', checked: false },
    { index: 3, text: 'error', value: false, type: 'error', checked: false },
  ];
  @ViewChild('st', { static: true })
  st!: STComponent;
  columns: STColumn[] = [
    { title: 'Name', index: 'name' },
    { title: 'Campus Name', index: 'campusName' },
    {
      title: 'Enabled',
      index: 'isDeleted',
    },
  ];
  selectedRows: STData[] = [];
  description = '';
  totalCallNo = 0;
  expandForm = false;

  constructor(
    private classService: ClassService,
    public msg: NzMessageService,
    private modalSrv: NzModalService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.loading = true;
    this.classService.getAllClasses(this.q).subscribe((res) => {
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

  onClassCancel() {
    this.selectedClass = null;
    console.log('cancel received');
  }

  onClassSave() {
    this.selectedClass = null;
    console.log('save received');
  }
}
