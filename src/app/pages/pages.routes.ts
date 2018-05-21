import {RouterModule, Routes } from "@angular/router";
import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { ExamensitosComponent } from "./examensitos/examensitos.component";
import { GruposComponent } from "./grupos/grupos.component";

const pageRoutes:Routes=[
    {
        path:'', 
        component:PagesComponent,
        children:[
             {path:'dashboard',component:DashboardComponent},
             {path:'progress',component:ProgressComponent},
             {path:'graficas1', component:Graficas1Component}, 
             {path:'account-settings', component:AccountSettingsComponent}, 
             {path:'examensitos', component:ExamensitosComponent}, 
             {path:'grupos', component:GruposComponent}, 
             {path:'', redirectTo:'dashboard',pathMatch:"full"},
        ]
    }]

    export const PAGES_ROUTES =RouterModule.forChild(pageRoutes)