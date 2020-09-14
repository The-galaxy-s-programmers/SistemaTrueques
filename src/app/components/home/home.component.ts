import { Component, OnInit } from '@angular/core';
import { Producto } from '../../interfaces/producto';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.buscar()
  }
  top4: Producto[] = [];
  top8: Producto[] = [];

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

}
