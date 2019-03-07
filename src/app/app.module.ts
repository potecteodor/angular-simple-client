import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { AngularFireModule } from '@angular/fire'
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth'
import { environment } from '../environments/environment'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { AppSharedModule } from './modules/app-shared.module'
import { LeftNavigationComponent } from './navigation/left-navigation/left-navigation.component'
import { TopNavigationComponent } from './navigation/top-navigation/top-navigation.component'
import { DashboardModule } from './screens/dashboard/dashboard.module'
import { NotFoundComponent } from './screens/not-found/not-found.component'
import { TestareaModule } from './testarea/testarea.module'

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // app modules
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseCfg),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AppSharedModule,
    // wired modules
    DashboardModule,
    TestareaModule,
  ],
  providers: [AngularFireAuth],
  declarations: [
    AppComponent,
    NotFoundComponent,
    TopNavigationComponent,
    LeftNavigationComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
