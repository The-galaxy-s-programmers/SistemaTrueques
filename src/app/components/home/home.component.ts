import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Favorito } from 'src/app/interfaces/favorito';
import { Suscripcion } from 'src/app/interfaces/suscripcion';
import { SuscripcionNormal } from 'src/app/interfaces/suscripcion-normal';
import { FavoritoService } from 'src/app/services/favorito.service';
import { SuscripcionService } from 'src/app/services/suscripcion.service';
import { Producto } from '../../interfaces/producto';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private productoService: ProductoService, private router: Router,private favoritoService:FavoritoService,private suscripcionService:SuscripcionService) { }

  ngOnInit(): void {
    this.buscar()

  }
  pagina(){
    window.location.href="https://www.gob.cl/coronavirus/?gclid=CjwKCAjw74b7BRA_EiwAF8yHFK2ZuAVSpUgS-gPM9HQoXcpt4eIRSoU7E0iyVakmBYJ8RsNT3vs00RoCpI4QAvD_BwE"
  }

  
  a:number=1;
  favorito:Favorito[]=[];
  SHOW123:boolean=false;
  exist:boolean;
  correoSub:string;
 

  sub(){
    const SubCorreo:SuscripcionNormal={
      "correo":this.correoSub
    }
    this.suscripcionService.postSubs(SubCorreo).subscribe(
      res => console.log(res)
    )
    this.suscripcionService.EnvioEmails(this.correoSub).subscribe(
      res => console.log("enviadooo "+ res)
    )
    console.log(this.correoSub)
  }

  corazon(idP){
    this.SHOW123=true;
   
    
    
     console.log(this.a)
  
    this.favoritoService.getexistFav(localStorage.getItem("idU"),idP).subscribe(
      res => this.exist = res
    )
      
  const fav={
      id_usuarioF:  parseInt(localStorage.getItem("idU")),
      id_producto: idP
    }
    setTimeout(()=>{
      this.a++;
      console.log(this.exist)
     
      if(this.exist == true){
        if(this.a == 2){
        alert("Articulo ya en favoritos - Presione denuevo para borrar");
        this.SHOW123=false;
        }
       
        else if(this.a==3){
          this.favoritoService.deleteFav(localStorage.getItem("idU"),idP).subscribe(
            res => this.favorito = res
            )
            this.a = 1;
            console.log("borrando")
            alert("Articulo borrado de favoritos");
            location.reload();
        }
      }else if(this.exist == false){
        this.favoritoService.postFav(fav).subscribe(
          res => console.log(res)
          
        )
        console.log("añadiendo");
        alert("Articulo añadido a favoritos");
        location.reload();
      } 
    },4500) 
  }


  top4: Producto[] = [];
  top8: Producto[] = [];

 categoria;

  envioCat(){
    console.log(this.categoria);
   localStorage.setItem("categoria",this.categoria)
   localStorage.setItem("bsc","")
    
  }
  
  tecnologia(){
    this.categoria="Tecnologia";
    this.envioCat()

  }
  hogar(){
   this.categoria="Hogar"
   this.envioCat()
 }
  electr(){
    this.categoria="Electrodomesticos"
    this.envioCat()
 }


  buscar() {

    this.productoService.getTop4Producto().subscribe(
      res => {
        this.top4 = res
      }, err => console.log(err))

    this.productoService.getTop8Producto().subscribe(
      res => {
        this.top8 = res
      }, err => console.log(err))
      
  }

  select(id){
    console.log(id);
    localStorage.setItem("idP",id)
  }
}
