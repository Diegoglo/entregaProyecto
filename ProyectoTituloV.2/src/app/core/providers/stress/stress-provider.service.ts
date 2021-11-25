import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class StressProviderService {

  constructor(private http: HttpService) { }

  sendMail(emailBody): Observable<any>{
    return this.http.post<any>('/stress/mail', emailBody);
  }
}
