import { Component, OnInit } from '@angular/core';
import { Producto } from "src/app/interfaces/producto";
import { ProductoService } from "src/app/services/producto.service"
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { defaultThrottleConfig } from 'rxjs/internal-compatibility';
import { DatePipe, getLocaleDateFormat } from '@angular/common';
import { Chat } from 'src/app/interfaces/chat';
import { ChatService } from 'src/app/services/chat.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { storage } from 'firebase';
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

  constructor(private favoritoService: FavoritoService, private afs: AngularFirestore, private usuarioService: UsuarioService, private productoService: ProductoService, public datePipe: DatePipe, private chatService: ChatService) { }

  ngOnInit(): void {
    this.buscar();
    this.inicio();
    this.usuarioService.getNomUser(localStorage.getItem("nomUser")).subscribe(
      res => this.UserFav = res
    )
    this.Ad = JSON.parse(JSON.stringify(this.UserFav))
    if (localStorage.getItem("nomUser") == "admin") {
      this.borrarMM = true;
    }

  }
  Ad;
  title: string;
  content: string;
  producto: Producto;
  user: Usuario[] = [];
  userL: Usuario;
  duenio: Usuario;
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
  top4: Producto[] = [];
  Comentario: Chat;
  chat: Chat[] = [];
  exist: boolean;
  UserFav: Usuario[] = [];
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
      nomDuenio: this.duenioL.nomusuario,
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
    }, 2000)

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
    }, 3000)
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
      if (localStorage.getItem("nomUser") == this.duenioL.nomusuario) {
        alert("Usted es dueño de este producto");
        this.SHOW1=false;
      } else {
        window.location.href = "/Chat";
        localStorage.setItem("coment", "")
        localStorage.setItem("a", "")
        window.location.href = "/Report"
      }
    }, 2000)
   

  }
  refrescar() {

    this.chatService.getListaMensajeId(localStorage.getItem("idP")).subscribe(
      res => this.chat = res
    )

  }

  inicio() {
    console.log(localStorage.getItem("nomUser"))

    if (localStorage.getItem("nomUser") == null || localStorage.getItem("password") == null || localStorage.getItem("nomUser").length <= 2) {
      console.log("hola")
      this.bnregistro = true;
      this.mensaje = false;
    } else {
      console.log("adios")
      this.bnregistro = false;
      this.mensaje = true;
    }
    console.log(this.idP)

    this.chatService.getListaMensajeId(localStorage.getItem("idP")).subscribe(
      res => this.chat = res
    )

  }
  id_producto;
  deletethis=false;
  buscar() {

   
    this.show3 = false;
    let a = localStorage.getItem("idP")
    this.productoService.getIdProducto(a).subscribe(
      res => {
        this.producto = res
      }, err => console.log(err)
    )
    this.usuarioService.getNomUser(localStorage.getItem("nomUser")).subscribe(
      res => this.user = res
    )

    setTimeout(() => {
      const obj = JSON.parse(JSON.stringify(this.producto))
      this.id_producto = obj.id;
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
      this.usuarioService.getIdUser(this.idPu).subscribe(
        res => this.duenio = res
      )


      this.productoService.getTop4CategoriaProducto(this.categoria).subscribe(
        res => this.top4 = res
      )
    }, 3000)

    setTimeout(() => {
      
      this.show3 = true;
      localStorage.setItem("idD",stringify(this.duenio.idU))
      if (localStorage.getItem("nomUser") == this.duenio.nomusuario) {
        this.respuestaDM = true;
      }
      console.log(this.duenio.nomusuario);
      if(this.duenio.nomusuario == "undefined" || this.duenio.nomusuario == undefined){ this.buscar(); }
      if (localStorage.getItem("nomUser") == this.duenio.nomusuario) {
        this.deletethis=true;
      } 
    }, 6000)

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
      if (localStorage.getItem("nomUser") == this.duenioL.nomusuario) {
        alert("Usted es dueño de este producto");
        this.SHOW12=false;
      } else {
        localStorage.setItem("token",localStorage.getItem("idU")+stringify(this.idPu)+localStorage.getItem("idP"))
        localStorage.setItem("idD",stringify(this.idPu))
        window.location.href = "/Chat";
      }
    }, 2000)
  }
delete(){
  this.productoService.deleteProducto(localStorage.getItem("idP")).subscribe(
    res=> console.log(res)
  )
  window.location.href="/Perfil"
  localStorage.setItem("idP","")
}

}


