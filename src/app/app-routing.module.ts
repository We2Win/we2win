import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: 'app/whome/whome.module#WhomeModule'
  },
  {
    path: 'mng',
    loadChildren: 'app/wmanagement/wmanagement.module#WmanagementModule'
  },
  {
    path: 'wadmin',
    loadChildren: 'app/wadmin/wadmin.module#WadminModule'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
