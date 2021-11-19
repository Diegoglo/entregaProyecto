/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpService } from '../http/http.service';
import { switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { HttpHeaders } from '@angular/common/http';

const ACCES_TOKEN_KEY = 'my-access-token';
const REFRESH_TOKEN_KEY = 'my-refresh-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  currentAccesToken = null;
  url = environment.baseUrl;

  constructor(private httpService: HttpService, private router: Router) {

  }

  async loadToken() {
    const token = await Storage.get({ key: ACCES_TOKEN_KEY });
    if(token && token.value){
      this.currentAccesToken = token.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  getCurrentUser(): any {
    return this.currentAccesToken;
  }

  login(credetentials: { email; password }): Observable<any>{
    return this.httpService.post('/auth/login', credetentials).pipe(
      switchMap((tokens: { accessToken; refreshToken }) => {
        this.currentAccesToken = tokens.accessToken;
        const storeAccess = Storage.set({ key: ACCES_TOKEN_KEY, value: tokens.accessToken });
        const storeRefresh = Storage.set({ key: REFRESH_TOKEN_KEY, value: tokens.refreshToken });
        return from(Promise.all([storeAccess, storeRefresh]));
      }),
      tap(_ => {
        this.isAuthenticated.next(true);
      })
    );
  }

  logout() {
    return this.httpService.post('/auth/logout',{}).pipe(
      switchMap(_ => {
        this.currentAccesToken = null;

        const deleteAccess = Storage.remove({ key: ACCES_TOKEN_KEY });
        const deleteRefresh = Storage.remove({ key: REFRESH_TOKEN_KEY });
        return from(Promise.all([deleteAccess, deleteRefresh]));
      }),
      tap(_ => {
        this.isAuthenticated.next(false);
        this.router.navigateByUrl('/', {replaceUrl: true});
      })
    ).subscribe();
  };

  getNewAccessToken() {
    const refreshToken = from(Storage.get({ key: REFRESH_TOKEN_KEY }));
    return refreshToken.pipe(
      switchMap(token => {
        if(token && token.value) {
          const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type' : 'application/json',
              Authorization: `Bearer ${token.value}`
            })
          };
          return this.httpService.get(`${this.url}/auth/refresh`, httpOptions);
        }else{

          return of(null);
        }
      })
    );
  }

}
