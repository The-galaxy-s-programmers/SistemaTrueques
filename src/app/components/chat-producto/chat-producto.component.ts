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
  user:Usuario[]=[];
  userL:Usuario;
  duenio:Usuario[]=[];
  duenioL:Usuario;


  idU:number;
  fechastring:string;
  idP ?:number;
  nombre:string;
  descripcion:string;
  categoria:string;
  fechaPublicacion:String;
  uso:string;
  imagen:string;
  valorReferencia:number;
  ubicacion:string;
  subcategoria:string;
  id_usuario:number;
  
  escrituraDM:boolean;
  correo: string;
  coment: string;
  id: number;
  show: boolean = true;
  showComent: boolean = true;
  click = 0;
  respuesta: string;
  resp = "";
  respuestaDM:boolean;
  contenta:string;
  show3:boolean;
  mensaje=false;
  bnregistro=true;
  idPu:number;
  Comentario:ChatPriv;
  chat:ChatPriv[]=[];
  exist:boolean;
  UserFav:Usuario[]=[];
  borrarMM:boolean=false;

  constructor(private usuarioService:UsuarioService, private productoService: ProductoService,public datePipe:DatePipe, private chatPrivService:ChatPrivService) { }
Duenio:ChatPriv[]=[];
ab;
  ngOnInit(): void {
      
    this.chatPrivService.getListaxTopToken(localStorage.getItem("token")).subscribe(
      res => this.chat = res
    )
    this.buscar();
    this.chatPrivService.getListaxToken(localStorage.getItem("token")).subscribe(
      res=> this.Duenio = res
    )
    setTimeout(()=>{
    if(localStorage.getItem("idU")==JSON.parse(JSON.stringify(this.Duenio)).id_duenio){
      localStorage.setItem("idP",JSON.parse(JSON.stringify(this.Duenio)).id_producto)
      this.ab=JSON.parse(JSON.stringify(this.Duenio)).id_user
    this.chatPrivService.getListaxTopToken(localStorage.getItem("token")).subscribe(
      res => this.chat = res
    )}else{
      this.ab=localStorage.getItem("idU");
    }
  },4000)
  }

  addPost() {

    this.Comentario={
      id_producto:parseInt(localStorage.getItem("idP")),
       id_user:JSON.parse(JSON.stringify(this.Duenio)).id_user,
       mensaje:this.content,
       id_duenio:JSON.parse(JSON.stringify(this.Duenio)).id_user,
       nomUser:localStorage.getItem("nomUser"),
       nomDuenio:JSON.parse(JSON.stringify(this.Duenio)).nomDuenio,
       nomProducto:JSON.parse(JSON.stringify(this.Duenio)).nomProducto,
       token:parseInt(localStorage.getItem("token")),
       mensajePor:parseInt(localStorage.getItem("idU"))
    }

   this.chatPrivService.postMensaje(this.Comentario).subscribe(
     res=> {console.log(res)},err => console.log(err)
   )
   this.chatPrivService.getListaxTopToken(localStorage.getItem("token")).subscribe(
    res => this.chat = res
  )

  setTimeout(()=>{
    this.content="";
   },2000)

  }

  refrescar(){
     
    this.chatPrivService.getListaxTopToken(localStorage.getItem("token")).subscribe(
      res => this.chat = res
    )

  }

  buscar() {
    this.show3=false;
    let a = localStorage.getItem("idP")
    this.productoService.getIdProducto(a).subscribe(
      res => {
        this.producto = res
      }, err => console.log(err)
    )
    this.usuarioService.getNomUser(localStorage.getItem("nomUser")).subscribe(
      res=> this.user = res
    )
    
    setTimeout(()=>{
   const obj = JSON.parse(JSON.stringify(this.producto))
      this.nombre=obj.nombre;
      this.descripcion=obj.descripcion;
      this.categoria=obj.categoria;
      this.fechaPublicacion=obj.fechaPublicacion;
      this.imagen=obj.imagen;
      this.idPu=obj.id_usuario;
      this.ubicacion=obj.ubicacion;
      this.subcategoria=obj.subcategoria;
      this.uso=obj.uso;
      this.fechastring=this.datePipe.transform(this.fechaPublicacion, 'dd-MM-yyyy');
      this.userL = JSON.parse(JSON.stringify(this.user))
      this.idU=this.userL.idU;
      console.log(obj.id_usuario)
      this.usuarioService.getIdUser(this.idPu).subscribe(
        res=> this.duenio = res
      )
      
      
     
    },4000)
   
    setTimeout(()=>{
      this.duenioL = JSON.parse(JSON.stringify(this.duenio))
      this.show3=true;
      if(localStorage.getItem("nomUser")==this.duenioL.nomusuario){
       this.respuestaDM=true;
      }
     
    },5000)

  }
  reportChat(id) {
    localStorage.setItem("coment", id +" "+ localStorage.getItem("token") )
    localStorage.setItem("a", "")
    window.location.href = "/Report"
  }
}
