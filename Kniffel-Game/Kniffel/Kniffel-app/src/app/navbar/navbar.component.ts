import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../service/game/game.service';
import { LeaderboardService } from '../service/leaderboard/leaderboard.service';
import { ResponsiveService } from '../service/responsive/responsive.service';
import { NgClass } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  standalone: true,
  selector: 'app-navbar-cmp',
  templateUrl: 'navbar.component.html',
  styleUrl: 'navbar.component.css',
  imports: [NgClass],
})
export class NavbarComponent {
  constructor(
    private router: Router,
    private gameService: GameService,
    private leaderboardervice: LeaderboardService,
    private breakpointService: BreakpointObserver
  ) {}

  isScreenWidthNormal: boolean = true;

  ngOnInit() {
    this.breakpointService
      .observe([Breakpoints.Small, Breakpoints.XSmall])
        .subscribe((result) => {
          this.isScreenWidthNormal = true;
          if (result.matches) {
            this.isScreenWidthNormal = false;
          }
          else{
            this.isScreenWidthNormal = true;
          }
        })
  }

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
