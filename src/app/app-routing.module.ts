import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { MapComponent } from './views/map/map.component';
import { MapPQRSComponent } from './views/map-pqrs/map-pqrs.component';
import { TarifaritoComponent } from './views/tarifarito/tarifarito.component';
import { ProcesosDIEGComponent } from './views/procesos-dieg/procesos-dieg.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'map-PQRS', component: MapPQRSComponent },
  { path: 'map-page', component: MapComponent },
  { path: 'tarifarito', component: TarifaritoComponent },
  { path: 'procesos-DIEG', component: ProcesosDIEGComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
