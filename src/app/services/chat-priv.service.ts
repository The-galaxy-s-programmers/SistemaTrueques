import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatPriv } from '../interfaces/chat-priv';
import { ChatPrivToken } from '../interfaces/chat-priv-token';


@Injectable({
  providedIn: 'root'
})
export class ChatPrivService {

  
  constructor(private http: HttpClient) { }

  private url = 'http://localhost:8080/chatPriv';
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  getListaMensajeId(idP,idU,idD): Observable<ChatPriv[]> {
    return this.http.get<ChatPriv[]>(this.url+'/'+idP+'/'+idU+'/'+idD)
  }
  getListaMensaje(id): Observable<ChatPrivToken[]> {
    return this.http.get<ChatPrivToken[]>(this.url+'/'+id)
  }
  getListaxToken(id): Observable<ChatPriv[]> {
    return this.http.get<ChatPriv[]>(this.url+'/token/'+id)
  }
  getListaxTopToken(id): Observable<ChatPriv[]> {
    return this.http.get<ChatPriv[]>(this.url+'/idToken/'+id)
  }
  postMensaje(chat:ChatPriv) {
    return this.http.post(`${this.url}`,chat,this.httpOptions)
  }

  deleteMensaje(id): Observable<ChatPriv[]> {
    return this.http.delete<ChatPriv[]>(this.url+"/"+id)
  }
  
}
