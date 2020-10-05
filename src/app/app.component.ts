import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ThrowStmt } from '@angular/compiler';
import { Usuario } from './interfaces/usuario';
import { UsuarioService } from './services/usuario.service';
import { Favorito } from './interfaces/favorito';
import { FavoritoService } from './services/favorito.service';
import { stringify } from '@angular/compiler/src/util';

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
  show2:boolean=false;

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
    if(this.nomUser == undefined || this.nomUser == null || this.nomUser.length <= 3 || this.nomUser == "undefined" || this.nomUser == "null"  ){
      this.countFav = 0;
    }else{
    this.usuarioServices.getNomUser(this.nomUser).subscribe(
      res => this.user = res 
    )
    setTimeout(()=>{
      this.userOnly=JSON.parse(JSON.stringify(this.user))
      localStorage.setItem("idU",stringify(this.userOnly.idU))
      this.favoritoServices.getCount(this.userOnly.idU).subscribe(
        res => this.countFav = res
      )
      if(this.countFav == undefined || this.countFav == null){
        this.countFav = 0;
      }
      if(localStorage.getItem("idU") == "undefined" || localStorage.getItem("idU") == undefined ){
        this.usuarioServices.getNomUser(this.nomUser).subscribe(
          res => this.user = res 
        )
      }
   
     if(localStorage.getItem("nomUser").length > 2){
        if(localStorage.getItem("idU") == "undefined" || localStorage.getItem("idU") == undefined ){
          this.usuarioServices.getNomUser(this.nomUser).subscribe(
            res => this.user = res 
          )
        }
     }
    },4500)
    if(this.nomUser =="admin"){
      this.show2 = true;
    }
  }
 
  }
  

  ir() {
    let a = localStorage.getItem("nomUser");
    let b = localStorage.getItem("password");
      if(a == undefined || a == null  || a == "undefined" || a == "null"|| a.length <= 3){
      window.location.href = "/RegistroUsuario";

    }
    else {
      window.location.href = "/Perfil";
    }
  }
  cerrar() {
    localStorage.setItem("nomUser", "")
    localStorage.setItem("password", "")
    window.location.href="/#";
  }
  busqueda() {
    localStorage.setItem("bsc", this.buscador)
    localStorage.setItem("categoria", "")
    window.location.href = "/MenuProductos"
  }

  tecnologia() {
    localStorage.setItem("bsc","")
    localStorage.setItem("categoria", "tecnologia")
    window.location.href = "/MenuProductos"
  }
  electro() {
    localStorage.setItem("bsc","")
    localStorage.setItem("categoria", "electrodomesticos")
    window.location.href = "/MenuProductos"
  }
  hogar() {
    localStorage.setItem("bsc","")
    localStorage.setItem("categoria", "hogar")
    window.location.href = "/MenuProductos"
  }
  deportes() {
    localStorage.setItem("bsc","")
    localStorage.setItem("categoria", "deportes")
    window.location.href = "/MenuProductos"
  }
  musica() {
    localStorage.setItem("bsc","")
    localStorage.setItem("categoria", "musica")
    window.location.href = "/MenuProductos"
  }
  vehiculos() {
    localStorage.setItem("bsc","")
    localStorage.setItem("categoria", "vehiculos")
    window.location.href = "/MenuProductos"
  }
  accesorios() {
    localStorage.setItem("bsc","")
    localStorage.setItem("categoria", "accesorios")
    window.location.href = "/MenuProductos"
  }
  vestuario() {
    localStorage.setItem("bsc","")
    localStorage.setItem("categoria", "vestuario y calzado")
    window.location.href = "/MenuProductos"
  }
  belleza() {
    localStorage.setItem("bsc","")
    localStorage.setItem("categoria", "belleza y cuidado personal")
    window.location.href = "/MenuProductos"
  }
  const() {
    localStorage.setItem("bsc","")
    localStorage.setItem("categoria", "construccion")
    window.location.href = "/MenuProductos"
  }



}
