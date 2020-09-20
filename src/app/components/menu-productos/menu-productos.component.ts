import { Component, Input, OnInit } from '@angular/core';
import { Producto } from "src/app/interfaces/producto";
import { ProductoService } from "src/app/services/producto.service"


@Component({
  selector: 'app-menu-productos',
  templateUrl: './menu-productos.component.html',
  styleUrls: ['./menu-productos.component.css']
})
export class MenuProductosComponent implements OnInit {

  constructor(private productosServices: ProductoService) { }

  
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

        setTimeout(()=>{this.showA=false},2000)
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
  }

  select(id){
    localStorage.setItem("bsc","")
    localStorage.setItem("idP",id)
  }
 
}
