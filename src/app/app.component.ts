import { Component } from '@angular/core';
import { SettingsService } from './services/service.index';
import {Router} from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(public _ajustes:SettingsService, private router: Router){
this.router.navigate(['/login']),{skipLocationChange:true}
  }
}
