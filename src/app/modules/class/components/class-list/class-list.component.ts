import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { STChange, STColumn, STComponent, STData, STDataSource } from '@delon/abc/st';
import { ModalHelper } from '@delon/theme';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ClassService } from '../../services/class.service';
import Class from '../../models/class.model';
import { ClassDetailComponent } from '../class-detail/class-detail.component';

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
  data: Class[] = [];
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
            component: ClassDetailComponent,
            paramsName: 'class',
          },
          // click: (record) => {
          //   this.modalHelper.create(ClassDetailComponent, { record: { a: 1, b: '2', c: new Date() } }).subscribe(res => {
          //     this.msg.info(res);
          //   });
          // }
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
            this.classService.delete(record.id).subscribe((data) => {
              this.msg.success(`Successfully Deleted ${data.name}】`);
              comp!.removeRow(record);
            });
          },
        },
      ],
    },
  ];
  selectedRows: STData[] = [];
  description = '';
  expandForm = false;

  constructor(
    private classService: ClassService,
    public msg: NzMessageService,
    private modalSrv: NzModalService,
    private cdr: ChangeDetectorRef,
    private modalHelper: ModalHelper,
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
        this.cdr.detectChanges();
        break;
      case 'filter':
        this.getData();
        break;
    }
  }

  remove(): void {}

  approval(): void {
    this.msg.success(` ${this.selectedRows.length}`);
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
    setTimeout(() => this.getData());
  }

  onClassCancel() {
    this.selectedClass = null;
    console.log('cancel received');
  }

  onClassSave(savedClass: Class) {
    this.getData();
    console.log('save received');
  }
}
