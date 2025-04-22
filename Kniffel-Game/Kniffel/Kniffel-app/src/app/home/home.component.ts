import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LeaderboardService } from '../service/leaderboard/leaderboard.service';
import { GameService } from '../service/game/game.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { ContinuableGame } from '../interfaces/continuableGame';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

  public continuableGames: ContinuableGame[] = [];
  public DatabaseOfContinuableGames: ContinuableGame[] = [
    {
      players: ['P1', 'P2'],
      round: 7,
      lastPlayedTime: '10.10.2024 19:20:10'
    },
    {
      players: ['P3', 'P4', 'P5'],
      round: 6,
      lastPlayedTime: '09.10.2024 18:15:30'
    },
    {
      players: ['P1', 'P4'],
      round: 3,
      lastPlayedTime: '11.10.2024 12:00:00'
    },
    {
      players: ['P2', 'P5'],
      round: 2,
      lastPlayedTime: '08.10.2024 17:45:25'
    },
    {
      players: ['Alice', 'Bob'],
      round: 5,
      lastPlayedTime: '12.10.2024 13:35:00'
    },
    {
      players: ['Bob', 'Charlie', 'P3'],
      round: 4,
      lastPlayedTime: '13.10.2024 15:10:10'
    },
    {
      players: ['Dana', 'Eve', 'P1'],
      round: 6,
      lastPlayedTime: '14.10.2024 09:55:00'
    },
    {
      players: ['Grace', 'Bob', 'P2'],
      round: 1,
      lastPlayedTime: '07.10.2024 19:20:30'
    }
  ];
  
  


  public playerName1: string = '';
  public playerName2: string = '';
  public playerName3: string = '';
  public playerName4: string = '';
  public playerNamesList: string[] = [];
  public numberOfPlayers: number = 0;
  public numberOfPlayerSelected = false;
  public errorMessage: string = '';

  public readonly HOME_SCREEN_VIEW: string = 'homeScreen'
  public readonly NEW_GAME_PLAYER_NAMES_VIEW: string = 'NewGamePlayerNames'
  public readonly CONTINUE_GAME_VIEW: string = 'continueGame'
  public displayView: string = this.HOME_SCREEN_VIEW;

  private readonly EMPTY_ERROR_MESSAGE = '';
  constructor(
    private leaderboardService: LeaderboardService,
    private gameService: GameService,
    public dialog: MatDialog
  ) {}

  public setNumberOfPlayingPlayers(count: number): void {
    this.numberOfPlayers = count;
    this.numberOfPlayerSelected = true;
    this.displayView = this.NEW_GAME_PLAYER_NAMES_VIEW;
  }

  public changeDisplayViewToContinueGame(): void {
    this.displayView = this.CONTINUE_GAME_VIEW;
  }

  public search(playerName: string): void {
    this.errorMessage = '';
    this.continuableGames = this.loadGames(playerName);
    if (playerName === '') {
      this.errorMessage = 'Please enter an name!';
    }
    else if (this.continuableGames.length === 0) {
      this.errorMessage = 'No ongoing games found!';
    }
  }

  private loadGames(playername: string): ContinuableGame[] {
    return this.DatabaseOfContinuableGames.filter(game =>
      game.players.includes(playername)
    );
  }

  private startGameConditions(): boolean {
    let players: string[] = [];
    for (let index = 0; index < this.numberOfPlayers; index++) {
      players.push((this as any)['playerName' + (index + 1)]);
      
    }
    this.errorMessage = this.leaderboardService.startGameConditions(
      this.numberOfPlayers,
      players
    );
    if (this.errorMessage === this.EMPTY_ERROR_MESSAGE) {
      return true;
    }
    return false;
  }

  public startGame(): void {
    if (this.startGameConditions()) {
      let playerlist: string[] = [];

      for (let i = 0; i < this.numberOfPlayers; i++) {
        playerlist.push((this as any)['playerName' + (i + 1)]);
      }

      this.gameService.startGame(playerlist);
    } else {
      this.errorMessage += " Game couldn't be started!";
    }
  }

  public gotToHomeDisplay(): void {
    this.displayView = this.HOME_SCREEN_VIEW;
  }

  public reset(): void {
    this.numberOfPlayers = 0;
    this.numberOfPlayerSelected = false;
    this.playerName1 = '';
    this.playerName2 = '';
    this.playerName3 = '';
    this.playerName4 = '';
    this.errorMessage = '';
    this.displayView = this.HOME_SCREEN_VIEW;
    this.continuableGames = [];
  }
}
