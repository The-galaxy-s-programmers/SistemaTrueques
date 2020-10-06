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
import { ProductoTrocado } from 'src/app/interfaces/producto-trocado';
import { ProductoTrocadoService } from 'src/app/services/producto-trocado.service';
import { compilePipeFromMetadata } from '@angular/compiler';

@Component({
  selector: 'app-chat-producto',
  templateUrl: './chat-producto.component.html',
  styleUrls: ['./chat-producto.component.css']
})

export class ChatProductoComponent implements OnInit {


  constructor(private productoTrocadoService: ProductoTrocadoService, private usuarioService: UsuarioService, private productoService: ProductoService, public datePipe: DatePipe, private chatPrivService: ChatPrivService) { }

  TopParaRevision: ChatPriv[] = [];
  Option: boolean;
  token;
  acuerdo: ProductoTrocado;
  acuerdOption: boolean;
  ngOnInit(): void {
    this.token = localStorage.getItem("token");
    this.chatPrivService.getListaTOP1(localStorage.getItem("token")).subscribe(
      res => this.TopParaRevision = res
    )
    this.productoService.getIdProducto(localStorage.getItem("idP")).subscribe(res => { this.producto = res }, err =>
      err
    )

    this.productoTrocadoService.getAcuerdo(localStorage.getItem("token")).subscribe(res => { this.acuerdo = res }, err => this.acuerdOption = false)

    setTimeout(() => {



      if (this.TopParaRevision[0] == undefined || this.TopParaRevision[0].mensaje == "undefined") {
        console.log("false");
        this.Option = false;

        console.log(this.producto.id_usuario);
        this.info = "Producto = " + this.producto.nombre;
        this.show3 = true;

      }
      else if (this.TopParaRevision[0].mensaje != "undefined" || this.TopParaRevision[0].mensaje != undefined) {
        console.log("true");
        this.Option = true;
        this.chatPrivService.getListaChatCompleto(parseInt(localStorage.getItem("token"))).subscribe(res => this.ChatInHtml = res)
        setTimeout(() => {
          this.info = "Producto = " + this.ChatInHtml[0].nomProducto;
          this.show3 = true;
        }, 4500)
      }
      console.log(this.acuerdOption)
      if(this.acuerdOption==false){

      }else{
      if (this.acuerdo.token != undefined || this.acuerdo.fecha != "undefined") {
        this.acuerdOption = true;

      }
    }

    }, 4500)
  }

  info;
  ChatInHtml: ChatPriv[] = [];
  chat: ChatPriv;
  content: string;
  show3: boolean = false;
  producto: Producto;
  usuarioD: Usuario[];
  acuerdoOf: ProductoTrocado;

