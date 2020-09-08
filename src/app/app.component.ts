import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DatePipe]
})
export class AppComponent {


  title = 'Sistema-Trueques';
  myFecha= new Date();
  Fecha:string;
 


  constructor(private datePipe: DatePipe) {
    this.Fecha = this.datePipe.transform(this.myFecha, 'yyyy');

   }

  ngOnInit(): void {
   
  }
  
}
