import { Component, Input, OnInit } from '@angular/core';
import { Favorito } from 'src/app/interfaces/favorito';
import { Producto } from "src/app/interfaces/producto";
import { FavoritoService } from 'src/app/services/favorito.service';
import { ProductoService } from "src/app/services/producto.service"


@Component({
  selector: 'app-menu-productos',
  templateUrl: './menu-productos.component.html',
  styleUrls: ['./menu-productos.component.css']
})
export class MenuProductosComponent implements OnInit {

  constructor(private productosServices: ProductoService,private favoritoService:FavoritoService) { }

  showH=false;
  
  ngOnInit(): void {
    if(localStorage.getItem("bsc").length <= 3){
    this.buscar();
  }else if(localStorage.getItem("bsc") == undefined){
    this.buscar();
  }else if(localStorage.getItem("bsc") == null){
    this.buscar();
  }else{
    this.bsc();
  }
  if(localStorage.getItem("nomUser").length<=3 ||localStorage.getItem("nomUser")==null ||localStorage.getItem("nomUser")==undefined||localStorage.getItem("nomUser")=="undefined"  ){
    this.showH=false
  }else{
    this.showH=true
  }
  }

  showA:boolean=true;
  listaProductos: Producto[] = [];
  topListaProductos:Producto[]=[];
  categoria:string;


  buscar() {
    
    const a = localStorage.getItem("categoria")
    this.productosServices.getListaProductoCategoria(a).subscribe(
      res => { this.listaProductos = res},
      err => { console.log(err) }
    )
        this.productosServices.getTopProducto(a).subscribe(
          res => { this.topListaProductos =res},
          err =>{ console.log(err)}
        )

        setTimeout(()=>{
          this.showA=false
        },3500)
  }
  a:number=1;
  favorito:Favorito[]=[];
  SHOW123:boolean=false;
  exist:boolean;
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
  bsc(){
    this.productosServices.getNomProducto(localStorage.getItem("bsc")).subscribe(
      res => this.listaProductos = res 
    )
    const a = JSON.parse(JSON.stringify(this.listaProductos)).categoria
    this.productosServices.getTopProducto(a).subscribe(
      res => { this.topListaProductos =res},
      err =>{ console.log(err)}
    )
    setTimeout(()=>{
      this.showA=false
    },3500)
  }

  select(id){
    localStorage.setItem("bsc","")
    localStorage.setItem("idP",id)
  }
 
}
