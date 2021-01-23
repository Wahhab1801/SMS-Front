import { Platform } from '@angular/cdk/platform';
import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import Student from '../../models/student.model';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentDetailComponent implements OnInit {
  form!: FormGroup;
  submitting = false;
  gender: string[] = ['Male', 'Female'];

  @Input() student: Student;
  @Output() save = new EventEmitter<Student>();
  @Output() cancel = new EventEmitter();

  constructor(private fb: FormBuilder, private msg: NzMessageService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [null, [Validators.required]],
      date: [null, [Validators.required]],
      goal: [null, [Validators.required]],
      standard: [null, [Validators.required]],
      client: [null, []],
      invites: [null, []],
      weight: [null, []],
      public: [1, [Validators.min(1), Validators.max(3)]],
      publicUsers: [null, []],
    });
  }

  submit(): void {
    this.submitting = true;
    setTimeout(() => {
      this.submitting = false;
      this.msg.success(`提交成功`);
      this.cdr.detectChanges();
    }, 1000);
    console.log('save called');
    this.save.emit(this.student);
  }

  onCancelClick() {
    console.log('cancel called');
    this.cancel.emit();
  }
}
