import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { IUser } from '../shared/interface/IUser.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpClient:HttpClient = inject(HttpClient);


  getAllUsers() {
    return this.httpClient.get<IUser[]>(`${environment.baseUrl}/user`);
  }


  createUser(user: IUser) {
    return this.httpClient.post(`${environment.baseUrl}/user`, user);
  }

  updateUser(user: IUser) {
    return this.httpClient.put(`${environment.baseUrl}/user`, user);
  }

  deleteUser(id: number) {
    return this.httpClient.delete(`${environment.baseUrl}/user?userID=${id}`);
  }
}
