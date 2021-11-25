import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http/http.service';
import { Observable } from 'rxjs';
import { User2 } from '../../model/user2.model';


@Injectable({
  providedIn: 'root'
})
export class UserProviderService {

  constructor(private http: HttpService) { }

  getAllUsers(): Observable<any>{
    return this.http.get<User2[]>('/users/all');
  }

  getUser(id: string): Observable<any>{
    return this.http.get<User2>(`/users/${id}`);
  }

  addUser(user: User2): Observable<User2>{
    return this.http.post<User2>('/users/register', user);
  }

  updateUser(id: string, user: User2): Observable<User2>{
    return this.http.patch<User2>(`/users/${id}/personal-data`, user);
  }

  deleteUser(id: string): Observable<User2>{
    return this.http.delete<User2>(`/users/${id}`);
  }
}
