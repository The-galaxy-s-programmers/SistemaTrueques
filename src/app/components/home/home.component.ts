import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from '../../interfaces/producto';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private productoService: ProductoService, private router: Router) { }

  ngOnInit(): void {
    this.buscar()

  }
  pagina(){
    window.location.href="https://www.gob.cl/coronavirus/?gclid=CjwKCAjw74b7BRA_EiwAF8yHFK2ZuAVSpUgS-gPM9HQoXcpt4eIRSoU7E0iyVakmBYJ8RsNT3vs00RoCpI4QAvD_BwE"
  }

  
  


  top4: Producto[] = [];
  top8: Producto[] = [];

 categoria;

  envioCat(){
    console.log(this.categoria);
   localStorage.setItem("categoria",this.categoria)
    
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
