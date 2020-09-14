import { Component, OnInit } from '@angular/core';
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
    this.buscar();
  }

  listaProductos: Producto[] = [];
  topListaProductos:Producto[]=[];

  buscar() {
    this.productosServices.getListaProductoCategoria("Tecnologia").subscribe(
      res => { this.listaProductos = res},
      err => { console.log(err) }
    )
        this.productosServices.getTopProducto("Tecnologia").subscribe(
          res => { this.topListaProductos =res},
          err =>{ console.log(err)}
        )

        
  }
  
}
