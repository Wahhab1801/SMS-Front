import { Platform } from '@angular/cdk/platform';
import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import Class from '../../models/class.model';

@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassDetailComponent implements OnInit {
  form!: FormGroup;
  submitting = false;

  @Input() class: Class;
  @Output() save = new EventEmitter<Class>();
  @Output() cancel = new EventEmitter();

  constructor(private fb: FormBuilder, private msg: NzMessageService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null, [Validators.required]],
      name: [null, [Validators.required]],
      campusId: [null, [Validators.required]],
    });
    if (this.class) {
      this.form.setValue({
        id: this.class.id,
        name: this.class.name,
        campusId: this.class.campusId,
      });
    }
  }

  submit(): void {
    this.submitting = true;
    setTimeout(() => {
      this.submitting = false;
      this.msg.success(`saved`);
      this.cdr.detectChanges();
    }, 1000);
    console.log('save called');
    this.save.emit(this.class);
  }

  onCancelClick() {
    console.log('cancel called');
    this.cancel.emit();
  }
}
