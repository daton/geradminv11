import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profesor } from '../modelo/profesor';
import { Alumno } from '../modelo/alumno';
import { Estatus } from '../modelo/estatus';
import { CorreoService } from '../modelo/correo.service';
import { ProfesorService } from '../modelo/profesor.service';
import { HttpClient } from "@angular/common/http";
import { Globales } from '../modelo/globales';
declare function init_plugins();
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [CorreoService, ProfesorService]
})
export class LoginComponent implements OnInit {
  login: string;
  password: string;
  estaOculta: boolean = true;
  mensaje: string = "nada";
  profesor: Profesor;
  email: string;
  miMateria: string;
  miClaveProfesor: string;
 oculta:boolean;
  usuario: string='Selecciona uno...';
  mostrar:boolean;
  urlAutenticacion: string;
  usuarioInvalido = 'Usuario o contraseña inválidos, si no la recuerdas proporciona tu correo para enviartela y oprimer el boton -Recuperar Contraseña- '

  alumno: Alumno = {};
  estatus: Estatus = {};
  estatusRecuperarCorreo: Estatus = {}
  constructor(
    private router: Router,
    private service: CorreoService,
    public servicioProfesor: ProfesorService,
    public http: HttpClient
  ) { 

    init_plugins();
    
  }

  ngOnInit() {
    init_plugins();
  }
  ingresar() {
 //  this.router.navigate(['/dashboard'])
console.log("Este es el usuario"+this.usuario+"login es"+this.login+" passwrod "+this.password)

    //AUNTENTICA PROFESOR
    if (this.usuario=='Selecciona uno...') {
      
 this.mostrar=true;
      this.usuarioInvalido = "No  has seleccionado un Perfil"
      console.log("No has seleccionado un perfil");
    }
   
    if (this.usuario == "Profesor") {
      console.log("Te autenticaras como profesor");
   
      this.profesor = {
        email: this.login,
        password: this.password
      };

      this.urlAutenticacion = Globales.urlBase + "/autenticar/profesor";
      this.http
        .post<Estatus>(this.urlAutenticacion, this.profesor)
        .subscribe(respuesta => {
          this.estatus = respuesta;
        });
      setTimeout(() => {
        this.oculta=false;
        console.log(this.estatus.mensaje + " Estatus " + this.estatus.success);
        if (this.estatus.success) {
          //Si se autentica:
          Globales.profesor = this.profesor;
          Globales.profesor.clave = this.estatus.perfil.clave;
          this.router.navigate(["/dashboard"], { skipLocationChange: true });
          this.estaOculta = true;

          //Como SI ES profesor...
          Globales.esProfesor = true;
          Globales.esAlumno = false;
          Globales.cargando = true;

          //Ahora accederemos al perfil
          Globales.estatus = this.estatus;
          console.log("La clave del profe que se autentiuca es  " + Globales.profesor.clave)
          this.mostrar=false;
        } else {
          //si es rechazada la autenticacion:
         // this.router.navigate(["/login"], { skipLocationChange: true });
          this.estaOculta = false;
          this.oculta=true;
          this.mostrar=true;
          this.usuarioInvalido = "Datos de cuenta incorrectos"
          console.log("datos no validos");
        }
      }, 1200);
    }

    //AUTENTICAR AL ALUMNO
    if (this.usuario == "Alumno") {
      this.alumno = {
        email: this.login,
        password: this.password
      };

      this.urlAutenticacion = Globales.urlBase + "/autenticar/alumno";
      this.http
        .post<Estatus>(this.urlAutenticacion, this.alumno)
        .subscribe(respuesta => {
          this.estatus = respuesta;
        });

      setTimeout(() => {
        this.oculta=false;
        console.log(this.estatus.mensaje + " Estatus " + this.estatus.success);
        if (this.estatus.success) {
          //Si se autentica:
          Globales.alumno = this.alumno;
          Globales.alumno.clave = this.estatus.perfil.id;


          //El paso importante la clave

          this.router.navigate(["/dashboard"], { skipLocationChange: true });
          this.estaOculta = true;
          //Como no es profesor...
          Globales.esProfesor = false;
          Globales.esAlumno = true;


          //Ahora accederemos al perfil
          Globales.estatus = this.estatus;

          this.mostrar=false;
        } else {
          //si es rechazada la autenticacion:
        //  this.router.navigate(["/login"], { skipLocationChange: true });
          this.estaOculta = false;
          this.oculta=true;
          this.mostrar=true;
          this.usuarioInvalido = "Datos de cuenta incorrectos"
        }
      }, 1200);
    }
    console.log("Independiente de la autoebtucacion" + this.login);



  }

  obtenerCorreo() {
    return this.service
      .getCorreo()
      .subscribe(mensaje => (this.mensaje = mensaje));
  }

  obtenerProfesor() {
    return this.servicioProfesor
      .getProfesor()
      .subscribe(profesor => (this.profesor = profesor));
  }
}
