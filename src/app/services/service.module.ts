import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SettingsService, SharedService,SidebarService} from './service.index'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers:[SidebarService,SettingsService,SharedService]
})
export class ServiceModule {
  
 }