  addPost() {
    if (this.content.length <= 1) { alert("Porfavor escriba mas de 1 caracter") }
    else {
      if (this.Option == false) {
        this.usuarioService.getIdUser(this.producto.id_usuario).subscribe(res => { this.usuarioD = res }, err => err)

        setTimeout(() => {
          this.chat = {
            id_producto: parseInt(localStorage.getItem("idP")),
            id_user: parseInt(localStorage.getItem("idU")),
            mensaje: this.content,
            id_duenio: this.producto.id_usuario,
            nomUser: localStorage.getItem("nomUser"),
            nomDuenio: JSON.parse(JSON.stringify(this.usuarioD)).nomusuario,
            nomProducto: this.producto.nombre,
            token: parseInt(localStorage.getItem("token")),
            mensajePor: parseInt(localStorage.getItem("idU"))
          }
          this.chatPrivService.postMensaje(this.chat).subscribe(res => console.log(res))
          this.refrescar();
        }, 4000)

      } else if (this.Option == true) {
        if (parseInt(localStorage.getItem("idU")) == this.TopParaRevision[0].id_duenio) {

          setTimeout(() => {
            this.chat = {
              id_producto: this.TopParaRevision[0].id_producto,
              id_user: this.TopParaRevision[0].id_user,
              mensaje: this.content,
              id_duenio: this.TopParaRevision[0].id_duenio,
              nomUser: this.TopParaRevision[0].nomDuenio,
              nomDuenio: this.TopParaRevision[0].nomDuenio,
              nomProducto: this.TopParaRevision[0].nomProducto,
              token: parseInt(localStorage.getItem("token")),
              mensajePor: parseInt(localStorage.getItem("idU"))
            }
            this.chatPrivService.postMensaje(this.chat).subscribe(res => console.log(res))
          }, 4000)


        } else {

          setTimeout(() => {
            this.chat = {
              id_producto: this.TopParaRevision[0].id_producto,
              id_user: this.TopParaRevision[0].id_user,
              mensaje: this.content,
              id_duenio: this.TopParaRevision[0].id_duenio,
              nomUser: this.TopParaRevision[0].nomUser,
              nomDuenio: this.TopParaRevision[0].nomDuenio,
              nomProducto: this.TopParaRevision[0].nomProducto,
              token: parseInt(localStorage.getItem("token")),
              mensajePor: parseInt(localStorage.getItem("idU"))
            }
            this.chatPrivService.postMensaje(this.chat).subscribe(res => console.log(res))
            setTimeout(() => {
              this.content = "";
              this.refrescar();
            }, 1000);

          }, 4000)

        }


      }
    }
  }
  refrescar() {
    this.chatPrivService.getListaChatCompleto(localStorage.getItem("token")).subscribe(res => this.ChatInHtml = res)

  }
acuerdoPro:ProductoTrocado;
  aceptar() {
    if (this.acuerdOption == false) {
      if (this.TopParaRevision[0].id_duenio == parseInt(localStorage.getItem("idU"))) {
        this.acuerdoOf = {
          AceptaUser: null,
          AceptaDueño: true,
          id_user: this.TopParaRevision[0].id_user,
          id_duenio: this.TopParaRevision[0].id_duenio,
          id_producto: this.TopParaRevision[0].id_producto,
          token: parseInt(localStorage.getItem("token"))
        }

        this.productoTrocadoService.postAcuerdo(this.acuerdoOf).subscribe(res=>console.log(res))
      }
      else if (this.TopParaRevision[0].id_duenio != parseInt(localStorage.getItem("idU"))) {
        this.acuerdoOf = {
          AceptaUser: true,
          AceptaDueño: null,
          id_user: this.TopParaRevision[0].id_user,
          id_duenio: this.TopParaRevision[0].id_duenio,
          id_producto: this.TopParaRevision[0].id_producto,
          token: parseInt(localStorage.getItem("token"))
        }

        this.productoTrocadoService.postAcuerdo(this.acuerdoOf)
      }
    } else if (this.acuerdOption == true) {

      this.productoTrocadoService.getAcuerdo(localStorage.getItem("token")).subscribe(res=>{this.acuerdoPro = res})

      if (this.TopParaRevision[0].id_duenio == parseInt(localStorage.getItem("idU")) && this.acuerdoPro.AceptaUser==true) {
        this.acuerdoOf = {
          AceptaUser: true,
          AceptaDueño: true,
          id_user: this.TopParaRevision[0].id_user,
          id_duenio: this.TopParaRevision[0].id_duenio,
          id_producto: this.TopParaRevision[0].id_producto,
          token: parseInt(localStorage.getItem("token"))
        }

        this.productoTrocadoService.putDuenio(this.acuerdoOf.token,this.acuerdoOf).subscribe(res=>console.log(res))

      }else if (this.TopParaRevision[0].id_duenio != parseInt(localStorage.getItem("idU")) && this.acuerdoPro.AceptaDueño==true) {
        this.acuerdoOf = {
          AceptaUser: true,
          AceptaDueño: true,
          id_user: this.TopParaRevision[0].id_user,
          id_duenio: this.TopParaRevision[0].id_duenio,
          id_producto: this.TopParaRevision[0].id_producto,
          token: parseInt(localStorage.getItem("token"))
        }

        this.productoTrocadoService.putDuenio(this.acuerdoOf.token,this.acuerdoOf).subscribe(res=>console.log(res))

      }

    }

  }

  reportChat(id) {
    localStorage.setItem("coment", id + " " + localStorage.getItem("token"))
    localStorage.setItem("a", "")
    window.location.href = "/Report"
  }
}
