import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chat } from 'src/app/interfaces/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  private url = 'http://localhost:8080/chat';
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  private nomusuario = '/find/';
  private exist='/mail/';
  private categoria = 'categoria/';

  getListaMensajeId(idP): Observable<Chat[]> {
    return this.http.get<Chat[]>(this.url+'/'+idP)
  }

  postMensaje(chat:Chat) {
    return this.http.post(`${this.url}`,chat,this.httpOptions)
  }

  putMensajet(id,chat:Chat): Observable<number>{
    return this.http.put<number>(this.url+"/"+id,chat,this.httpOptions)
  }

  deleteMensaje(id): Observable<Chat[]> {
    return this.http.delete<Chat[]>(this.url+"/"+id)
  }

}
