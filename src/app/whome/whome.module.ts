import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhomeRoutingModule } from './whome-routing.module';

import { TitleBannerComponent } from './shared/title-banner/title-banner.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { CardComponent } from './micro/card/card.component';
import { VerticalListComponent } from './micro/vertical-list/vertical-list.component';
import { HorizontalListComponent } from './micro/horizontal-list/horizontal-list.component';
import { RankingListComponent } from './micro/ranking-list/ranking-list.component';
import { WhomeComponent } from './whome.component';
import { ApartmentComponent } from './pages/site/apartment/apartment.component';
import { OfficetelComponent } from './pages/site/officetel/officetel.component';
import { CommercialComponent } from './pages/site/commercial/commercial.component';
import { GroundComponent } from './pages/site/ground/ground.component';
import { NewsComponent } from './pages/info/news/news.component';
import { ReportComponent } from './pages/info/report/report.component';
import { WeeklyComponent } from './pages/info/weekly/weekly.component';
import { MeetingComponent } from './pages/meeting/meeting.component';
import { PersonalComponent } from './pages/portfolio/personal/personal.component';
import { ScrapComponent } from './pages/portfolio/scrap/scrap.component';
import { ApplyComponent } from './pages/recruit/apply/apply.component';
import { EmployeeComponent } from './pages/recruit/employee/employee.component';
import { EmployerComponent } from './pages/recruit/employer/employer.component';
import { FormComponent } from './pages/signup/form/form.component';
import { DoneComponent } from './pages/signup/done/done.component';
import { SelectComponent } from './micro/select/select.component';
import { PageInfoService } from './page-info.service';
import { InfoMainComponent } from './pages/info/info-main/info-main.component';
import { SiteMainComponent } from './pages/site/site-main/site-main.component';
import { ApplyEmployeeComponent } from './pages/recruit/apply-employee/apply-employee.component';
import { ApplyEmployerComponent } from './pages/recruit/apply-employer/apply-employer.component';
import { ButtonComponent } from './micro/button/button.component';
import { PopupComponent } from './micro/popup/popup.component';
import { EmployeeCardComponent } from './micro/employee-card/employee-card.component';
import { EmployerCardComponent } from './micro/employer-card/employer-card.component';
import { SelectFilteringComponent } from './micro/select-filtering/select-filtering.component';
import { MeetingCardComponent } from './micro/meeting-card/meeting-card.component';
import { MeetingDetailComponent } from './pages/meeting/meeting-detail/meeting-detail.component';
import { SiteCardComponent } from './micro/site-card/site-card.component';
import { InfoCardComponent } from './micro/info-card/info-card.component';
import { LevelDirective } from './directive/level.directive';
import { NewsDetailComponent } from './pages/info/news-detail/news-detail.component';
import { DescriptionComponent } from './micro/description/description.component';
import { TableComponent } from './micro/table/table.component';
import { AccountInfoComponent } from './micro/account-info/account-info.component';
import { PolicyComponent } from './pages/signup/policy/policy.component';
import { GroupComponent } from './micro/group/group.component';
import { Error404Component } from './pages/error404/error404.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { AuthService } from './services/auth.service';
import { SocialComponent } from './pages/signup/social/social.component';
import { SocialButtonComponent } from './micro/social-button/social-button.component';
import { UserService } from './services/user.service';
import { InfoDetailComponent } from './pages/info/info-detail/info-detail.component';
import { ChartComponent } from './micro/chart/chart.component';
import { NotifierComponent } from './micro/notifier/notifier.component';
import { InfoService } from './services/info.service';
import { NewsCardComponent } from './micro/news-card/news-card.component';
import { LawComponent } from './pages/info/law/law.component';
import { LawCardComponent } from './micro/law-card/law-card.component';
import { MypostDirective } from './directives/mypost.directive';
import { FbShareService } from './services/fb-share.service';
import { SiteDetailComponent } from './pages/site/site-detail/site-detail.component';
import {
  RankingpostDirective, Rankingpost1Directive,
  Rankingpost2Directive, Rankingpost3Directive
} from './directives/rankingpost.directive';
import { SearchComponent } from './pages/search/search.component';
import { UseComponent } from './pages/policy/use/use.component';
import { PrivacyComponent } from './pages/policy/privacy/privacy.component';
import { AlertComponent } from './micro/alert/alert.component';
import { AlertService } from './services/alert.service';
import { HttpClientModule } from '@angular/common/http';
import { SearchService } from './services/search.service';


export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  imports: [
    CommonModule,
    WhomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    HeaderComponent,
    TitleBannerComponent,
    FooterComponent,
    CardComponent,
    VerticalListComponent,
    HorizontalListComponent,
    RankingListComponent,
    WhomeComponent,
    ApartmentComponent,
    OfficetelComponent,
    CommercialComponent,
    GroundComponent,
    LawComponent,
    NewsComponent,
    ReportComponent,
    WeeklyComponent,
    MeetingComponent,
    PersonalComponent,
    ScrapComponent,
    ApplyComponent,
    EmployeeComponent,
    EmployerComponent,
    FormComponent,
    DoneComponent,
    SelectComponent,
    InfoMainComponent,
    SiteMainComponent,
    ApplyEmployeeComponent,
    ApplyEmployerComponent,
    ButtonComponent,
    PopupComponent,
    EmployeeCardComponent,
    EmployerCardComponent,
    SelectFilteringComponent,
    MeetingCardComponent,
    MeetingDetailComponent,
    SiteCardComponent,
    LevelDirective,
    NewsDetailComponent,
    DescriptionComponent,
    TableComponent,
    AccountInfoComponent,
    PolicyComponent,
    GroupComponent,
    Error404Component,
    LoginComponent,
    SocialComponent,
    SocialButtonComponent,
    InfoDetailComponent,
    ChartComponent,
    NotifierComponent,
    InfoCardComponent,
    NewsCardComponent,
    LawCardComponent,
    MypostDirective,
    SiteDetailComponent,
    RankingpostDirective,
    Rankingpost1Directive,
    Rankingpost2Directive,
    Rankingpost3Directive,
    SearchComponent,
    UseComponent,
    PrivacyComponent,
    AlertComponent,
  ],
  entryComponents: [
    InfoCardComponent,
    NewsCardComponent,
    SiteCardComponent,
    LawCardComponent,
    EmployeeCardComponent,
    EmployerCardComponent,
    MeetingCardComponent,
    ChartComponent
  ],
  providers: [
    PageInfoService,
    AuthService,
    UserService,
    InfoService,
    FbShareService,
    AlertService,
  ]
})
export class WhomeModule {
}
