import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WmanagementComponent } from './wmanagement.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AccountComponent } from './pages/account/account.component';
import { AnalysisComponent } from './pages/analysis/analysis.component';
import { TrackingComponent } from './pages/tracking/tracking.component';
import { ContentsRegistrationComponent } from './pages/contents/contents-registration.component';
import { ContentsModificationComponent } from './pages/contents/contents-modification.component';

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
            component: AnalysisComponent
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
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WmanagementRoutingModule { }
