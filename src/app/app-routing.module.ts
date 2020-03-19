import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './map/map.component';
// import { FirstPageComponent } from './first-page/first-page.component';

const routes: Routes = [
  //{ path: '', component: FirstPageComponent },
  { path: 'map-page', component: MapComponent },
  //{ path: '',   redirectTo: '/first-page', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
