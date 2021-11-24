/* eslint-disable @typescript-eslint/naming-convention */
import { HttpHandler, HttpInterceptor, HttpRequest, HttpEvent, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable, throwError, BehaviorSubject, of } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { catchError, switchMap, filter, take, finalize } from 'rxjs/operators';
import { environment} from '../../environments/environment';
import { AuthService} from '../core/services/auth/auth.service';
import { timeStamp } from 'console';

@Injectable()
export class JwtInterceptor implements HttpInterceptor{

  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  isRefreshingToken=false;

  constructor(private authService: AuthService, private toastCtrl: ToastController){}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any>{
      if (this.isInBlockedList(request.url)){
          return next.handle(request);
      }else{
          return next.handle(this.addToken(request)).pipe(
              catchError(err => {
                  if (err instanceof HttpErrorResponse){
                      switch (err.status){
                          case 400:
                              return this.handle400Error(err);
                          // case 401:
                          //    return this.handle401Error(request, next);
                          default:
                              return throwError(err);
                      }
                  } else{
                      return throwError(err);
                  }
              })
          );
      }
  }

  private isInBlockedList(url: string): boolean {
      if (url === `${environment.baseUrl}/auth/login` ||
          url === `${environment.baseUrl}/auth/logout`|| 
          url === `${environment.baseUrl}/users/register`){
          return true;
      }else{
          return false;
      }
  }

  private addToken(req: HttpRequest<any>){
      if (this.authService.currentAccesToken){
          return req.clone({
              headers: new HttpHeaders({
                  Authorization: `Bearer ${this.authService.currentAccesToken}`
              })
          });
      } else {
          return req;
      }
  }

  private async handle400Error(err){
      const toast= await this.toastCtrl.create({
          message:'Logged out due to authentication mismatch',
          duration:2000
      });
      toast.present();
      this.authService.logout();
      return of (null);
  }

  // private handle401Error(request: HttpRequest<any>, next: HttpHandler){
  //     if (!this.isRefreshingToken){
  //         this.tokenSubject.next(null);
  //         this.isRefreshingToken=true;
  //         this.authService.currentAccesToken=null;

  //         return this.authService.getNewAccessToken().pipe(
  //             switchMap((token: any)=>{
  //               console.log('new token: ',token);

  //               if (token) {
  //                 const accessToken= token.accessToken;
  //                 return this.authService.storeAccessToken(accessToken).pipe(
  //                     switchMap( _ =>{
  //                         console.log('handling request afeter storing token');
  //                         this.tokenSubject.next(accessToken);
  //                         return next.handle(this.addToken(request));
  //                     })
  //                 );
  //               } else {
  //                   return of(null);
  //               }
  //             }),
  //             finalize(()=>{
  //                 this.isRefreshingToken=false;
  //             })
  //         );
  //     }else{
  //         return this.tokenSubject.pipe(
  //             filter(token=>token !== null),
  //             take(1),
  //             switchMap(token => next.handle(this.addToken(request)))
  //         );
  //     }
  // }

}
