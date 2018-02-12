import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WmanagementRoutingModule } from './wmanagement-routing.module';
import { WmanagementComponent } from './wmanagement.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AccountComponent } from './pages/account/account.component';
import { AnalysisComponent } from './pages/analysis/analysis.component';
import { TrackingComponent } from './pages/tracking/tracking.component';
import { SelectComponent } from './micro/select/select.component';
import { ContentsRegistrationComponent } from './pages/contents/contents-registration.component';
import { ContentsModificationComponent } from './pages/contents/contents-modification.component';
import { ButtonComponent } from './micro/button/button.component';

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
    AccountComponent,
    AnalysisComponent,
    TrackingComponent,
    SelectComponent,
    ContentsRegistrationComponent,
    ContentsModificationComponent,
    ButtonComponent,
  ]
})
export class WmanagementModule { }
