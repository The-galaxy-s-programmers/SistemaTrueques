import { Component, OnInit } from '@angular/core';
import { Producto } from "src/app/interfaces/producto";
import { ProductoService } from "src/app/services/producto.service"
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { defaultThrottleConfig } from 'rxjs/internal-compatibility';
import { DatePipe } from '@angular/common';
import { Chat } from 'src/app/interfaces/chat';
import { ChatService} from 'src/app/services/chat.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService} from 'src/app/services/usuario.service';

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



  postsCol: AngularFirestoreCollection<Post>;
  posts: any;

  postDoc: AngularFirestoreDocument<Post>;
  post: Observable<Post>;
  datepipe: any;

  constructor(private afs: AngularFirestore,private usuarioService:UsuarioService, private productoService: ProductoService,public datePipe:DatePipe, private chatService:ChatService) { }

  ngOnInit(): void {
    this.postsCol = this.afs.collection('posts'/*, ref => ref.where('title', '==', 'coursetro')*/);
    this.posts = this.postsCol.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Post;
          const id = a.payload.doc.id;
          return { id, data };
        });
      });
    this.buscar();
    this.inicio();
  }

  title: string;
  content: string;
  producto: Producto[];


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
  
  mensaje=false;
  bnregistro=true;

  top4:Producto[]=[];
  chat:Chat[]=[];

  addPost() {
    this.afs.collection('posts').add({ 'title': this.title, 'content': this.content });
    // this.afs.collection('posts').doc('my-custom-id').set({'title': this.title, 'content': this.content});
  }
  getPost(postId) {
    this.postDoc = this.afs.doc('posts/' + postId);
    this.post = this.postDoc.valueChanges();
  }
  deletePost(postId) {
    this.afs.doc('posts/' + postId).delete();
  }

  refrescar(){
     
    this.chatService.getListaMensajeId(localStorage.getItem("idP")).subscribe(
      res => this.chat = res
    )

  }

  inicio(){
    console.log(localStorage.getItem("nomUser"))
    
    if( localStorage.getItem("nomUser") == null || localStorage.getItem("password") == null || localStorage.getItem("nomUser").length <= 2 ){
      console.log("hola")
      this.bnregistro=true;
      this.mensaje=false;
    }else{
      console.log("adios")
      this.bnregistro=false;
      this.mensaje=true;
    }
    console.log(this.idP)

    this.chatService.getListaMensajeId(localStorage.getItem("idP")).subscribe(
      res => this.chat = res
    )

  }
  buscar() {
    let a = localStorage.getItem("idP")
    this.productoService.getIdProducto(a).subscribe(
      res => {
        this.producto = res
      }, err => console.log(err)
    )
    setTimeout(()=>{
   const obj = JSON.parse(JSON.stringify(this.producto))
      this.nombre=obj.nombre;
      this.descripcion=obj.descripcion;
      this.categoria=obj.categoria;
      this.fechaPublicacion=obj.fechaPublicacion;
      this.imagen=obj.imagen;
      this.ubicacion=obj.ubicacion;
      this.subcategoria=obj.subcategoria;
      this.uso=obj.uso;
      this.fechastring=this.datePipe.transform(this.fechaPublicacion, 'dd-MM-yyyy');
      this.productoService.getTop4CategoriaProducto(this.categoria).subscribe(
        res => this.top4 = res
      )
    },3000)
   
   

  }
  select(id){
    console.log(id);
    localStorage.setItem("idP",id)
    window.location.href="/Producto";
  }

  
  Responder() {

    if (this.click == 0) { this.show = false; this.click = 1; }
    else if (this.click == 1) { this.show = true; this.click = 0; this.resp = this.respuesta }

  }
  Enviar() {
    this.correo; //Hay que enviar correo
  }
  responderM(id){

  }

}
