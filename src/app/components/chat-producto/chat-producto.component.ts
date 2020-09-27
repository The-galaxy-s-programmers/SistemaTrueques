import { DatePipe } from '@angular/common';
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

  ngOnInit(): void {
    this.buscar();
    setTimeout(()=>{
    this.chatPrivService.getListaMensajeId(localStorage.getItem("idP"),localStorage.getItem("idU"),this.idPu).subscribe(
      res => this.chat = res
    )
  },3000)
  }
  addPost() {

    this.Comentario={
      id_producto:parseInt(localStorage.getItem("idP")),
       id_user:this.userL.idU,
       mensaje:this.content,
       id_duenio:this.idPu,
       nomUser:this.userL.nomusuario,
       nomDuenio:this.duenioL.nomusuario,
       nomProducto:this.nombre
    }

   this.chatPrivService.postMensaje(this.Comentario).subscribe(
     res=> {console.log(res)},err => console.log(err)
   )
   
  setTimeout(()=>{
    this.content="";
    this.chatPrivService.getListaMensajeId(localStorage.getItem("idP"),localStorage.getItem("idU"),this.idPu).subscribe(
      res => this.chat = res
    )
   },2000)

  }

  refrescar(){
     
    this.chatPrivService.getListaMensajeId(localStorage.getItem("idP"),localStorage.getItem("idU"),this.idPu).subscribe(
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
      
      
     
    },3000)
   
    setTimeout(()=>{
      this.duenioL = JSON.parse(JSON.stringify(this.duenio))
      this.show3=true;
      if(localStorage.getItem("nomUser")==this.duenioL.nomusuario){
       this.respuestaDM=true;
      }
     
    },5000)

  }
}
