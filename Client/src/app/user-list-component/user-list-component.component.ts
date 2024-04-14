import { Component, OnInit, inject } from '@angular/core';
import { MatTableModule,MatTableDataSource } from '@angular/material/table';
import { ITableColumns } from '../shared/interface/ITableColumns.interface';
import { UserService } from '../service/user.service';
import { MatIconButton, MatMiniFabButton } from '@angular/material/button';
import { IUser } from '../shared/interface/IUser.interface';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {
  MatDialog,
} from '@angular/material/dialog';
import { UserFormComponent } from '../user-form/user-form.component';
import { Router } from '@angular/router';
import { InsurancePolicyService } from '../service/insurance-policy.service';




@Component({
  selector: 'app-user-list-component',
  standalone: true,
  imports: [MatTableModule,MatIconButton,MatIcon,MatMiniFabButton,MatTooltip],
  templateUrl: './user-list-component.component.html',
  styleUrl: './user-list-component.component.scss'
})
export class UserListComponentComponent implements OnInit{

  tableColumns: ITableColumns[] = [
    { key: 'id', title: 'מספר לקוח' },
    { key: 'name', title: 'שם לקוח' },
    { key: 'email', title: 'מייל' },
    { key: 'actions', title: 'פעולות' }
  ];
  displayedColumns: string[] = this.tableColumns.map(column => column.key);
  userService: UserService = inject(UserService);
  insurancePolicyService:InsurancePolicyService = inject(InsurancePolicyService);
  dataSource = new MatTableDataSource<IUser>();
  dialog: MatDialog = inject(MatDialog);
  private router: Router = inject(Router);



  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.dataSource.data = users
    });
  }

  newUser() {
    const dialogRef = this.dialog.open(UserFormComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.dataSource.data = [...this.dataSource.data, result];
      }
    });
  }

  editUser(user:IUser) {
    const dialogRef = this.dialog.open(UserFormComponent, {
      data: user
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
          this.dataSource.data = this.dataSource.data.map(u => {
            if(u.id === result.id) {
              return result;
            }
            return u;
          });
      }
    });
  }

  deleteUser(user:IUser) {
    this.userService.deleteUser(user.id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(u => u.id !== user.id);
    });
  }

  getInsurancePolicies(user:IUser) {
    this.insurancePolicyService.setSelectedUser(user);
    this.router.navigate(['/user-details']);
  }


}

