import { Platform } from '@angular/cdk/platform';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassDetailComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      url: [null, [Validators.required]],
      owner: [undefined, [Validators.required]],
      approver: [null, [Validators.required]],
      date_range: [null, [Validators.required]],
      type: [null, [Validators.required]],
      name2: [null, [Validators.required]],
      summary: [null, [Validators.required]],
      owner2: [null, [Validators.required]],
      approver2: [null, [Validators.required]],
      time: [null, [Validators.required]],
      type2: [null, [Validators.required]],
      items: this.fb.array([]),
    });
    const userList = [
      {
        key: '1',
        workId: '00001',
        name: 'John Brown',
        department: 'New York No. 1 Lake Park',
      },
      {
        key: '2',
        workId: '00002',
        name: 'Jim Green',
        department: 'London No. 1 Lake Park',
      },
      {
        key: '3',
        workId: '00003',
        name: 'Joe Black',
        department: 'Sidney No. 1 Lake Park',
      },
    ];
    userList.forEach((i) => {
      const field = this.createUser();
      field.patchValue(i);
      this.items.push(field);
    });
  }

  createUser(): FormGroup {
    return this.fb.group({
      key: [null],
      workId: [null, [Validators.required]],
      name: [null, [Validators.required]],
      department: [null, [Validators.required]],
    });
  }

  //#region get form fields
  get name(): AbstractControl {
    return this.form.controls.name;
  }
  get url(): AbstractControl {
    return this.form.controls.url;
  }
  get owner(): AbstractControl {
    return this.form.controls.owner;
  }
  get approver(): AbstractControl {
    return this.form.controls.approver;
  }
  get time_start(): AbstractControl {
    return this.form.controls.time_start;
  }
  get time_end(): AbstractControl {
    return this.form.controls.time_end;
  }
  get type(): AbstractControl {
    return this.form.controls.type;
  }
  get name2(): AbstractControl {
    return this.form.controls.name2;
  }
  get summary(): AbstractControl {
    return this.form.controls.summary;
  }
  get owner2(): AbstractControl {
    return this.form.controls.owner2;
  }
  get approver2(): AbstractControl {
    return this.form.controls.approver2;
  }
  get time(): AbstractControl {
    return this.form.controls.time;
  }
  get type2(): AbstractControl {
    return this.form.controls.type2;
  }
  get items(): FormArray {
    return this.form.controls.items as FormArray;
  }
  //#endregion

  add(): void {
    this.items.push(this.createUser());
  }

  save(index: number): void {
    const item = this.items.at(index) as FormGroup;
    Object.keys(item.controls).forEach((key) => {
      item.controls[key].markAsDirty();
      item.controls[key].updateValueAndValidity();
    });
    if (item.invalid) {
      return;
    }
  }

  cancel(index: number): void {}

  _submitForm(): void {
    Object.keys(this.form.controls).forEach((key) => {
      this.form.controls[key].markAsDirty();
      this.form.controls[key].updateValueAndValidity();
    });
    if (this.form.invalid) {
      return;
    }
  }
}
