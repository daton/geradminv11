import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graficas1',
  templateUrl: './graficas1.component.html',
  styles: []
})
export class Graficas1Component implements OnInit {


  //Data de tareas graficos
  graficos: any = {
    'grafico1': {
      'labels': ['Aprobados', 'Reprobados', 'No presentaron'],
      'data':  [24, 30, 46],
      'type': 'doughnut',
      'leyenda': 'Caalificaciones(Ejemplo)'
    },
    'grafico2': {
      'labels': ['Hombres', 'Mujeres'],
      'data':  [4500, 6000],
      'type': 'doughnut',
      'leyenda': 'Alumnos'
    },
    'grafico3': {
      'labels': ['Si', 'No'],
      'data':  [95, 5],
      'type': 'doughnut',
      'leyenda': '¿Le agrado la materia?'
    },
    'grafico4': {
      'labels': ['No', 'Si'],
      'data':  [85, 15],
      'type': 'doughnut',
      'leyenda': '¿Fué fácil la materia?'
    },
  };
  constructor() { }

  ngOnInit() {
  }

}
