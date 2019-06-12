import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule } from '@angular/forms'
// tslint:disable-next-line:max-line-length
import {
  MatIconModule,
  MatListModule,
  MatProgressBarModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatToolbarModule,
} from '@angular/material'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { LayoutModule } from './layout/layout.module'
import { NotFoundComponent } from './screens/not-found/not-found.component'

@NgModule({
  imports: [
    FlexLayoutModule,
    LayoutModule,
    MatSnackBarModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatIconModule,
    MatListModule,
  ],
  providers: [],
  declarations: [AppComponent, NotFoundComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
