import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { ReportesService } from 'src/app/services/reportes.service';
import { Reportes } from 'src/app/interfaces/reportes';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  constructor(private usuarioService: UsuarioService,private reporteService:ReportesService,public datePipe:DatePipe) { }


  ngOnInit(): void {
    this.inicio()
    
  }
  id_u:number;
  idProducto;
  idComentario;
  telefono:number;
  correo:string;
  nombre:string;
  nomUsuario:string;
  tipo:string;
  comentario:string;
  show1:boolean;
  show2:boolean;
  UserL:Usuario[]=[];
  user:Usuario;
  obs;
  selected:String;

  inicio(){

    this.usuarioService.getNomUser(localStorage.getItem("nomUser")).subscribe(
      res => this.UserL = res
    )
    if(localStorage.getItem("coment").length > 0 ){
      this.show1=true;
      this.show2=true;
    }else if(localStorage.getItem("coment").length == 0 || localStorage.getItem("a").length == 0){
      this.show1=true;
      this.show2=false;
    }else if(localStorage.getItem("a").length > 0){
      this.show1=false;
      this.show2=false;
      localStorage.setItem("idP","");
      localStorage.setItem("coment","");
    }

    setTimeout(()=> {
    this.user = JSON.parse(JSON.stringify(this.UserL))
   this.nombre = this.user.nombre;
   this.nomUsuario = this.user.nomusuario;
   this.correo = this.user.correo;
   this.telefono = this.user.fono;
   this.id_u= this.user.idU;
   this.idProducto = localStorage.getItem("idP")
   this.idComentario = localStorage.getItem("coment")
   console.log(this.idComentario)
    },4500)
  }
  enviar(){
    let report:Reportes = {
      "id_usuario":this.id_u,
      "fecha":this.datePipe.transform(Date.now(),'yyyy-MM-dd'),
      "comentario" : "Id del comentario : "+this.idComentario+" Id del Producto : "+this.idProducto+" Comentario : "+this.comentario,
      "correo" : this.correo,
      "nombre" : this.nomUsuario,
      "tipo" : this.selected
    }
    console.log(report)
    this.reporteService.nuevoReport(report).subscribe(
      res => this.obs = res
    )
    setTimeout(() => {
      alert("Se ha reportado correctamente se le enviara un aviso, segun el informe entregado")
      window.location.href="/#"
    }, 3000);
  }

}
