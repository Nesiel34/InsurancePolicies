import { Component, Inject, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { InsurancePolicyService } from '../service/insurance-policy.service';
import { IInsurancePolicy } from '../shared/interface/IInsurancePolicy.interface';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import { IUser } from '../shared/interface/IUser.interface';




@Component({
  selector: 'app-insurance-policy-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInput,
    MatFormField,
    MatButton,
    MatInputModule,
    MatLabel,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatError,
    MatDatepickerModule,
  ],
  templateUrl: './insurance-policy-form.component.html',
  styleUrl: './insurance-policy-form.component.scss',
})
export class InsurancePolicyFormComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<InsurancePolicyFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IInsurancePolicy
  ) {
    console.log(data);
  }
  formBuilder: FormBuilder = inject(FormBuilder);
  insurancePolicyService: InsurancePolicyService = inject(
    InsurancePolicyService
  );
  insurancePolicyForm!: FormGroup;
  user!:IUser;
  ngOnInit(): void {

    this.insurancePolicyService.selectedUser$.subscribe((user) => {
      if(user){
        this.user = user;
      }
    });
    let policyNumber = this.data?.policyNumber;
    if (!policyNumber) {
      policyNumber = this.uuidv4();
    }
    this.insurancePolicyForm = this.formBuilder.group({
      policyNumber: [
        { value: policyNumber, disabled: true },
        Validators.required,
      ],
      insuranceAmount: [
        this.data?.insuranceAmount,
        [Validators.required, Validators.pattern(/^\d+$/)],
      ],
      startDate: [this.data?.startDate, [Validators.required]],
      endDate: [
        this.data?.endDate,
        [Validators.required],
      ],
    });
  }

  save() {
    this.insurancePolicyForm.markAllAsTouched();
    if (this.insurancePolicyForm.invalid) return;
    if (this.data) {
      let insurancePolicyPrev = {...this.data,...this.insurancePolicyForm.getRawValue()};
      const insurancePolicy = { UserID:this.user.id, ...insurancePolicyPrev };
      this.insurancePolicyService.updateInsurancePolicy(insurancePolicy).subscribe(() => {
        this.dialogRef.close(insurancePolicy);
      });
    } else {
      const insurancePolicy = { UserID:this.user.id, ...this.insurancePolicyForm.getRawValue()};
      this.insurancePolicyService
        .createInsurancePolicy(insurancePolicy)
        .subscribe((res) => {
          const insurancePolicy = { id: res, ...this.insurancePolicyForm.getRawValue() };
          this.dialogRef.close(insurancePolicy);
        });
    }
  }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

}
