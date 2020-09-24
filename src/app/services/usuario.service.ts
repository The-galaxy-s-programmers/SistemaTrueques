import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) {

  }
  private url = 'http://localhost:8080/usuario';
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  private nomusuario = '/find/';
  private exist='/mail/';
  private existe='/user/';

  
  getListaUser(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.url)
  }

  getIfExistUser(correo:String): Observable<boolean> {
    return this.http.get<boolean>(this.url + this.exist + correo)
  }

  getNomUser(nomUsuario:String): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.url + this.nomusuario + nomUsuario)
  }

  getIdUser(id): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.url + this.nomusuario +'id/'+ id)
  }

  deleteUsuario(id): Observable<Usuario[]> {
    return this.http.delete<Usuario[]>(this.url+"/"+id)
  }

  postUser(usuario:Usuario) {
    return this.http.post(`${this.url}`,usuario,this.httpOptions)
  }

  putUser(id,usuario:Usuario): Observable<number>{
    return this.http.put<number>(this.url+"/"+id,usuario,this.httpOptions)
  }

  getIfExisteUser(nomusuario:String): Observable<boolean> {
    return this.http.get<boolean>(this.url + this.existe + nomusuario)
  }

}
