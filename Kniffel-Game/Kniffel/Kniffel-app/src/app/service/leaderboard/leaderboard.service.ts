import { Injectable } from '@angular/core';
import { Player } from '../../../Models/Player';

@Injectable({
  providedIn: 'root',
})
export class LeaderboardService {
  private leaderboard: { playerName: string; score: number }[] = [];
  private topLeaderboard: { playerName: string; score: number }[] = [];
  private readonly MAX_NAME_LENGTH = 12;
  private readonly EMPTY_NAME = '';

  constructor() {}

  public startGameConditions(numberOfPlayers: number, playerNames: string[]): string {
    this.loadleaderboard();
    for (let i = 0; i < numberOfPlayers; i++) {
      if (playerNames[i] === this.EMPTY_NAME) 
      {
        return 'Please enter a name for Player ' + (i+1) + '!';
      }
      if (playerNames[i].length > this.MAX_NAME_LENGTH) {
        return "Name of Player " + (i+1) + " is too long. Total length can't exceed 12 characters.";
      }
    }

    for (let i = 0; i < numberOfPlayers-1; i++) {
      for (let j = i+1; j < numberOfPlayers; j++) {
        if (playerNames[i] === playerNames[j]) {
          return 'Player ' + (i+1) + ' and Player ' + (j+1) + ' have the same name!'
        }
      }
    }
    return '';
  }

  public getPlayerByName(playerName: string): {
    playerName: string;
    score: number;
  } {
    return this.leaderboard.find((entry) => entry.playerName === playerName)!;
  }

  private isNameInLeaderboard(playerName: string): boolean {
    return this.leaderboard.some((entry) => entry.playerName === playerName);
  }

  public isPlayedPlayerInTopLeaderboard(playerName: string): boolean {
    return this.topLeaderboard.some((entry) => entry.playerName === playerName)
  }

  public getPlayerPosition(playerName: string): number {
    return (
      this.leaderboard.findIndex((entry) => entry.playerName === playerName)
    );
  }

  public addScore(playerName: string, playerScore: number): void {
    if (this.isNameInLeaderboard(playerName)) {
      let playerPositionInList = this.getPlayerPosition(playerName);
      if (this.leaderboard[playerPositionInList].score < playerScore) {
        this.leaderboard[playerPositionInList].score = playerScore;
      }
    }
    else {
      this.leaderboard.push({
      playerName: playerName,
      score: playerScore,
      });
    }
    this.leaderboard = this.leaderboard.sort((a, b) => b.score - a.score);
    this.updateTopLeaderboard();
    localStorage.setItem('leaderboard', JSON.stringify(this.leaderboard));
  }

  private updateTopLeaderboard(): void {
    this.topLeaderboard = this.leaderboard.slice(0, 10);
  }

  public getTopLeaderboard(): { playerName: string; score: number }[] {
    this.updateTopLeaderboard();
    return this.topLeaderboard;
  }

  public loadleaderboard(): void {
    const STORED_LEADERBOARD = localStorage.getItem('leaderboard');
    if (STORED_LEADERBOARD) {
      this.leaderboard = JSON.parse(STORED_LEADERBOARD);
      this.updateTopLeaderboard();
    } else {
      console.log('No leaderboard found in local storage');
    }
  }
}
