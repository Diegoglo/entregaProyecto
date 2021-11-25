import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http/http.service';
import { Observable } from 'rxjs';
import { Auxx} from '../../model/auxx.model';

@Injectable({
  providedIn: 'root'
})
export class AuxilianteService {

  constructor(private http: HttpService) { }
  getAllAuxiliante(): Observable<any>{
    return this.http.get<Auxx[]>('/auxiliante/all');
  }

  getAuxiliante(id: string): Observable<any>{
    return this.http.get<Auxx>(`/auxiliante/${id}/all`);
  }

  getAuxilianteByEmail(id: string, email:string): Observable<any>{
    return this.http.get<Auxx>(`/auxiliante/${id}/byEmail?email=${email}`);
  }
  
  getAuxilianteByTelefono(id: string, telefono:string): Observable<any>{
    return this.http.get<Auxx>(`/auxiliante/${id}/byTelefono=?telefono=${telefono}`);
  }

  addAuxiliante(user: Auxx): Observable<Auxx>{
    return this.http.post<Auxx>('/auxiliante/register', user);
  }

  updateAuxiliante(id: string, user: Auxx): Observable<Auxx>{
    return this.http.patch<Auxx>(`/auxiliante/${id}`, user);
  }

  deleteAuxiliante(id: string): Observable<Auxx>{
    return this.http.delete<Auxx>(`/auxiliante/${id}`);
  }
}

