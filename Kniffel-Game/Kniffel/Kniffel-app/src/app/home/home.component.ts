import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LeaderboardService } from '../service/leaderboard/leaderboard.service';
import { GameService } from '../service/game/game.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  public playerName1: string = '';
  public playerName2: string = '';
  public playerName3: string = '';
  public playerName4: string = '';
  public numberofPlayers: number = 0;
  public numberOfPlayerSelected = false;
  public errorMessage: string = '';
  private readonly emptyErrorMessage = '';

  constructor(
    private leaderboardService: LeaderboardService,
    private gameService: GameService,
    public dialog: MatDialog
  ) {}

  public setNumberOfPlayingPlayers(count: number): void {
    this.numberofPlayers = count;
    this.numberOfPlayerSelected = true;
  }

  private startGameConditions(): boolean {
    this.errorMessage = this.leaderboardService.startGameConditions(
      this.numberofPlayers,
      [this.playerName1,
      this.playerName2,
      this.playerName3,
      this.playerName4]
    );
    if (this.errorMessage === this.emptyErrorMessage) {
      return true;
    }
    return false;
  }

  public startGame(): void {
    if (this.startGameConditions()) {
      const playerlist: string[] = [];

      // überarbeiten
      for (let i = 0; i < this.numberofPlayers; i++) {
        playerlist.push((this as any)['playerName' + (i + 1)]);
      }

      this.gameService.startGame(playerlist);
    } else {
      this.errorMessage += " Game couldn't be started!";
    }
  }

  public reset(): void {
    this.numberofPlayers = 0;
    this.numberOfPlayerSelected = false;
    this.playerName1 = '';
    this.playerName2 = '';
    this.playerName3 = '';
    this.playerName4 = '';
  }
}
