import { Component, OnInit } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import 'rxjs/Rx';


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
  
  constructor(private afs: AngularFirestore) { }

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
    
  }

  title:string;
  content:string;

  addPost() {
    this.afs.collection('posts').add({'title': this.title, 'content': this.content});
  // this.afs.collection('posts').doc('my-custom-id').set({'title': this.title, 'content': this.content});
  }
  getPost(postId) {
    this.postDoc = this.afs.doc('posts/'+postId);
    this.post = this.postDoc.valueChanges();
  }
  deletePost(postId) {
    this.afs.doc('posts/'+postId).delete();
  }




descripcion=" Mueble de cocina en excelente estado. ";
fecha="04-09-2020"
valor="Valor Aprox: $75.000";
nombre:string;
correo:string;
coment:string;
id:number;
show:boolean=true;
showComent:boolean=true;
click=0;
respuesta:string;
resp="";
Responder(){
 
  if(this.click==0){ this.show=false;this.click=1;}
  else if(this.click==1){this.show=true;this.click=0;this.resp=this.respuesta}

}
Enviar(){
  this.correo; //Hay que enviar correo
}
}
