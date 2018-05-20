import { Component, OnInit } from '@angular/core';
declare function init_plugins();
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();
  }

  salir(){
    location.reload();console.log("ha asalir");
  }

}
