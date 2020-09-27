import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Suscripcion } from '../interfaces/suscripcion';

@Injectable({
  providedIn: 'root'
})
export class SuscripcionService {
  constructor(private http: HttpClient) {

  }
  private url = 'http://localhost:8080/suscripcion';
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  getListaSubsNormal(): Observable<Suscripcion[]> {
    return this.http.get<Suscripcion[]>(this.url)
  }

 getListaSubs(noticia): Observable<Suscripcion[]> {
    return this.http.get<Suscripcion[]>(this.url+'/all/'+noticia)
  }

  postMensaje(suscripcion:Suscripcion) {
    return this.http.post(`${this.url}`,suscripcion,this.httpOptions)
  }

  deleteMensaje(correo): Observable<Suscripcion[]> {
    return this.http.delete<Suscripcion[]>(this.url+"/"+correo)
  }
}