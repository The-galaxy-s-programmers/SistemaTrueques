import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatPriv } from '../interfaces/chat-priv';

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

  postMensaje(chat:ChatPriv) {
    return this.http.post(`${this.url}`,chat,this.httpOptions)
  }

  deleteMensaje(id): Observable<ChatPriv[]> {
    return this.http.delete<ChatPriv[]>(this.url+"/"+id)
  }
  
}
