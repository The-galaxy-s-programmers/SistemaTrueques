import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto} from 'src/app/interfaces/producto'

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }

  private url = 'http://localhost:8080/producto';
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  private nomusuario = '/find/';
  private exist='/mail/';
  private categoria = 'categoria/';

  
  getListaProducto(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url)
  }

  getNomProducto(nomUsuario): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url + this.nomusuario + nomUsuario)
  }
  getIdProducto(id): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url + this.nomusuario + id)
  }
  
  deleteProducto(id): Observable<Producto[]> {
    return this.http.delete<Producto[]>(this.url+"/"+id)
  }

  postProducto(producto:Producto) {
    return this.http.post(`${this.url}`,producto,this.httpOptions)
  }

  putProducto(id,producto:Producto): Observable<number>{
    return this.http.put<number>(this.url+"/"+id,producto,this.httpOptions)
  }
  getListaProductoCategoria(categoria): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url+this.nomusuario+this.categoria+categoria)
  }
  getTopProducto(categoria): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url + this.nomusuario +'top/'+ categoria)
  }

}
