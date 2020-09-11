import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(private usuarioService:UsuarioService,public datepipe: DatePipe){}

  ngOnInit(): void {
  this.buscar();
  }

  myUser:Usuario[]=[];
  usuarioLog:Usuario;

  nombre:string;
  fechanac:String;

buscar(){
  this.usuarioService.getNomUser("Bvsty").subscribe(
    res =>{
      this.myUser=res;
      this.usuarioLog=JSON.parse(JSON.stringify(res))
      this.nombre=this.usuarioLog.nombre+" "+this.usuarioLog.apellido
      this.fechanac=this.datepipe.transform(this.usuarioLog.fechaNacimiento, 'dd-MM-yyyy');
    
    }, 
    err=>{console.log(err)}
  )
  
}

}
