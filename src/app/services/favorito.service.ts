import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Favorito } from '../interfaces/favorito';
import { FavoritoIdProducto } from '../interfaces/favorito-id-producto';

@Injectable({
  providedIn: 'root'
})
export class FavoritoService {
  
  constructor(private http: HttpClient) {

  }
  private url = 'http://localhost:8080/favorito';
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  private nomusuario = '/find/';
  private exist='/mail/';
  private existe='/user/';

  
  getListaFavUser(id): Observable<FavoritoIdProducto[]> {
    return this.http.get<FavoritoIdProducto[]>(this.url+'/'+id)
  }
  deleteFav(id_u,id_p):Observable<Favorito[]>{
    return this.http.delete<Favorito[]>(this.url+'/'+id_u+'/'+id_p)
  }
  postFav(favorito:Favorito) {
    return this.http.post(`${this.url}`,favorito,this.httpOptions)
  }
  getCount(id): Observable<number> {
    return this.http.get<number>(this.url+this.nomusuario+id)
  }
  getexistFav(id_u,id_p):Observable<boolean> {
    return this.http.get<boolean>(this.url+this.nomusuario+id_u+'/'+id_p)
  }

}
