import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../service/game/game.service';
import { LeaderboardService } from '../service/leaderboard/leaderboard.service';

@Component({
  standalone: true,
  selector: 'app-navbar-cmp',
  templateUrl: 'navbar.component.html',
  styleUrl: 'navbar.component.css',
})
export class NavbarComponent {
  constructor(
    private router: Router,
    private gameService: GameService,
    private leaderboardervice: LeaderboardService,
  ) {}

  public goToHome(): void {
    this.router.navigate(['/']);
    this.gameService.resetGame();
  }

  public goToLeaderboard(): void {
    this.router.navigate(['/leaderboard']);
    this.leaderboardervice.loadleaderboard();
    this.gameService.resetGame();
  }
}
