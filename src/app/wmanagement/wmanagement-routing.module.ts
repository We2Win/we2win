import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WmanagementComponent } from './wmanagement.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AccountComponent } from './pages/account/account.component';
import { AnalysisComponent } from './pages/analysis/analysis.component';
import { TrackingComponent } from './pages/tracking/tracking.component';
import { ContentsRegistrationComponent } from './pages/contents/contents-registration/contents-registration.component';
import { ContentsModificationComponent } from './pages/contents/contents-modification/contents-modification.component';
import { AnalysisUserComponent } from './pages/analysis/analysis-user/analysis-user.component';
import { AnalysisContentsComponent } from './pages/analysis/analysis-contents/analysis-contents.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { Error404Component } from './pages/error404/error404.component';

const routes: Routes = [
  {
    path: '',
    component: WmanagementComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        children: [
          {
            path: '',
            component: DashboardComponent
          }
        ]
      },
      {
        path: 'account',
        children: [
          {
            path: '',
            component: AccountComponent
          },
        ]
      },
      {
        path: 'contents',
        children: [
          {
            path: '',
            redirectTo: 'register',
            pathMatch: 'full'
          },
          {
            path: 'register',
            component: ContentsRegistrationComponent,
          },
          {
            path: 'modify',
            component: ContentsModificationComponent
          }
        ]
      },
      {
        path: 'analysis',
        children: [
          {
            path: '',
            redirectTo: 'user',
            pathMatch: 'full'
          },
          {
            path: 'user',
            component: AnalysisUserComponent
          },
          {
            path: 'contents',
            component: AnalysisContentsComponent
          }
        ]
      },
      {
        path: 'tracking',
        children: [
          {
            path: '',
            component: TrackingComponent
          }
        ]
      },
      {
        path: 'settings',
        children: [
          {
            path: '',
            component: SettingsComponent
          }
        ]
      },
      {
        path: 'notification',
        children: [
          {
            path: '',
            component: NotificationComponent
          }
        ]
      }
    ]
  },
  {
    path: '**',
    component: Error404Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WmanagementRoutingModule { }
