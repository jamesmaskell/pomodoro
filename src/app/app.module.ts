import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { IncrementButtonComponent } from './increment-button/increment-button.component';
import { CountdownPieComponent } from './countdown-pie/countdown-pie.component';

@NgModule({
  declarations: [
    AppComponent,
    IncrementButtonComponent,
    CountdownPieComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
