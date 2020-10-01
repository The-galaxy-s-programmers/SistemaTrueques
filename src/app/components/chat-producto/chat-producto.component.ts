import { DatePipe } from '@angular/common';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/app/interfaces/chat';
import { ChatPriv } from 'src/app/interfaces/chat-priv';
import { Producto } from 'src/app/interfaces/producto';
import { Usuario } from 'src/app/interfaces/usuario';
import { ChatPrivService } from 'src/app/services/chat-priv.service';
import { ProductoService } from 'src/app/services/producto.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-chat-producto',
  templateUrl: './chat-producto.component.html',
  styleUrls: ['./chat-producto.component.css']
})
export class ChatProductoComponent implements OnInit {

  Ad;
  title: string;
  content: string;
  producto: Producto[];
  user: Usuario[] = [];
  userL: Usuario;
  duenio: Usuario[] = [];
  duenioL: Usuario;


  idU: number;
  fechastring: string;
  idP?: number;
  nombre: string;
  descripcion: string;
  categoria: string;
  fechaPublicacion: String;
  uso: string;
  imagen: string;
  valorReferencia: number;
  ubicacion: string;
  subcategoria: string;
  id_usuario: number;

  escrituraDM: boolean;
  correo: string;
  coment: string;
  id: number;
  show: boolean = true;
  showComent: boolean = true;
  click = 0;
  respuesta: string;
  resp = "";
  respuestaDM: boolean;
  contenta: string;
  show3: boolean;
  mensaje = false;
  bnregistro = true;
  idPu: number;
  Comentario: ChatPriv;
  chat: ChatPriv[] = [];
  exist: boolean;
  UserFav: Usuario[] = [];
  borrarMM: boolean = false;
  obj;

  constructor(private usuarioService: UsuarioService, private productoService: ProductoService, public datePipe: DatePipe, private chatPrivService: ChatPrivService) { }
  Duenio: ChatPriv[] = [];
  aa: string;
  ab: string;
  ac: string;

  ngOnInit(): void {

    this.chatPrivService.getListaxTopToken(localStorage.getItem("token")).subscribe(// chat general
      res => { this.chat = res }, err => { console.log(err) }
    )

    this.buscar();

    this.chatPrivService.getListaxToken(localStorage.getItem("token")).subscribe( // chat top 1 
      res => { this.Duenio = res }, err => { console.log(err) }
    )
  }

  addPost() {
    /* try{
        if( this.Duenio[0].id_user.toString() == undefined || this.Duenio[0].id_user.toString() == "undefined"){
          this.aa=localStorage.getItem("idU");
         this.ab=localStorage.getItem("idP");
         this.ac=localStorage.getItem("nomUser")
         console.log("1")
        }}catch(e){
          console.log(e) 
          if( e.toString().includes("Typescript")){*/
    this.aa = localStorage.getItem("idU");
    this.ab = localStorage.getItem("idP");
    this.ac = localStorage.getItem("nomUser")
    console.log("3")
    /*       }
        } */



    this.Comentario = {
      id_producto: parseInt(this.ab),
      id_user: parseInt(this.aa),
      mensaje: this.content,
      id_duenio: this.obj.id_usuario,
      nomUser: this.ac,
      nomDuenio: this.duenioL.nomusuario,
      nomProducto: this.obj.nombre,
      token: parseInt(localStorage.getItem("token")),
      mensajePor: parseInt(localStorage.getItem("idU"))
    }

    console.log(this.Comentario)

    this.chatPrivService.postMensaje(this.Comentario).subscribe(
      res => { console.log(res) }, err => console.log(err)
    )
    this.chatPrivService.getListaxTopToken(localStorage.getItem("token")).subscribe(
      res => this.chat = res
    )

    setTimeout(() => {
      this.content = "";
    }, 3000)

  }

  refrescar() {

    this.chatPrivService.getListaxTopToken(localStorage.getItem("token")).subscribe(
      res => this.chat = res
    )

  }

  buscar() {
    this.show3 = false;
    let a = localStorage.getItem("idP")
    this.productoService.getIdProducto(a).subscribe(
      res => {
        this.producto = res
      }, err => console.log(err)
    )

    setTimeout(() => {
      this.obj = JSON.parse(JSON.stringify(this.producto))

      console.log(this.obj.id_usuario, this.obj.nombre)

      this.usuarioService.getIdUser(this.obj.id_usuario).subscribe(
        res => this.duenio = res
      )
    }, 3000)

    setTimeout(() => {
      this.duenioL = JSON.parse(JSON.stringify(this.duenio))
      this.show3 = true;
      console.log(this.duenioL.nomusuario);

    }, 5000)

  }
  reportChat(id) {
    localStorage.setItem("coment", id + " " + localStorage.getItem("token"))
    localStorage.setItem("a", "")
    window.location.href = "/Report"
  }
}
