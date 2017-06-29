import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BubbleGraphComponent, ForceDirectedGraphComponent } from '../graphs/index';

@NgModule({
  declarations: [
    AppComponent,
    BubbleGraphComponent,
    ForceDirectedGraphComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
