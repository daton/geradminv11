import { Component, OnInit, Inject } from "@angular/core";
import{SettingsService} from "../../services/service.index"

import { Alumno } from '../../modelo/alumno';
import { Profesor } from '../../modelo/profesor';
import { Globales } from '../../modelo/globales';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {
  public examenesMateriaNombre: string;
  public examenesNombre: string;
  public alumno: Alumno = {};

  public alumnos: Alumno[];

  public profesor: Profesor = {};

  profesorNombreMateria: string;
  esProfesor: boolean = false;
  esAlumno: boolean = false;


  estaExamenDiagnosticoRealizado: boolean = false;
  estaExamenInfo2InternetB2Realizado: boolean = false;
  estaExamenInfo2WordB2Realizado:boolean=false;
  estaExamenInfo2ExcelB2Realizado:boolean=false;
  estaExamenInfo2PowerB2Realizado:boolean=false;
  constructor(private router: Router, private http: HttpClient) {

    console.log("Eres alumno "+Globales.esAlumno);
    console.log("Eres ṕrofesor "+Globales.esProfesor);
    //Pantalla para profesor
    if (Globales.esProfesor) {
      this.http
        .post<Profesor>(
          Globales.urlBase + "/profesor/grupos",
          Globales.profesor
        )
        .subscribe(respuesta => {
          this.profesor = respuesta;
        });
      setTimeout(() => {
        console.log(
          "Profesor a mostrar grupos " + JSON.stringify(this.profesor)
        );
        this.esProfesor = Globales.esProfesor;
      }, 1200);
    }

    if (Globales.esAlumno) {
      let alumnito: Alumno = {
        email: Globales.alumno.email,
        password: Globales.alumno.password
      };

      console.log(
        "SE VA A ENVIAR ESTE ALUMNO para examen con passwoprd: " +
        Globales.alumno.password
      );
      this.http
        .post<Alumno>(Globales.urlBase + "/alumno-examen", alumnito)
        .subscribe(respuesta => {
          this.alumno = respuesta;
        });
      setTimeout(() => {
        this.esAlumno = Globales.esAlumno;
        console.log(JSON.stringify(this.alumno));
        this.examenesMateriaNombre = this.alumno.examenes[0].materia.nombre;
        this.examenesNombre = this.alumno.examenes[0].nombre;

        //  verificamos si el examen diagnosticol está relaizado:
        console.log(
          "Esta el examen diagnostico realizado?" +
          this.alumno.examenes[0].realizado
        );

        this.estaExamenDiagnosticoRealizado = this.alumno.examenes[0].realizado;
        this.estaExamenInfo2InternetB2Realizado = this.alumno.examenes[1].realizado;
        this.estaExamenInfo2WordB2Realizado = this.alumno.examenes[2].realizado;
        this.estaExamenInfo2ExcelB2Realizado = this.alumno.examenes[3].realizado;
        this.estaExamenInfo2PowerB2Realizado = this.alumno.examenes[4].realizado;
      }, 1200);
    }
  }

  ngOnInit() { }

  irAExamen(valor: number) {
    console.log("VAS A REALIZAR EL EXAMEN NUMEROOOOOOOOO " + valor);
    this.alumno = Globales.alumno;


    this.http
      .post<Alumno>(Globales.urlBase + "/alumno-examen", Globales.alumno)
      .subscribe(respuesta => {
        this.alumno = respuesta;
      });
    setTimeout(() => {
      console.log("Hay que miedo" + this.alumno.examenes[valor].materia.nombre);
      this.examenesMateriaNombre = this.alumno.examenes[valor].materia.nombre;
      this.examenesNombre = this.alumno.examenes[valor].nombre;
      //Checamos el nombre del exmane
      this.examenesNombre = this.alumno.examenes[valor].nombre;
      Globales.examenesMateriNombre = this.examenesMateriaNombre;
      Globales.examenesNombre = this.alumno.examenes[valor].nombre;

      console.log("ANTES DE IR AL EXAMEN materia" + Globales.examenesMateriNombre + " nombre examen " + Globales.examenesNombre);

      //Ocultamos el boton de empezar hasta que se cargue el esquema compelto de este alumno
      this.router.navigate(["/examensitos"], {
        skipLocationChange: true
      });
    }, 1300);
  }

  irAGrupo(valor: string) {
    this.profesorNombreMateria = valor;
    console.log(
      "EL GRUPO ES " +
      valor +
      " Correspondiente al maestro cuya clave es  " +
      this.profesor.clave
    );

    //Buscamos  los alumnos por nombre de la materia  la clave del profesor

    this.http
      .get<Alumno[]>(
        Globales.urlBase +
        "/alumno/lista/" +
        this.profesor.clave +
        "/" +
        this.profesorNombreMateria
      )
      .subscribe(respuesta => {
        this.alumnos = respuesta;
      });
    setTimeout(() => {
      console.log(
        "Los alumnos que llegaron para el listado son" +
        JSON.stringify(this.alumnos)
      );

      //Ajustamos a las globales a los alumnos
      Globales.alumnos = this.alumnos;

      //Ocultamos el boton de empezar hasta que se cargue el esquema compelto de este alumno

      this.router.navigate(["/grupos"], { skipLocationChange: true });
    }, 1300);
  }
}
