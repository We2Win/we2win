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
import { ContentsRegistrationComponent } from './pages/contents/contents-registration/contents-registration.component';
import { ContentsModificationComponent } from './pages/contents/contents-modification/contents-modification.component';
import { ButtonComponent } from './micro/button/button.component';
import { AnalysisUserComponent } from './pages/analysis/analysis-user/analysis-user.component';
import { AnalysisContentsComponent } from './pages/analysis/analysis-contents/analysis-contents.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { PopupComponent } from './micro/popup/popup.component';
import { AccountRecordComponent } from './micro/account-record/account-record.component';
import { TableComponent } from './micro/table/table.component';
import { DateInputComponent } from './micro/date-input/date-input.component';
import { ListInputComponent } from './micro/list-input/list-input.component';
import { ChartComponent } from './micro/chart/chart.component';
import { AnalysisUserRecordComponent } from './micro/analysis-user-record/analysis-user-record.component';
import { AnalysisContentsRecordComponent } from './micro/analysis-contents-record/analysis-contents-record.component';

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
    AnalysisUserComponent,
    AnalysisContentsComponent,
    NotificationComponent,
    SettingsComponent,
    PopupComponent,
    AccountRecordComponent,
    TableComponent,
    DateInputComponent,
    ListInputComponent,
    ChartComponent,
    AnalysisUserRecordComponent,
    AnalysisContentsRecordComponent,
  ]
})
export class WmanagementModule { }
