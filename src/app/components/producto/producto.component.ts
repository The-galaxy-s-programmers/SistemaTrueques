import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
descripcion="Juego de Comedor para 4 personas, poco uso, material reciclado manufactura chilena.";
valor="Valor Aprox: $75.000";
}
