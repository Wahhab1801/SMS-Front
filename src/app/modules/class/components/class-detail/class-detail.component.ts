import { Platform } from '@angular/cdk/platform';
import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import Class from '../../models/class.model';
import { CampusService } from '../../../campus/services/campus.service';
import Campus from '../../../campus/models/campus.model';
import { ClassService } from '../../services/class.service';
import { Mode } from '../../../../shared/utils/utils';

@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassDetailComponent implements OnInit {
  private mode: Mode;

  form!: FormGroup;
  submitting = false;
  campuses: Campus[];

  @Input() class: Class;
  @Output() save = new EventEmitter<Class>();
  @Output() cancel = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private campusSrc: CampusService,
    private classService: ClassService,
    private msg: NzMessageService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.mode = this.class?.id ? Mode.Edit : Mode.Add;

    this.form = this.fb.group({
      id: [null, [Validators.required]],
      name: [null, [Validators.required]],
      campusId: [null, [Validators.required]],
    });
    this.campusSrc.getAll().subscribe((data) => {
      this.campuses = data;
      if ([Mode.Edit, Mode.View].includes(this.mode)) {
        this.form.setValue({
          id: this.class.id,
          name: this.class.name,
          campusId: this.class.campusId,
        });
      }
    });
  }

  submit(): void {
    this.submitting = true;

    if (this.mode === Mode.Edit) {
      const updateClass: Class = {
        ...this.form.value,
        isDeleted: this.class.isDeleted,
        campusName: this.campuses.filter(({ id }) => this.form.value.campusId === id)[0].name,
      };
      this.classService.update(updateClass, this.class.id).subscribe((data) => {
        this.submitting = false;
        this.msg.success(`saved`);
        this.save.emit(data);
      });
    } else {
      const newClass: Class = {
        ...this.form.value,
        isDeleted: false,
        campusName: this.campuses.filter(({ id }) => this.form.value.campusId === id)[0].name,
        id: Date.now().valueOf(),
      };
      this.classService.save(newClass).subscribe((data) => {
        this.submitting = false;
        this.msg.success(`saved`);
        this.save.emit(data);
      });
    }
  }

  onCancelClick() {
    console.log('cancel called');
    this.cancel.emit();
  }
}
