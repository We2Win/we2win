import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WmanagementComponent } from './wmanagement.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

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
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WmanagementRoutingModule { }
