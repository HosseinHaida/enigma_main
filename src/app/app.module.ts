import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

//  Routing
import { AppRoutingModule } from './app-routing.module';

//  Components
import { AppComponent } from './app.component';
import { NavbarsComponent } from './home/navbars/navbars.component';
import { HomeComponent } from './home/home.component';
import { ChallengesComponent } from './home/challenges/challenges.component';
import { ChallengeComponent } from './home/challenges/challenge/challenge.component';

//  Challenge Component Childs
import { PlayersComponent } from './home/challenges/challenge/players/players.component';
import { MainComponent } from './home/challenges/challenge/main/main.component';
import { ShareComponent } from './home/challenges/challenge/shared/share/share.component';
import { ExtrasComponent } from './home/challenges/challenge/extras/extras.component';
import { CountdownComponent } from './home/challenges/challenge/shared/countdown/countdown.component';
import { DetailsComponent } from './home/challenges/challenge/shared/details/details.component';
import { LoginComponent } from './login/login.component';

//  Seting up Firebase
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

//  Resolver
import { MainResolver } from './resolvers/main.resolver';

//  Interceptors
import { AuthTokenHttpInterceptorProvider } from './shared/interceptors/auth-token.interceptor';

//  Loading Bar
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
// for Core import:
import { LoadingBarModule } from '@ngx-loading-bar/core';

//  Services
import { UserLogService } from './services/user-log.service';
import { MainService } from './services/main.service';
import { ScreenLayoutService } from './services/screen-layout.service';
import { AuthGuard } from './services/auth-guard.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarsComponent,
    ChallengeComponent,
    ChallengesComponent,
    PlayersComponent,
    MainComponent,
    ShareComponent,
    ExtrasComponent,
    CountdownComponent,
    DetailsComponent,
    LoginComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    LoadingBarHttpClientModule,
    LoadingBarModule,
    AngularFireModule.initializeApp(
      environment.firebaseConfig,
      'enigma-ng-app'
    ),
    AngularFireAuthModule
  ],

  providers: [
    AuthGuard,
    AuthTokenHttpInterceptorProvider,
    MainService,
    ScreenLayoutService,
    MainResolver,
    UserLogService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
