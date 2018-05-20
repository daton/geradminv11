import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';



//Rutas
import { AppRoutes } from './app.routes';

import { RegisterComponent } from './login/register.component';
import { PagesModule } from './pages/pages.module';
import { IncrementadorComponent } from './components/incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';
import { GraficoDonaComponent } from './components/grafico-dona/grafico-dona.component';
import { ServiceModule } from './services/service.module';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent

   
  ],
  imports: [BrowserModule, AppRoutes, PagesModule, FormsModule, ServiceModule ,  HttpModule,
    HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
