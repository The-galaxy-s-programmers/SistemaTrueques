import { OnInit, Component } from '@angular/core';
import { DatePipe} from '@angular/common';

@Component({
  selector: 'app-ingreso-producto',
  templateUrl: './ingreso-producto.component.html',
  styleUrls: ['./ingreso-producto.component.css'],
  providers: [DatePipe]
})
export class IngresoProductoComponent implements OnInit {

  myFecha= new Date();
  Fecha:string;
  constructor(private datePipe: DatePipe) {
    this.Fecha = this.datePipe.transform(this.myFecha, 'dd-MM-yyyy');

   }

  ngOnInit(): void {

  }
  imagen;
  
  trocar(){
    console.log("funciona")
    console.log(this.imagen)
  }
  



}
