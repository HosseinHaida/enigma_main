import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ChallengesComponent } from './home/challenges/challenges.component';
import { ChallengeComponent } from './home/challenges/challenge/challenge.component';
import { MainResolver } from './resolvers/main.resolver';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './services/auth-guard.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileComponent } from './home/profile/profile.component';
import { MissionsComponent } from './home/challenges/missions/missions.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    resolve: {
      mainData: MainResolver
    },
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'challenges', component: ChallengesComponent },
      { path: 'challenges/:id', component: ChallengeComponent },
      { path: 'challenges/:id/missions', component: MissionsComponent }
    ],
    canActivate: [AuthGuard]
  },
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
