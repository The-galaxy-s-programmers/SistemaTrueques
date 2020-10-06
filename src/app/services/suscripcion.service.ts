import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Suscripcion } from '../interfaces/suscripcion';
import { SuscripcionNormal } from '../interfaces/suscripcion-normal';

@Injectable({
  providedIn: 'root'
})
export class SuscripcionService {
  constructor(private http: HttpClient) {

  }
  private url = 'http://localhost:8080/suscripcion';
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  getListaSubsNormal(): Observable<SuscripcionNormal[]> {
    return this.http.get<SuscripcionNormal[]>(this.url)
  }

  postSubs(suscripcion:SuscripcionNormal) {
    return this.http.post(`${this.url}`,suscripcion,this.httpOptions)
  }
  EnvioEmails(correo):Observable<number> {
    return this.http.get<number>(this.url+"/envio/"+correo)
  }

  deleteSubs(correo): Observable<SuscripcionNormal[]> {
    return this.http.delete<SuscripcionNormal[]>(this.url+"/"+correo)
  }
}