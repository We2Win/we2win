import { NgModule } from '@angular/core';
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
import { LawComponent } from './pages/info/law/law.component';
import { NewsComponent } from './pages/info/news/news.component';
import { ReportComponent } from './pages/info/report/report.component';
import { WeeklyComponent } from './pages/info/weekly/weekly.component';
import { DetailComponent } from './pages/meeting/detail/detail.component';
import { MeetingComponent } from './pages/meeting/meeting/meeting.component';
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
import { NamecardComponent } from './micro/namecard/namecard.component';


@NgModule({
  imports: [
    CommonModule,
    WhomeRoutingModule
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
    DetailComponent,
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
    NamecardComponent,
  ],
  providers: [ PageInfoService ]
})
export class WhomeModule {
}
