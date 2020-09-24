import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { DatePipe } from '@angular/common'
import { FavoritoService } from 'src/app/services/favorito.service';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/interfaces/producto';
import { Favorito } from 'src/app/interfaces/favorito';
import { FavoritoIdProducto } from 'src/app/interfaces/favorito-id-producto';


function sleep(ms) {
  return new Promise(
    resolve => setTimeout(resolve, ms)
  );
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(private usuarioService: UsuarioService, public datepipe: DatePipe, public favoritoService: FavoritoService, public productoServices: ProductoService) { 
    
  }

  ngOnInit(): void {
    this.buscar();
    

  }

  myUser: Usuario[] = [];
  productosTuyos: Producto[] = [];
  productosFavList: Producto[] = [];
  productosFav: Producto;
  favoritos: FavoritoIdProducto[] = [];
  favoritosCount: number;
  ListFAV: Array<Producto>[] = [];
  usuarioLog: Usuario;
  usuarioEditado: Usuario;

  nombre: string;
  fechanac: String;
  imagen;
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

  register:boolean=false;

  ayuda() {
    localStorage.setItem("idP", null);
    window.location.href = "/Report";

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
      this.foto= this.usuarioLog.foto;
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
        console.log(this.favoritos)
        for (let i = 0; i < this.favoritos.length; i++) {
        
            this.productoServices.getIdProducto(this.favoritos[i].id_producto).subscribe(
              res => {
                this.productosFavList = res;})
                  this.ListFAV.push(this.productosFavList)
                
          
        }
        console.log(this.ListFAV)
      }, 3000)

    }, 5000)


  }


  update() {
   
    this.register = true;
    console.log(this.nomusuario)
    
    let nuevo: Usuario = {

      nomusuario: "",
      nombre: "",
      apellido: "",
      fechaNacimiento: null,
      correo: "",
      region: "",
      comuna: "",
      genero: "",
      foto: "",
      password: "",
      direccion: "",
      fono: 0
    }

    const obj = JSON.parse(JSON.stringify(this.usuarioEditado));
    const user = JSON.parse(JSON.stringify(this.usuarioLog));

    console.log(obj);
    console.log(user);
    console.log(nuevo);
    console.log(document.getElementById("imagenModel").innerHTML.length)

    if (obj.nombre.length == 0) {
      nuevo.nombre = user.nombre;
    } else {
      nuevo.nombre = obj.nombre;
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
    if (document.getElementById("imagenModel").innerHTML.length == 0) {
      nuevo.foto = user.foto;
    } else {
      document.getElementById("imagenModel").innerHTML = obj.foto;
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
    if(this.nombre.length <= 3 ) {
      alert("Verifique los datos ingresados")
      this.register= false
        
    }else if(this.apellidobd.length <= 3 ){
      alert("Verifique los datos ingresados")
      this.register= false
      
    }else if(this.nomusuario.length <= 3 ){
        alert("Verifique los datos ingresados")
        this.register= false
        
      }else if(this.password.length <= 3 ){
        alert("Verifique los datos ingresados")
        this.register= false
        
      }else if(this.correo.length <= 3 ){
        alert("Verifique los datos ingresados")
        this.register= false
        
      }else if(this.fechaNacimiento.length <= 3 ){
        alert("Verifique los datos ingresados")
        this.register= false
        
      }else if(this.region.length <= 3 ){
        alert("Verifique los datos ingresados")
        this.register= false
        
      }else if(this.comuna.length <= 3 ){
        alert("Verifique los datos ingresados")
        this.register= false
        
      }else if(this.direccion.length <= 3 ){
        alert("Verifique los datos ingresados")
        this.register= false
        
      }else if(this.genero.length <= 3 ){
        alert("Verifique los datos ingresados")
        this.register= false
        
      }else if( this.fono <= 3 ){
        alert("Verifique los datos ingresados")
        this.register= false
        
      }else{
        user.foto = document.getElementById("imagenModel").innerHTML;
    this.usuarioService.putUser(this.idU, user).subscribe(
      res => this.obs = res
    )
    alert("Se han actualizado los datos")
    window.location.reload();

  }
}
ingresoP(){
  window.location.href="/IngresoProducto"
}
}
