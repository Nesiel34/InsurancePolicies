import { Component, Inject, OnInit, inject } from '@angular/core';
import { IUser } from '../shared/interface/IUser.interface';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { UserService } from '../service/user.service';



@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule,MatInput,MatFormField,MatButton,MatLabel,MatDialogActions,MatDialogClose,MatError],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit{

  constructor(
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUser,
  ) {
    console.log(data);
  }
  formBuilder: FormBuilder = inject(FormBuilder);
  userService:UserService = inject(UserService);
  userForm!: FormGroup;

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: [this.data?.name, Validators.required],
      email: [this.data?.email, [Validators.required,Validators.email]],
    });
  }

  saveUser(){
    this.userForm.markAllAsTouched();
    if(this.userForm.invalid) return;
    if(this.data) {
      const user = {...this.data, ...this.userForm.value};
      this.userService.updateUser(user).subscribe(() => {
        this.dialogRef.close(user);
      });
    }
    else{
      this.userService.createUser(this.userForm.value).subscribe((res) => {
        const user = {id: res, ...this.userForm.value};
        this.dialogRef.close(user);
      });
    }
  }

}
