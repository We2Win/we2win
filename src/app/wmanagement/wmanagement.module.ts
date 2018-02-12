import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WmanagementRoutingModule } from './wmanagement-routing.module';
import { WmanagementComponent } from './wmanagement.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FooterComponent } from './shared/footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    WmanagementRoutingModule
  ],
  declarations: [
    WmanagementComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
  ]
})
export class WmanagementModule { }
