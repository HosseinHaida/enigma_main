import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

//  Routing
import { AppRoutingModule } from './app-routing.module';

//  Components
import { AppComponent } from './app.component';
import { NavbarsComponent } from './home/navbars/navbars.component';
import { HomeComponent } from './home/home.component';
import { ChallengesComponent } from './home/challenges/challenges.component';
import { ChallengeComponent } from './home/challenges/challenge/challenge.component';

//  Services
import { MainService } from './services/main.service';
import { MainResolver } from './resolvers/main.resolver';
import { PlayersComponent } from './home/challenges/challenge/players/players.component';
import { MainComponent } from './home/challenges/challenge/main/main.component';
import { ShareComponent } from './home/challenges/challenge/shared/share/share.component';
import { ExtrasComponent } from './home/challenges/challenge/extras/extras.component';
import { ScreenLayoutService } from './services/screen-layout.service';
import { CountdownComponent } from './home/challenges/challenge/shared/countdown/countdown.component';
import { DetailsComponent } from './home/challenges/challenge/shared/details/details.component';
import { LoginComponent } from './login/login.component';

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
    LoginComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [MainService, ScreenLayoutService, MainResolver],
  bootstrap: [AppComponent]
})
export class AppModule {}
