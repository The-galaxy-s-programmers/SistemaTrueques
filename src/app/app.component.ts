import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ThrowStmt } from '@angular/compiler';
import { Usuario } from './interfaces/usuario';
import { UsuarioService } from './services/usuario.service';
import { Favorito } from './interfaces/favorito';
import { FavoritoService } from './services/favorito.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DatePipe]
})
export class AppComponent {


  title = 'Sistema-Trueques';
  myFecha = new Date();
  Fecha: string;



  constructor(private datePipe: DatePipe, public usuarioServices:UsuarioService, public favoritoServices:FavoritoService) {
  }


  ngOnInit(): void {
    this.setea()
    this.Fecha = this.datePipe.transform(this.myFecha, 'yyyy');
  }

  cuenta: string;
  buscador: string;
  nomUser: String;
  Categoria: string;
  countFav:number;
  user:Usuario[]=[];
  userOnly:Usuario;
  favorito:Favorito[]=[];

  selectCat() {
    if (this.Categoria == undefined){
      console.log("wait")
    }else {
      localStorage.setItem("categoria",this.Categoria);
      localStorage.setItem("bsc","");
      window.location.href="/MenuProductos";
    }
   
  }
  setea() {
    this.nomUser = localStorage.getItem("nomUser");
    if(this.nomUser == undefined || this.nomUser == null || this.nomUser.length <= 3 ){
      this.countFav = 0;
    }
    this.usuarioServices.getNomUser(this.nomUser).subscribe(
      res => this.user = res 
    )
    setTimeout(()=>{
      this.userOnly=JSON.parse(JSON.stringify(this.user))
      this.favoritoServices.getCount(this.userOnly.idU).subscribe(
        res => this.countFav = res
      )
    },2000)
  }

  ir() {
    let a = localStorage.getItem("nomUser");
    let b = localStorage.getItem("password");
    if (a.length == 0 || b.length == 0) {
      window.location.href = "/RegistroUsuario";

    } else {
      window.location.href = "/Perfil";
    }
  }
  cerrar() {
    localStorage.setItem("nomUser", "")
    localStorage.setItem("password", "")
  }
  busqueda() {
    localStorage.setItem("bsc", this.buscador)
    localStorage.setItem("categoria", "")
    window.location.href = "/MenuProductos"
  }

}
