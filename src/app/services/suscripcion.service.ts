import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SuscripcionService {
  constructor(private http: HttpClient) {

  }
  private url = 'http://localhost:8080/favorito';
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  private nomusuario = '/find/';
  private exist='/mail/';
  private existe='/user/';
}
