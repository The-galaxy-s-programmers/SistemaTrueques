import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  constructor() { 

  }

  ngOnInit(): void {
  }
  fecha="04-09-2020"
descripcion="Juego de Comedor para 4 personas, poco uso, material reciclado manufactura chilena.";
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
