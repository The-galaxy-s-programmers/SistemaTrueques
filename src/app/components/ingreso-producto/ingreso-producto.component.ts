import { OnInit, Component } from '@angular/core';
import { DatePipe} from '@angular/common';
import { Producto } from 'src/app/interfaces/producto';
import { FindValueSubscriber } from 'rxjs/internal/operators/find';
import { ProductoService} from 'src/app/services/producto.service';
import { NodeWithI18n } from '@angular/compiler';

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
   

   }

  ngOnInit(): void {
    this.Fecha = this.datePipe.transform(this.myFecha, 'dd-MM-yyyy');
    console.log(localStorage.getItem("nomUser"))
    if(localStorage.getItem("nomUser") == undefined ||localStorage.getItem("nomUser") == "undefined" ||localStorage.getItem("nomUser") == null ||localStorage.getItem("nomUser") == ""){
        window.location.href="/RegistroUsuario"
    }
    
  }
  nombre;
  descripcion;
  categoria
  uso;
  comuna;
  imagen;
  region;
  valorReferencial;
  check=false;
  subcategoria;
  ingresoProducto:Producto;
  changeListener($event) : void {
    this.readThis($event.target);
  }
  
  readThis(inputValue: any): void {
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();
  
    myReader.onloadend = (e) => {
      this.imagen = myReader.result;
    }
    myReader.readAsDataURL(file);
  }
  trocar(){
    console.log(this.nombre)
    if(this.check==false){
      alert("Acepte los terminos y condiciones")
    }else if(this.nombre == undefined || this.nombre.length == "undefined" || this.nombre.length <=3){
      alert("Verifique los datos ingresados [Nombre]")
    }else if(this.descripcion == undefined || this.descripcion.length == "undefined" || this.descripcion.length <=3){
      alert("Verifique los datos ingresados [Descripcion]")
    }else if(this.categoria == undefined || this.categoria.length == "undefined" || this.categoria.length <=3){
      alert("Verifique los datos ingresados [Categoria]")
    }else if(this.uso == undefined || this.uso.length == "undefined" || this.uso.length <=3 ){
      alert("Verifique los datos ingresados [Uso]")
    }else if(this.comuna == undefined || this.comuna.length == "undefined" || this.comuna.length <=3){
      alert("Verifique los datos ingresados [Comuna]")
    }else if(this.region == undefined || this.region.length == "undefined" || this.region.length <=3 ){
      alert("Verifique los datos ingresados [Region]")
    }else if(this.valorReferencial == undefined || this.valorReferencial.length == "undefined" || this.valorReferencial.length <=3){
      alert("Verifique los datos ingresados [Valor Referencial]")
    }else if(this.imagen == undefined || this.imagen.length == "undefined" || this.imagen.length <=3 ){
      alert("Verifique los datos ingresados [Imagen]")
    }else{
    this.ingresoProducto={
      nombre:this.nombre,
      descripcion:this.descripcion,
      categoria:this.categoria,
      fechaPublicacion:this.datePipe.transform(this.myFecha,"yyyy-MM-dd'T'HH:mm:ss"),
      uso:this.uso,
      imagen:this.imagen,
      valorReferencia:this.valorReferencial,
      ubicacion:this.comuna+","+this.region,
      subcategoria:this.subcategoria,
      id_usuario:parseInt(localStorage.getItem("idU"))
    }
    
     this.productoService.postProducto(this.ingresoProducto).subscribe(
      res =>{ if(res==1){alert("¡Producto subido a la pagina!");window.location.href="/Perfil"}}) 

 
  }
}



}
