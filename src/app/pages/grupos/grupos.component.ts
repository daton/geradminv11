import { Component, OnInit } from '@angular/core';
import { Alumno } from '../../modelo/alumno';
import notify from 'devextreme/ui/notify';
import { DxDataGridComponent, DxButtonModule } from 'devextreme-angular';
import { Globales } from '../../modelo/globales';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styles: []
})
export class GruposComponent implements OnInit {

  alumnos:Alumno[];
  nombreCompleto:string[];
  noSeHaCargado:boolean
  

  constructor() {
    let indice=1;
    this.alumnos=Globales.alumnos;
    for(let i=0;i<this.alumnos.length;i++){
    this.alumnos[i].indice=indice;
    this.alumnos[i].nombreCompleto=this.alumnos[i].paterno+" "+this.alumnos[i].materno+" "+this.alumnos[i].nombre;
    indice++;
    } }

  ngOnInit() {
  }

}
