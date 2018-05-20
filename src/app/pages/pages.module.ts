import { NgModule } from "@angular/core";
import {FormsModule} from '@angular/forms' 
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LoginComponent } from "../login/login.component";
import { RegisterComponent } from "../login/register.component";
import { PagesComponent } from "./pages.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { SharedModule } from "../shared/shared.module";
import { PAGES_ROUTES } from "./pages.routes";
import { IncrementadorComponent } from "../components/incrementador/incrementador.component";
import { ChartsModule } from 'ng2-charts';
import { GraficoDonaComponent } from "../components/grafico-dona/grafico-dona.component";
import { AccountSettingsComponent } from './account-settings/account-settings.component';



@NgModule({
  declarations: [PagesComponent,Graficas1Component,  DashboardComponent, ProgressComponent, IncrementadorComponent, GraficoDonaComponent, AccountSettingsComponent],
  exports: [PagesComponent,Graficas1Component,  DashboardComponent, ProgressComponent],
  imports:[SharedModule, PAGES_ROUTES, FormsModule, ChartsModule],
  providers:[]
})
export class PagesModule {}
