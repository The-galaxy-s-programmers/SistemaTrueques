import { Component, OnInit } from '@angular/core';
import { Suscripcion } from 'src/app/interfaces/suscripcion';
import { SuscripcionService } from 'src/app/services/suscripcion.service';

@Component({
  selector: 'app-unsuscribe',
  templateUrl: './unsuscribe.component.html',
  styleUrls: ['./unsuscribe.component.css']
})
export class UnsuscribeComponent implements OnInit {

  constructor(private suscripcionService:SuscripcionService) { }

  ngOnInit(): void {
  }
  correo:string;

  sub:Suscripcion;
  show=false;

borrar(){
    this.suscripcionService.deleteSubs(this.correo).subscribe (res =>{},err => {alert("Porfavor verifique sus datos")})
    setTimeout(()=>{
      alert(" Se ha eliminado su suscripcion ")
      window.location.href="/#";
      this.show=true;
    },3000)
  }
}

