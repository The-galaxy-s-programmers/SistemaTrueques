import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DatePipe]
})
export class AppComponent {


  title = 'Sistema-Trueques';
  myFecha= new Date();
  Fecha:string;
 


  constructor(private datePipe: DatePipe,) {
    this.Fecha = this.datePipe.transform(this.myFecha, 'yyyy');

   }

 
  ngOnInit(): void {
   this.setea()
  }
  cuenta:string;
  buscador:string;
  nomUser:String;
  Categoria:string;
  
  setea(){
    this.nomUser = localStorage.getItem("nomUser");
  }
  ir(){
    let a = localStorage.getItem("nomUser");
    let b = localStorage.getItem("password");
    if(a.length == 0 || b.length == 0 ){
      window.location.href="/RegistroUsuario";

    }else{
      window.location.href="/Perfil";
    }
  }
  cerrar(){
    localStorage.setItem("nomUser","")
    localStorage.setItem("password","")
  }
  busqueda(){
    localStorage.setItem("bsc",this.buscador)
    localStorage.setItem("categoria","")
    window.location.href="/MenuProductos"
  }
  
}
