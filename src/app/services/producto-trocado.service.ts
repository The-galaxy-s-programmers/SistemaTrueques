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
  putUser(idP,idU,idD,productoTrocado:ProductoTrocado):Observable<number>{
    return this.http.put<number>(this.url+this.user+"/"+idP+"/"+idU+"/"+idD,productoTrocado,this.httpOptions)
  }
  putDuenio(idP,idU,idD,productoTrocado:ProductoTrocado):Observable<number>{
    return this.http.put<number>(this.url+this.duenio+"/"+idP+"/"+idU+"/"+idD,productoTrocado,this.httpOptions)
  }

  getAcuerdo(token):Observable<ProductoTrocado>{
    return this.http.get<ProductoTrocado>(this.url+this.nom+token)
  }

}
