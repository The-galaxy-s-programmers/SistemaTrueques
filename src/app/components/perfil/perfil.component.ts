import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { DatePipe } from '@angular/common'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(private usuarioService: UsuarioService, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.buscar();


  }

  myUser: Usuario[] = [];
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

  obs:number;
  ayuda(){
      localStorage.setItem("idP",null);
      window.location.href="/Report";

  }
  borrar(){
			var r = confirm("¿Seguro que desea borrar su perfil? Esto puede traer cambios permanentes");
			if (r == true) {
        alert("\'Borrado exitoso\'");
        
				this.usuarioService.deleteUsuario(this.idU).subscribe(
          res => this.myUser = res
        )
        localStorage.setItem("nomUser","")
        localStorage.setItem("password","")
        window.location.href="/#"
			}else{

			}
		
  }
  buscar() {
    let u = localStorage.getItem("nomUser");

    this.usuarioService.getNomUser(u).subscribe(
      res => {
        this.myUser = res;
        this.usuarioLog = JSON.parse(JSON.stringify(res))
        this.nombre = this.usuarioLog.nombre + " " + this.usuarioLog.apellido
        this.fechanac = this.datepipe.transform(this.usuarioLog.fechaNacimiento, 'dd-MM-yyyy');
        this.foto = this.usuarioLog.foto;
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
      },
      err => { console.log(err) }
    )
    setTimeout(() => {
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
      console.log(this.usuarioEditado)
    }, 3000)

  }


  update() {
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
   
    this.usuarioService.putUser(this.idU,user).subscribe(
      res => this.obs = res
    )
    alert("Se han actualizado los datos")
      window.location.reload();

  }
}

