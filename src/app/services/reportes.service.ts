import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reportes } from 'src/app/interfaces/reportes'
@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(private http: HttpClient) {

  }
  private url = 'http://localhost:8080/reportes';
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  getListaComentarios(): Observable<Reportes[]> {
    return this.http.get<Reportes[]>(this.url+'/comentario')
  }
  getListaProductos(): Observable<Reportes[]> {
    return this.http.get<Reportes[]>(this.url+'/productos')
  }
  getListaAyuda(): Observable<Reportes[]> {
    return this.http.get<Reportes[]>(this.url+'/ayuda')
  }

  deleteReport(id):Observable<Reportes[]>{
    return this.http.delete<Reportes[]>(this.url+'/'+id)
  }
  nuevoReport(reportes:Reportes) {
    return this.http.post(`${this.url}`,reportes,this.httpOptions)
  }
 

}
