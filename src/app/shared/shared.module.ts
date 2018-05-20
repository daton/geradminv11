import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { BreadcrumbsComponent } from "./breadcrumbs/breadcrumbs.component";
import { PagenotfoundComponent } from "./pagenotfound/pagenotfound.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [RouterModule, CommonModule],
  declarations: [
    HeaderComponent,
    BreadcrumbsComponent,
    PagenotfoundComponent,
    SidebarComponent
  ],
  exports: [
    HeaderComponent,
    BreadcrumbsComponent,
    PagenotfoundComponent,
    SidebarComponent
  ]
})
export class SharedModule {}
