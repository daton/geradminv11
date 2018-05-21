import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {
menu:any=[
  {
    titulo:'Principal',
    icono:'mdi mdi-gauge',
    submenu:[
      {titulo:'Inicio', url:'/dashboard'},
      {titulo:'Andamios', url:'/progress'},
      {titulo:'Gráficas', url:'/graficas1'},
    ]
  }
];
  constructor() { }

}
