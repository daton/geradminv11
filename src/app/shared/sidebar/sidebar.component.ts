import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/service.index';
import { Alumno } from '../../modelo/alumno';
import { Profesor } from '../../modelo/profesor';
import { Globales } from '../../modelo/globales';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  public alumno: Alumno = {};

  public alumnos: Alumno[];

  public profesor: Profesor = {};

  profesorNombreMateria: string;
  esProfesor: boolean = false;
  esAlumno: boolean = false;


  constructor(public _sidebar:SidebarService) { 

    this.esProfesor=Globales.esProfesor
    this.esAlumno=Globales.esAlumno;
  }

  ngOnInit() {
  }
  salir(){
    location.reload();console.log("ha asalir");
  }
}
