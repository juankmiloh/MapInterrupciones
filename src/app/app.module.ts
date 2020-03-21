import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSliderModule } from '@angular/material/slider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { MapComponent, MapOptionsComponent } from './map/map.component';
import { MatFabMenuModule } from '@angular-material-extensions/fab-menu';
import {MatMenuModule} from '@angular/material/menu';
import { Angulartics2Module } from 'angulartics2';
import { MarkdownModule } from 'ngx-markdown';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MapOptionsComponent
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
    MatMenuModule
  ],
  providers: [
    // { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
