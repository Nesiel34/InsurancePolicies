import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { InsurancePolicyService } from '../service/insurance-policy.service';
import { Subscription } from 'rxjs';
import { MatButton, MatFabButton, MatIconButton, MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltip } from '@angular/material/tooltip';
import { IInsurancePolicy } from '../shared/interface/IInsurancePolicy.interface';
import { ITableColumns } from '../shared/interface/ITableColumns.interface';
import { DatePipe } from '@angular/common';
import {MatCard,MatCardTitle,MatCardContent, MatCardActions} from '@angular/material/card';
import { IUser } from '../shared/interface/IUser.interface';
import { Router } from '@angular/router';
import { InsurancePolicyFormComponent } from '../insurance-policy-form/insurance-policy-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-details-component',
  standalone: true,
  imports: [MatTableModule,
    MatIconButton,MatIcon,MatMiniFabButton,MatTooltip,DatePipe,MatCard,MatCardTitle,MatCardContent,MatCardActions],
  templateUrl: './user-details-component.component.html',
  styleUrl: './user-details-component.component.scss'
})
export class UserDetailsComponentComponent implements OnInit,OnDestroy{

  insurancePolicyService:InsurancePolicyService = inject(InsurancePolicyService);
  subSelectedUser!:Subscription;
  private router: Router = inject(Router);
  dialog: MatDialog = inject(MatDialog);
  dataSource = new MatTableDataSource<IInsurancePolicy>();
  tableColumns: ITableColumns[] = [
    { key: 'id', title: 'מספר מזהה' },
    { key: 'policyNumber', title: 'מספר ביטוח' },
    { key: 'insuranceAmount', title: 'סכום ביטוח' },
    { key: 'startDate', title: 'תאריך התחלה',isDate:true },
    { key: 'endDate', title: 'תאריך סיום' ,isDate:true},
    { key: 'actions', title: 'פעולות' }
  ];
  displayedColumns: string[] = this.tableColumns.map(column => column.key);
  user!:IUser;
  ngOnInit(): void {
   this.subSelectedUser = this.insurancePolicyService.selectedUser$.subscribe(user => {
      if(user) {
        this.user = user;
        this.insurancePolicyService.getInsurancePolicy(user.id).subscribe(policies => {
          console.log(policies);
          this.dataSource.data = policies;
        });
      }
    });
  }

  back() {
    this.insurancePolicyService.setSelectedUser(null);
    this.router.navigate(['/user-list']);
  }

  newInsurancePolicy() {
    const dialogRef = this.dialog.open(InsurancePolicyFormComponent, {width: '500px'});
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.dataSource.data = [...this.dataSource.data, result];
      }
    });
  }

  editInsurancePolicy(policy:IInsurancePolicy) {
    const dialogRef = this.dialog.open(InsurancePolicyFormComponent, {
      data: policy
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

  deleteInsurancePolicy(policy:IInsurancePolicy) {
    this.insurancePolicyService.deleteInsurancePolicy(policy.id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(u => u.id !== policy.id);
    });
  }

  ngOnDestroy(): void {
    this.subSelectedUser.unsubscribe();

  }

}
