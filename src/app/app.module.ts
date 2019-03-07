import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { AppSharedModule } from './modules/app-shared.module'
import { LeftNavigationComponent } from './navigation/left-navigation/left-navigation.component'
import { TopNavigationComponent } from './navigation/top-navigation/top-navigation.component'
import { DashboardModule } from './screens/dashboard/dashboard.module'
import { NotFoundComponent } from './screens/not-found/not-found.component'

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // app modules
    AppRoutingModule,
    AppSharedModule,
    // wired modules
    DashboardModule,
  ],
  providers: [],
  declarations: [
    AppComponent,
    NotFoundComponent,
    TopNavigationComponent,
    LeftNavigationComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
