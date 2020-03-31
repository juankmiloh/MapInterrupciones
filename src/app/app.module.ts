import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSliderModule } from '@angular/material/slider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatBottomSheetModule, MAT_BOTTOM_SHEET_DEFAULT_OPTIONS } from '@angular/material/bottom-sheet';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MapComponent } from './views/map/map.component';
import { MapOptionsComponent } from './views/map/map-options/map-options.component';
import { MatFabMenuModule } from '@angular-material-extensions/fab-menu';
import { MatMenuModule } from '@angular/material/menu';
import { Angulartics2Module } from 'angulartics2';
import { MarkdownModule } from 'ngx-markdown';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TarifaritoComponent } from './views/tarifarito/tarifarito.component';
import { ProcesosDIEGComponent } from './views/procesos-dieg/procesos-dieg.component';
import { MapPQRSComponent } from './views/map-pqrs/map-pqrs.component';
import { HomeComponent } from './views/home/home.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  IgxButtonModule, IgxCardModule, IgxCarouselModule,
  IgxIconModule, IgxInputGroupModule, IgxLayoutModule,
  IgxNavbarModule, IgxNavigationDrawerModule, IgxRippleModule, IgxSelectModule
} from 'igniteui-angular';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MapOptionsComponent,
    TarifaritoComponent,
    ProcesosDIEGComponent,
    MapPQRSComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSliderModule,
    MatGridListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDividerModule,
    MatBottomSheetModule,
    MatFabMenuModule,
    Angulartics2Module,
    MarkdownModule,
    FlexLayoutModule,
    HttpClientModule,
    MatCardModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatProgressBarModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    IgxInputGroupModule, IgxLayoutModule,
    IgxNavbarModule, IgxNavigationDrawerModule, IgxRippleModule,
    IgxCarouselModule,
    IgxIconModule,
    IgxSelectModule,
    IgxButtonModule,
    IgxCardModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [
    // { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    // {provide: MAT_BOTTOM_SHEET_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    MatIconRegistry
  ],
  schemas: [NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {
}
