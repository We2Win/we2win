import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './whome/guards/admin.guard';


const routes: Routes = [
  {
    path: '',
    loadChildren: 'app/whome/whome.module#WhomeModule'
  },
  {
    path: 'mng',
    loadChildren: 'app/wmanagement/wmanagement.module#WmanagementModule'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [AdminGuard]
})
export class AppRoutingModule {}
