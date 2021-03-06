import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { DatePipe } from '@angular/common'
import { FavoritoService } from 'src/app/services/favorito.service';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/interfaces/producto';
import { Favorito } from 'src/app/interfaces/favorito';
import { FavoritoIdProducto } from 'src/app/interfaces/favorito-id-producto';
import { ReportesService } from 'src/app/services/reportes.service';
import { SuscripcionService } from 'src/app/services/suscripcion.service';
import { Reportes } from 'src/app/interfaces/reportes';
import { Suscripcion } from 'src/app/interfaces/suscripcion';
import { SuscripcionNormal } from 'src/app/interfaces/suscripcion-normal';
import { ChatPrivService } from 'src/app/services/chat-priv.service'
import { ChatPriv } from 'src/app/interfaces/chat-priv';
import { ChatPrivToken } from 'src/app/interfaces/chat-priv-token';





@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(private chatPrivService:ChatPrivService,private suscripcionService:SuscripcionService,private usuarioService: UsuarioService,public reportesSevice:ReportesService, public datepipe: DatePipe, public favoritoService: FavoritoService, public productoServices: ProductoService) { 
    
  }

  ngOnInit(): void {
    this.buscar();
    if(localStorage.getItem("nomUser") == "admin"){
      this.Show32=true;
    }
    this.productoServices.getListaProductoid(localStorage.getItem("idU")).subscribe(
      res => this.productosListUser = res
      )

  }
  columnasTabla:String []=[
    "id",
    "id_usuario",
    "fecha",
    "comentario",
    "correo",
    "nombre",
    "tipo",
    "botonera"
  ]
  columnaTabla:String []=[
    "id",
    "correo",
    "botonera"
  ]
  columnTabla:String[]=[
    "idU", 
    "nomusuario",
    "nombre",
    "apellido",
    "fechaNacimiento",
    "correo",
    "region",
    "comuna",
    "genero",
    "password",
    "direccion",
    "fono",
    "botonera"
  ]
  columTabla:String[]=[
    "idP",
    "nombre",
    "descripcion",
    "categoria",
    "fechaPublicacion",
    "uso",
    "valorReferencia",
    "ubicacion",
    "subcategoria",
    "id_usuario",
    "botonera"
  ]
  coluTabla:String[]=[
    "token",
    "nomProducto",
    "botonera"
  ]
  SuscripcionNormal:SuscripcionNormal[]=[];
  Suscripcion:Suscripcion[]=[];
  imagenFoto;
  comentarioAll:String;
  Show32:boolean=false;
  myUser: Usuario[] = [];
  productosTuyos: Producto[] = [];
  productosFavList: FavoritoIdProducto[] = [];
  productosFav: Producto;
  favoritos: FavoritoIdProducto[] = [];
  favoritosCount: number;
  comentarios:Reportes[]=[];
  productos:Reportes[]=[];
  ayudas:Reportes[]=[];
  subs:SuscripcionNormal[]=[];
  productosall:Producto[]=[];
  usuariosall:Usuario[]=[];

  usuarioLog: Usuario;
  usuarioEditado: Usuario;

  nombre: string;
  fechanac: String;
  
  idU: number;
  nombrebd: string;
  apellidobd: string;
  nomusuario: string;
  correo: string;
  genero: string;
  password: string;
  direccion: string;
  fechaNacimiento: string;
  comuna: string;
  region: string;
  fono: number;
  fechaNacDate: string;
  foto: string;

  obs: number;
  productosListUser:Producto[]=[];
  chatPriv:ChatPrivToken[]=[];
  register:boolean=false;

  ayuda() {
    localStorage.setItem("idP", null);
    window.location.href = "/Report";
    localStorage.setItem("a","ayuda");

  }
 
  borrar() {
    var r = confirm("¿Seguro que desea borrar su perfil? Esto puede traer cambios permanentes");
    if (r == true) {
      alert("\'Borrado exitoso\'");

      this.usuarioService.deleteUsuario(this.idU).subscribe(
        res => this.myUser = res
      )
      localStorage.setItem("nomUser", "")
      localStorage.setItem("password", "")
      window.location.href = "/#"
    } else {

    }

  }
  
  buscar() {
  

    this.usuarioService.getNomUser(localStorage.getItem("nomUser")).subscribe(
      res => {
        this.myUser = res;
      },
      err => { console.log(err) }
    )

    setTimeout(() => {
      this.usuarioLog = JSON.parse(JSON.stringify(this.myUser))
      this.nombre = this.usuarioLog.nombre + " " + this.usuarioLog.apellido
      this.fechanac = this.datepipe.transform(this.usuarioLog.fechaNacimiento, 'dd-MM-yyyy');
      this.foto=this.usuarioLog.foto
      this.idU = this.usuarioLog.idU;
      this.nombrebd = this.usuarioLog.nombre;
      this.apellidobd = this.usuarioLog.apellido;
      this.nomusuario = this.usuarioLog.nomusuario;
      this.correo = this.usuarioLog.correo;
      this.genero = this.usuarioLog.genero;
      this.password = this.usuarioLog.password;
      this.direccion = this.usuarioLog.direccion;
      this.fechaNacimiento = this.datepipe.transform(this.usuarioLog.fechaNacimiento, 'dd-MM-yyyy');
      this.comuna = this.usuarioLog.comuna;
      this.region = this.usuarioLog.region;
      this.fechaNacDate = this.usuarioLog.fechaNacimiento;
      this.usuarioEditado = {
        nomusuario: this.nomusuario,
        nombre: this.nombrebd,
        apellido: this.apellidobd,
        fechaNacimiento: this.fechaNacimiento,
        correo: this.correo,
        region: this.region,
        comuna: this.comuna,
        genero: this.genero,
        foto: this.foto,
        password: this.password,
        direccion: this.direccion,
        fono: this.fono
      }
      console.log(this.idU)

      this.favoritoService.getListaFavUser(this.idU).subscribe(
        res => { this.favoritos = res; }
      )
      setTimeout(() => {
        if (this.nombre == undefined) {
          window.location.reload;
        }
        this.favoritoService.getListaFavUser(this.idU).subscribe(
              res => {this.productosFavList = res;})
                 
      }, 4500)

    }, 6500)

    this.reportesSevice.getListaComentarios().subscribe(
      res => this.comentarios = res
    )
    this.reportesSevice.getListaProductos().subscribe(
      res => this.productos = res
    )
    this.reportesSevice.getListaAyuda().subscribe(
      res => this.ayudas = res
    )
    this.suscripcionService.getListaSubsNormal().subscribe(
      res => this.subs = res
    )
    this.productoServices.getListaProducto().subscribe(
      res => this.productosall = res
    )
    this.usuarioService.getListaUser().subscribe(
      res => this.usuariosall = res
       )
    this.chatPrivService.getListaMensaje(localStorage.getItem("idU")).subscribe(
          res=> this.chatPriv = res
        )
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
  
  borrarPro(id){
    this.productoServices.deleteProducto(id).subscribe(
      res => this.productosall = res
    )
    this.productoServices.getListaProducto().subscribe(
      res => this.productosall = res
    )
    setTimeout(()=>{ alert("Borrado Exitoso"); location.reload();},3000)
  }
  borrarUser(id){
    this.usuarioService.deleteUsuario(id).subscribe(
      res => this.usuariosall = res
    )
    this.usuarioService.getListaUser().subscribe(
      res => this.usuariosall = res
       )
       setTimeout(()=>{ alert("Borrado Exitoso"); location.reload();},3000)
  }
  borrarSub(correo){
    this.suscripcionService.deleteSubs(correo).subscribe(
      res => this.subs = res
    )
    this.suscripcionService.getListaSubsNormal().subscribe(
      res => this.subs = res
    )
    setTimeout(()=>{ alert("Borrado Exitoso"); location.reload();},3000)
    
  }
  borrarP(id){
    this.reportesSevice.deleteReport(id).subscribe(
      res => this.productos = res
    )
    this.reportesSevice.getListaProductos().subscribe(
      res => this.productos = res
    )
    setTimeout(()=>{ alert("Borrado Exitoso"); location.reload();},3000)
  }
  
  borrarC(id){
    this.reportesSevice.deleteReport(id).subscribe(
      res => this.comentarios = res
    )
    this.reportesSevice.getListaComentarios().subscribe(
      res => this.comentarios = res
    )
    setTimeout(()=>{ alert("Borrado Exitoso"); location.reload();},3000)
  }
  borrarA(id){
    this.reportesSevice.deleteReport(id).subscribe(
      res => this.ayudas = res
    )
    this.reportesSevice.getListaAyuda().subscribe(
      res => this.ayudas = res
    )
    setTimeout(()=>{ alert("Borrado Exitoso"); location.reload();},3000)
  }
  

  select(id){
    localStorage.setItem("bsc","")
    localStorage.setItem("idP",id)
  }
  changeListener($event) : void {
    this.readThis($event.target);
  }
  
  readThis(inputValue: any): void {
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();
  
    myReader.onloadend = (e) => {
      this.imagenFoto = myReader.result;
    }
    myReader.readAsDataURL(file);
  }
  update() {

    this.register = true;
    console.log(this.nomusuario)
    
    let nuevo: Usuario = {
      nomusuario:"",
    nombre:"",
    apellido:"",
    fechaNacimiento:"",
    correo:"",
    region:"",
    comuna:"",
    genero:"",
    foto:"",
    password:"",
    direccion:"",
    fono:0
    };

    const obj = JSON.parse(JSON.stringify(this.usuarioEditado));
    const user = JSON.parse(JSON.stringify(this.usuarioLog));

    console.log(obj);
    console.log(user);
    console.log(this.foto);
    console.log(this.nombrebd)
    console.log(user.nombre.length);

    
    

    console.log(this.imagenFoto);
   

    if (obj.nombre.length == user.nombre.length) {
      nuevo.nombre = obj.nombre;
    } else {
      nuevo.nombre = user.nombre;
    }
    if (obj.apellido.length == 0) {
      nuevo.apellido = user.apellido;
    } else {
      nuevo.apellido = obj.apellido;
    }
    if (obj.nomusuario.length == 0) {
      nuevo.nomusuario = user.nomusuario;
    } else {
      nuevo.nomusuario = obj.nomusuario;
    }
    if (obj.correo.length == 0) {
      nuevo.correo = user.correo;
    } else {
      nuevo.correo = obj.correo;
    }
    if (obj.region.length == 0) {
      nuevo.region = user.region;
    } else {
      nuevo.region = obj.region;
    }
    if (obj.comuna.length == 0) {
      nuevo.comuna = user.comuna;
    } else {
      nuevo.comuna = obj.comuna;
    }
    if (obj.genero.length == 0) {
      nuevo.genero = user.genero;
    } else {
      nuevo.genero = obj.genero;
    }
    if (obj.foto.length == 0) {
      nuevo.foto = user.foto;
    } else {
      nuevo.foto = obj.foto;
    }
    if (obj.password.length == 0) {
      nuevo.password = user.password;
    } else {
      nuevo.password = obj.password;
    }
    if (obj.direccion.length == 0) {
      nuevo.direccion = user.direccion;
    } else {
      nuevo.direccion = obj.direccion;
    } if (obj.fono == 0) {
      nuevo.fono = user.fono;
    } else {
      nuevo.fono = obj.fono;
    } 
    if (obj.fechaNacimiento == 0) {
      nuevo.fechaNacimiento = user.fechaNacimiento;
    } else {
      nuevo.fechaNacimiento = obj.fechaNacimiento;
    }
    if(this.imagenFoto == "undefined" || this.imagenFoto == undefined){
      nuevo.foto = obj.foto;
    }else{
      user.foto = this.imagenFoto;
    }

    console.log(user.nombre)
    console.log(this.nombrebd)

    if(user.nombre.length <= 3 ) {
      alert("Verifique los datos ingresados")
      this.register= false
        
    }else if(user.apellido.length <= 3){
      alert("Verifique los datos ingresados")
      this.register= false
      
    }else if(user.nomusuario.length <= 3 ){
        alert("Verifique los datos ingresados")
        this.register= false
        
      }else if(user.password.length <= 3 ){
        alert("Verifique los datos ingresados")
        this.register= false
        
      }else if(user.correo.length <= 3 ){
        alert("Verifique los datos ingresados")
        this.register= false
        
      }else if(user.fechaNacimiento.length <= 3 ){
        alert("Verifique los datos ingresados")
        this.register= false
        
      }else if(user.region.length <= 3 ){
        alert("Verifique los datos ingresados")
        this.register= false
        
      }else if(user.comuna.length <= 3 ){
        alert("Verifique los datos ingresados")
        this.register= false
        
      }else if(user.direccion.length <= 3 ){
        alert("Verifique los datos ingresados")
        this.register= false
        
      }else if(user.genero.length <= 3 ){
        alert("Verifique los datos ingresados")
        this.register= false
        
      }else if( user.fono <= 3 ){
        alert("Verifique los datos ingresados")
        this.register= false
      }else{
        setTimeout(() => {
          this.usuarioService.putUser(this.idU, user).subscribe(
            res => this.obs = res) 
    console.log(nuevo);
    alert("Se han actualizado los datos")
    location.reload(); 
        }, 3000);
      
    }
  
}
ingresoP(){
  window.location.href="/IngresoProducto"
}

irChat(id){
  localStorage.setItem("token",id)
  window.location.href="/Chat"

}
}
