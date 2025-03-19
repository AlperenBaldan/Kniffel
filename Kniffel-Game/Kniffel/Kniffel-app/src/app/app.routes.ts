import { Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { AppComponent } from './app.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { HomeComponent } from './home/home.component';


const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home Page'
    },
    {
        path: 'game',
        component: GameComponent,
        title: 'Playing-Kniffel'
    },
    {
        path: 'leaderboard',
        component: LeaderboardComponent,
        title: 'Leaderboard'
    }


];

export default routeConfig;