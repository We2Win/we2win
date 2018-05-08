import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Router, RoutesRecognized } from '@angular/router';

import { HeaderComponent } from './shared/header/header.component';
import { WhomeComponent } from './whome.component';
import { LawComponent } from './pages/info/law/law.component';
import { ReportComponent } from './pages/info/report/report.component';
import { WeeklyComponent } from './pages/info/weekly/weekly.component';
import { NewsComponent } from './pages/info/news/news.component';
import { ApartmentComponent } from './pages/site/apartment/apartment.component';
import { CommercialComponent } from './pages/site/commercial/commercial.component';
import { GroundComponent } from './pages/site/ground/ground.component';
import { OfficetelComponent } from './pages/site/officetel/officetel.component';
import { EmployerComponent } from './pages/recruit/employer/employer.component';
import { EmployeeComponent } from './pages/recruit/employee/employee.component';
import { ApplyComponent } from './pages/recruit/apply/apply.component';
import { MeetingComponent } from './pages/meeting/meeting.component';
import { PersonalComponent } from './pages/portfolio/personal/personal.component';
import { ScrapComponent } from './pages/portfolio/scrap/scrap.component';
import { PageInfoService } from './page-info.service';
import { InfoMainComponent } from './pages/info/info-main/info-main.component';
import { SiteMainComponent } from './pages/site/site-main/site-main.component';
import { ApplyEmployerComponent } from './pages/recruit/apply-employer/apply-employer.component';
import { ApplyEmployeeComponent } from './pages/recruit/apply-employee/apply-employee.component';
import { MeetingDetailComponent } from './pages/meeting/meeting-detail/meeting-detail.component';
import { DoneComponent } from './pages/signup/done/done.component';
import { PolicyComponent } from './pages/signup/policy/policy.component';
import { FormComponent } from './pages/signup/form/form.component';
import { Error404Component } from './pages/error404/error404.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { SocialComponent } from './pages/signup/social/social.component';
import { InfoDetailComponent } from './pages/info/info-detail/info-detail.component';
import { NewsDetailComponent } from './pages/info/news-detail/news-detail.component';
import { JwtHelper } from 'angular2-jwt';
import { SiteDetailComponent } from './pages/site/site-detail/site-detail.component';
import { UseComponent } from './pages/policy/use/use.component';
import { PrivacyComponent } from './pages/policy/privacy/privacy.component';

const routes: Routes = [
  {
    path: '',
    component: WhomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'info',
        pathMatch: 'full'
      },
      {
        path: 'info',
        children: [
          {
            path: '',
            component: InfoMainComponent
          },
          {
            path: 'report',
            component: ReportComponent,
          },
          {
            path: 'report/:id',
            component: InfoDetailComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'news',
            component: NewsComponent,
          },
          {
            path: 'news/:id',
            component: NewsDetailComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'law',
            component: LawComponent
          },
          {
            path: 'weekly',
            component: WeeklyComponent
          },
        ]
      },
      {
        path: 'site',
        children: [
          {
            path: '',
            component: SiteMainComponent
          },
          {
            path: 'apartment',
            component: ApartmentComponent
          },
          {
            path: 'commercial',
            component: CommercialComponent
          },
          {
            path: 'ground',
            component: GroundComponent
          },
          {
            path: 'officetel',
            component: OfficetelComponent
          },
          {
            path: 'site-detail/:id',
            component: SiteDetailComponent,
            canActivate: [AuthGuard],
          }
        ]
      },
      {
        path: 'recruit',
        children: [
          {
            path: '',
            component: EmployerComponent
          },
          {
            path: 'employer',
            component: EmployerComponent
          },
          {
            path: 'employee',
            component: EmployeeComponent
          },
          {
            path: 'apply',
            component: ApplyComponent
          },
          {
            path: 'apply-employer',
            component: ApplyEmployerComponent
          },
          {
            path: 'apply-employee',
            component: ApplyEmployeeComponent
          }
        ]
      },
      {
        path: 'meeting',
        children: [
          {
            path: '',
            component: MeetingComponent
          },
          {
            path: 'detail/:id',
            component: MeetingDetailComponent
          }
        ]
      },
      {
        path: 'portfolio',
        children: [
          {
            path: '',
            component: ScrapComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'personal',
            component: PersonalComponent,
            canActivate: [AuthGuard],
          }
        ]
      },
    ]
  },
  {
    path: 'signup',
    component: WhomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'policy',
        pathMatch: 'full'
      },
      {
        path: 'policy',
        component: PolicyComponent
      },
      {
        path: 'social',
        component: SocialComponent
      },
      {
        path: 'form',
        component: FormComponent
      },
      {
        path: 'done',
        component: DoneComponent
      }
    ]
  },
  {
    path: 'login',
    component: WhomeComponent,
    children: [
      {
        path: '',
        component: LoginComponent
      }
    ]
  },
  {
    path: 'policy',
    component: WhomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'use',
        pathMatch: 'full'
      },
      {
        path: 'use',
        component: UseComponent
      },
      {
        path: 'privacy',
        component: PrivacyComponent
      }
    ]
  },
  // temporary state
  {
    path: 'mng',
    loadChildren: 'app/wmanagement/wmanagement.module#WmanagementModule'
  },
  {
    path: '**',
    component: WhomeComponent,
    children: [
      {
        path: '',
        component: Error404Component
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    PageInfoService,
    AuthGuard,
    JwtHelper,
  ]
})
export class WhomeRoutingModule {
  constructor(private pageInfoService: PageInfoService, router: Router) {
    // router.events.subscribe(event => {
    //   if (event instanceof RoutesRecognized) {
    //     console.log(event, this.dataset);
    //     this.pageInfoService.getTitleBannerData(this.dataset);
    //   }
    // });
  }
}

