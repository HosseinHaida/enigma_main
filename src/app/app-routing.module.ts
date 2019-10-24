import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ChallengesComponent } from './home/challenges/challenges.component';
import { ChallengeComponent } from './home/challenges/challenge/challenge.component';
import { MainResolver } from './resolvers/main.resolver';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    resolve: {
      mainData: MainResolver
    },
    children: [
      {
        path: 'challenges',
        component: ChallengesComponent
      },
      { path: 'challenges/:id', component: ChallengeComponent }
    ]
  },
  { path: '', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
