import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {
  NetworkGraphComponent,
  WordCloudComponent
} from '../data-visualizations/index';

@NgModule({
  declarations: [
    AppComponent,
    NetworkGraphComponent,
    WordCloudComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
