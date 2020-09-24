import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/interfaces/usuario';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  constructor(private usuarioService: UsuarioService) { }


  ngOnInit(): void {
    this.inicio()
    
  }
 
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

  inicio(){
    this.usuarioService.getNomUser(localStorage.getItem("nomUser")).subscribe(
      res => this.UserL = res
    )
    if(localStorage.getItem("idP") == "null"){
      this.show1=false;
      this.show2=false;
    }else{
      this.idProducto=(localStorage.getItem("idP"))
      this.show1=true;
      this.show2=true;
    }
    setTimeout(()=> {
    this.user = JSON.parse(JSON.stringify(this.UserL))
   this.nombre = this.user.nombre;
   this.nomUsuario = this.user.nomusuario;
   this.correo = this.user.correo;
   this.telefono = this.user.fono;
    },2000)
  }
  enviar(){

  }

}
