import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { DbConnectService } from './db-connect.service';
import { HttpClientModule } from '@angular/common/http';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';

@NgModule({
  declarations: [
    AppComponent,
    FileSelectDirective,
    FileDropDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [DbConnectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
