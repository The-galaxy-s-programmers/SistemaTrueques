import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductoTrocado } from 'src/app/interfaces/producto-trocado';

@Injectable({
  providedIn: 'root'
})
export class ProductoTrocadoService {

  constructor(private http: HttpClient){}

  private url = 'http://localhost:8080/productoTrocado';
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  private nom = '/find/';
  private user='/user/';
  private duenio='/duenio/';
  
  postAcuerdo(productoTrocado:ProductoTrocado) {
    return this.http.post(`${this.url}`,productoTrocado,this.httpOptions)
  }
  putUser(token,productoTrocado:ProductoTrocado):Observable<number>{
    return this.http.put<number>(this.url+this.user+token,productoTrocado,this.httpOptions)
  }
  putDuenio(token,productoTrocado:ProductoTrocado):Observable<number>{
    return this.http.put<number>(this.url+this.duenio+token,productoTrocado,this.httpOptions)
  }

  getAcuerdo(token):Observable<ProductoTrocado>{
    return this.http.get<ProductoTrocado>(this.url+this.nom+token)
  }
  EnvioEmails(correo,token):Observable<number> {
    return this.http.get<number>(this.url+"/envio/"+correo+"/"+token)
  }

}
