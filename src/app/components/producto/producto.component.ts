import { Component, OnInit } from '@angular/core';
import { Producto } from "src/app/interfaces/producto";
import { ProductoService } from "src/app/services/producto.service"

import 'rxjs/Rx';

import { DatePipe } from '@angular/common';
import { Chat } from 'src/app/interfaces/chat';
import { ChatService } from 'src/app/services/chat.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FavoritoService } from 'src/app/services/favorito.service';
import { Favorito } from 'src/app/interfaces/favorito';
import { stringify } from '@angular/compiler/src/util';

interface Post {
  title: string;
  content: string;
}

interface PostId extends Post {
  id: string;
}

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  constructor(private favoritoService: FavoritoService, private usuarioService: UsuarioService, private productoService: ProductoService, public datePipe: DatePipe, private chatService: ChatService) { }

  ngOnInit(): void {
    this.buscar();
    this.inicio();
    this.usuarioService.getNomUser(localStorage.getItem("nomUser")).subscribe(
      res => this.UserFav = res
    )
    setTimeout(() => {
      this.Ad = JSON.parse(JSON.stringify(this.UserFav))
    if (localStorage.getItem("nomUser") == "admin") {
      this.borrarMM = true;
    }
    }, 4500);
    

  }
  Ad;
  title: string;
  content: string;
  producto: Producto;
  user: Usuario[];
  userL: Usuario;
  duenio: Usuario[];


  idU: number;
  fechastring: string;
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
  top4: Producto[] = [];
  Comentario: Chat;
  chat: Chat[] = [];
  exist: boolean;
  UserFav: Usuario[];
  borrarMM: boolean = false;

  irRegistro() {
    window.location.href = "/RegistroUsuario"
  }

  addPost() {

    this.Comentario = {
      id_producto: parseInt(localStorage.getItem("idP")),
      id_user: this.userL.idU,
      mensaje: this.content,
      id_duenio: this.idPu,
      respuesta: "",
      nomUser: this.userL.nomusuario,
      nomDuenio: JSON.parse(JSON.stringify(this.duenio)).nomusuario,
      nomProducto: this.nombre
    }

    this.chatService.postMensaje(this.Comentario).subscribe(
      res => { console.log(res) }, err => console.log(err)
    )

    setTimeout(() => {
      this.content = "";
      this.chatService.getListaMensajeId(localStorage.getItem("idP")).subscribe(
        res => this.chat = res
      )
    }, 3500)

  }
  a: number = 1;
  favorito: Favorito[] = [];
  SHOW123: boolean = false;
  corazon() {
    this.SHOW123 = true;



    console.log(this.a)

    this.favoritoService.getexistFav(localStorage.getItem("idU"), localStorage.getItem("idP")).subscribe(
      res => this.exist = res
    )

    const fav = {
      id_usuarioF: parseInt(localStorage.getItem("idU")),
      id_producto: parseInt(localStorage.getItem("idP"))
    }
    setTimeout(() => {
      this.a++;
      console.log(this.exist)

      if (this.exist == true) {
        if (this.a == 2) {
          alert("Articulo ya en favoritos - Presione denuevo para borrar");
          this.SHOW123 = false;
        }

        else if (this.a == 3) {
          this.favoritoService.deleteFav(localStorage.getItem("idU"), localStorage.getItem("idP")).subscribe(
            res => this.favorito = res
          )
          this.a = 1;
          console.log("borrando")
          alert("Articulo borrado de favoritos");
          location.reload();
        }
      } else if (this.exist == false) {
        this.favoritoService.postFav(fav).subscribe(
          res => console.log(res)

        )
        console.log("añadiendo");
        alert("Articulo añadido a favoritos");
        location.reload();
      }
    }, 4500)
  }

  reportChat(id) {
    localStorage.setItem("coment", id)
    localStorage.setItem("a", "")
    window.location.href = "/Report"
  }
  SHOW1=false;
  reportProducto() {
    this.SHOW1 = true;
    setTimeout(() => {
      if (localStorage.getItem("nomUser") ==JSON.parse(JSON.stringify(this.duenio)).nomusuario) {
        alert("Usted es dueño de este producto");
        this.SHOW1=false;
      } else {
        window.location.href = "/Chat";
        localStorage.setItem("coment", "")
        localStorage.setItem("a", "")
        window.location.href = "/Report"
      }
    },3500)
   

  }
  refrescar() {

    this.chatService.getListaMensajeId(localStorage.getItem("idP")).subscribe(
      res => this.chat = res
    )

  }

  inicio() {

    if (localStorage.getItem("nomUser") == null || localStorage.getItem("password") == null || localStorage.getItem("nomUser").length <= 2) {

      this.bnregistro = true;
      this.mensaje = false;
    } else {

      this.bnregistro = false;
      this.mensaje = true;
    }

    this.chatService.getListaMensajeId(localStorage.getItem("idP")).subscribe(
      res => this.chat = res
    )

  }
  id_producto;
  deletethis=false;
  buscar() {

    this.show3 = false;
    this.productoService.getIdProducto(localStorage.getItem("idP")).subscribe(
      res => { this.producto = res }, err => {console.log(err)}
    )
    this.usuarioService.getNomUser(localStorage.getItem("nomUser")).subscribe(
      res => this.user = res
    )
    setTimeout(() => {
      const obj = this.producto;
      console.log(this.producto)
      this.id_producto = obj.idP;
      this.nombre = obj.nombre;
      this.descripcion = obj.descripcion;
      this.categoria = obj.categoria;
      this.fechaPublicacion = obj.fechaPublicacion;
      this.imagen = obj.imagen;
      this.idPu = obj.id_usuario;
      this.ubicacion = obj.ubicacion;
      this.subcategoria = obj.subcategoria;
      this.uso = obj.uso;
      this.fechastring = this.datePipe.transform(this.fechaPublicacion, 'dd-MM-yyyy');
      this.userL = JSON.parse(JSON.stringify(this.user))
      this.idU = this.userL.idU;
      console.log(this.idPu)
      this.usuarioService.getIdUser(this.idPu).subscribe(
        res => this.duenio = res
      )
        setTimeout(() => {
          const a = JSON.parse(JSON.stringify(this.duenio))
          this.show3 = true;
          localStorage.setItem("idD",stringify(a.idU))
          if (localStorage.getItem("nomUser") == a.nomusuario) {
            this.respuestaDM = true;
          }
          
          if(a.nomusuario == "undefined" || a.nomusuario == undefined){ this.buscar(); }
          if (localStorage.getItem("nomUser") == a.nomusuario) {
            this.deletethis=true;
          } 
        }, 3000);

      this.productoService.getTop4CategoriaProducto(this.categoria).subscribe(
        res => this.top4 = res
      )
     
    },4000)

   

  }
  select(id) {
    console.log(id);
    localStorage.setItem("idP", id)
    window.location.href = "/Producto";
  }


  Responder() {

    if (this.click == 0) {
      this.show = false; this.click = 1;
    }
    else if (this.click == 1) {
      this.show = true; this.click = 0; this.resp = this.respuesta
    }

  }


  responderM(id) {

  }
  borrarMensaje(id) {

  }
  SHOW12 = false;

  Trocar() {
    this.SHOW12 = true;
    setTimeout(() => {
      if (localStorage.getItem("nomUser") == JSON.parse(JSON.stringify(this.duenio)).nomusuario) {
        alert("Usted es dueño de este producto");
        this.SHOW12=false;
      } else {
        localStorage.setItem("token",localStorage.getItem("idU")+stringify(this.idPu)+localStorage.getItem("idP"))
        localStorage.setItem("idD",stringify(this.idPu))
        window.location.href = "/Chat";
      }
    }, 3500)
  }
delete(){
  this.productoService.deleteProducto(localStorage.getItem("idP")).subscribe(
    res=> console.log(res)
  )
  window.location.href="/Perfil"
  localStorage.setItem("idP","")
}

bsc(a){
  localStorage.setItem("bsc",a)
  window.location.href= "/MenuProductos"
}


}


