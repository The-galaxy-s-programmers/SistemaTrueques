import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {


  }

  nomusuario: string;
  nombre: string;
  apellido: string;
  fechaNacimiento: string;
  correo: string;
  region: string;
  comuna: string;
  genero: string;
  foto = "data:image/png;base64,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";
  password: string;
  direccion: string;
  fono: number;

  register:boolean=false;

  nombredusuario: string;
  passworddusuario: string;
  validaCorreo: boolean;
  validaNomUser: boolean;
  showSpin: boolean = true;
  check:boolean = false;
  
  create() {

    this.register = true;
    console.log(this.nombredusuario)
    if(this.nombre == undefined || this.nombre.length <= 3 ) {
      alert("Verifique los datos ingresados")
      this.register = false;
        
    }else if(this.apellido == undefined || this.apellido.length <= 3 ){
      alert("Verifique los datos ingresados")
      this.register = false;
      
    }else if(this.nomusuario == undefined || this.nomusuario.length <= 3 ){
        alert("Verifique los datos ingresados")
        this.register = false;
        
      }else if(this.password == undefined || this.password.length <= 3 ){
        alert("Verifique los datos ingresados")
        this.register = false;
        
      }else if(this.correo == undefined || this.correo.length <= 3 ){
        alert("Verifique los datos ingresados")
        this.register = false;
        
      }else if(this.fechaNacimiento == undefined || this.fechaNacimiento.length <= 3 ){
        alert("Verifique los datos ingresados")
        this.register = false;
        
      }else if(this.region == undefined || this.region.length <= 3 ){
        alert("Verifique los datos ingresados")
        this.register = false;
        
      }else if(this.comuna == undefined || this.comuna.length <= 3 ){
        alert("Verifique los datos ingresados")
        this.register = false;
        
      }else if(this.direccion == undefined || this.direccion.length <= 3 ){
        alert("Verifique los datos ingresados")
        this.register = false;
        
      }else if(this.genero == undefined || this.genero.length <= 3 ){
        alert("Verifique los datos ingresados")
        this.register = false;
        
      }else if(this.fono == undefined || this.fono <= 3 ){
        alert("Verifique los datos ingresados")
        this.register = false;
        
      }else{

    
    this.usuarioService.getIfExistUser(this.correo).subscribe(
      res => this.validaCorreo = res
    )
    this.usuarioService.getIfExisteUser(this.nomusuario).subscribe(
      res => this.validaNomUser = res
    )
    console.log("validanding ...")
    setTimeout(() => {
      console.log("validado")

      if (this.validaCorreo == true) {
        alert("Correo ya registrado")
        this.register=false;
      } else {
        if (this.validaNomUser == true) {
          alert("Nombre de usuario ya registrado")
          this.register=false;

        } else {
          if(this.check==false){
            alert("Acepte los terminos y condiciones")
            this.register=false;

          }else{
          let nuevo: Usuario = {
            nomusuario: this.nomusuario,
            nombre: this.nombre,
            apellido: this.apellido,
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

          this.usuarioService.postUser(nuevo).subscribe(
            res => { console.log(nuevo) },
            err => { console.log(err) }
          )
          setTimeout(() => {
          alert("Usuario creado con exito")
          this.usuarioService.EnvioEmails(nuevo.correo).subscribe(
            res=> console.log(res)
          )
          localStorage.setItem("nomUser", this.nomusuario);
          this.register=false;
          window.location.href = "/Perfil";
          },3500)
        }
      }
    }
    }, 4500)

  }}

  usuarioLog: Usuario[];

  iniciar() {
    this.showSpin = false;
    if(this.nombredusuario == undefined || this.passworddusuario == undefined ) {
      alert("Verifique los datos ingresados")
        this.showSpin=true;
    }else if(this.nombredusuario.length <= 3 || this.passworddusuario.length <= 3 ){
      alert("Verifique los datos ingresados")
      this.showSpin=true;
    }
     else {

      this.usuarioService.getIfExisteUser(this.nombredusuario).subscribe(
        res =>{ this.validaNomUser = res},err =>{ alert("Verifique los datos ingresados"); this.showSpin=true}
      )
      this.usuarioService.getNomUser(this.nombredusuario).subscribe(
        res =>{ this.usuarioLog = res},err => {alert("Verifique los datos ingresados"); this.showSpin=true;}
      )


      setTimeout(() => {
        const a = JSON.parse(JSON.stringify(this.usuarioLog))

        if (this.validaNomUser = true) {
          if (a.password == this.passworddusuario && a.nomusuario == this.nombredusuario) {
            localStorage.setItem("nomUser", a.nomusuario)
            localStorage.setItem("password", a.password)
            alert("Inicio de sesion exitoso")
            window.location.href = "/Perfil"
          } else {
            alert("Nombre de usuario o Contraseña invalidas")
            this.showSpin=true
          }
        } else {
          alert("Usuario Inexistente");
          this.showSpin=true
        }
      }, 4500)
    }
  }

}


