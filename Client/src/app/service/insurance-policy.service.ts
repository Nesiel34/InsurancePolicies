import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IInsurancePolicy } from '../shared/interface/IInsurancePolicy.interface';
import { IUser } from '../shared/interface/IUser.interface';

@Injectable({
  providedIn: 'root'
})
export class InsurancePolicyService {

  httpClient:HttpClient = inject(HttpClient);
  private selectedUser:BehaviorSubject<IUser|null> = new BehaviorSubject<IUser|null>(null);

  // Create
  createInsurancePolicy(policy: IInsurancePolicy) {
    return this.httpClient.post<number>(`${environment.baseUrl}/InsurancePolicies`, policy);
  }

  // Read
  getInsurancePolicy(id: number){
    return this.httpClient.get<IInsurancePolicy[]>(`${environment.baseUrl}/InsurancePolicies?UserID=${id}`);
  }

  // Update
  updateInsurancePolicy(policy: IInsurancePolicy) {
    return this.httpClient.put(`${environment.baseUrl}/InsurancePolicies`, policy);
  }

  // Delete
  deleteInsurancePolicy(id: number) {
    return this.httpClient.delete(`${environment.baseUrl}/InsurancePolicies?insurancePolicyID=${id}`);
  }

  get selectedUser$(): Observable<IUser|null> {
    return this.selectedUser.asObservable();
  }

  setSelectedUser(user: IUser|null) {
    this.selectedUser.next(user);
  }


}
