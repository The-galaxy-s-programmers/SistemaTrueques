import { OnInit, Component } from '@angular/core';
import { DatePipe} from '@angular/common';
import { Producto } from 'src/app/interfaces/producto';
import { FindValueSubscriber } from 'rxjs/internal/operators/find';

@Component({
  selector: 'app-ingreso-producto',
  templateUrl: './ingreso-producto.component.html',
  styleUrls: ['./ingreso-producto.component.css'],
  providers: [DatePipe]
})
export class IngresoProductoComponent implements OnInit {

  myFecha= new Date();
  Fecha:string;
  constructor(private datePipe: DatePipe,private productoService:ProductoService) {
    this.Fecha = this.datePipe.transform(this.myFecha, 'dd-MM-yyyy');

   }

  ngOnInit(): void {

  }
  nombre;
  descripcion;
  categoria
  uso;
  comuna;
  imagen;
  region;
  fecha;
  valorReferencial;
  check=false;
  ingresoProducto:Producto;
  trocar(){
    if(this.check==false){
      alert("Acepte los terminos y condiciones")
    }else{
    this.ingresoProducto={
      nombre:this.nombre,
      descripcion:this.descripcion,
      categoria:this.categoria,
      fechaPublicacion:this.Fecha,
      uso:this.uso,
      imagen:this.imagen,
      valorReferencia:this.valorReferencial,
      ubicacion:this.comuna+","+this.region,
      subcategoria:this.categoria,
      id_usuario:parseInt(localStorage.getItem("idU"))
    }
    console.log(this.ingresoProducto)
    this.productoService.postProducto(this.ingresoProducto).suscribe(
      res => console.log(res)
    )
    console.log("funciona")
    console.log(this.imagen)
  }
}



}
