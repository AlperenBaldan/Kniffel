import { Injectable } from '@angular/core';
import { Player } from '../../../../Models/Player';

@Injectable({
  providedIn: 'root',
})
export class LeaderboardService {
  private leaderboard: { playerName: string; score: number }[] = [];
  private topLeaderboard: { playerName: string; score: number }[] = [];

  constructor() {}

  public startGameConditions(
    numberofPlayers: number,
    playerName1: string,
    playerName2: string,
    playerName3: string,
    playerName4: string
  ): string {
    this.loadleaderboard();
    switch (numberofPlayers) {
      case 0:
        return 'Please select the number of players!';
      case 1:
        if (playerName1 === '') {
          return 'Please enter a name for Player 1!';
        }
        if (this.isNameInLeaderboard(playerName1)) {
          return 'Player with name ' + playerName1 + ' already exists!';
        }
        break;
      case 2:
        if (playerName1 === '' || playerName2 === '') {
          return 'Please enter a name for all the players!';
        }
        if (this.isNameInLeaderboard(playerName1)) {
          return 'Player with name ' + playerName1 + ' already exists!';
        } else if (this.isNameInLeaderboard(playerName2)) {
          return 'Player with name ' + playerName2 + ' already exists!';
        } else if (playerName1 === playerName2) {
          return "Players cant't have the same name.";
        }
        break;
      case 3:
        if (playerName1 === '' || playerName2 === '' || playerName3 === '') {
          return 'Please enter a name for all the players!';
        }
        if (this.isNameInLeaderboard(playerName1)) {
          return 'Player with name ' + playerName1 + ' already exists!';
        } else if (this.isNameInLeaderboard(playerName2)) {
          return 'Player with name ' + playerName2 + ' already exists!';
        } else if (this.isNameInLeaderboard(playerName3)) {
          return 'Player with name ' + playerName3 + ' already exists!';
        } else if (
          playerName1 === playerName2 ||
          playerName1 === playerName3 ||
          playerName2 === playerName3
        ) {
          return "Players cant't have the same name.";
        }
        break;
      case 4:
        if (
          playerName1 === '' ||
          playerName2 === '' ||
          playerName3 === '' ||
          playerName4 === ''
        ) {
          return 'Please enter a name for all the players!';
        }
        if (this.isNameInLeaderboard(playerName1)) {
          return 'Player with name ' + playerName1 + ' already exists!';
        } else if (this.isNameInLeaderboard(playerName2)) {
          return 'Player with name ' + playerName2 + ' already exists!';
        } else if (this.isNameInLeaderboard(playerName3)) {
          return 'Player with name ' + playerName3 + ' already exists!';
        } else if (this.isNameInLeaderboard(playerName4)) {
          return 'Player with name ' + playerName4 + ' already exists!';
        } else if (
          playerName1 === playerName2 ||
          playerName1 === playerName3 ||
          playerName1 === playerName4 ||
          playerName2 === playerName3 ||
          playerName2 === playerName4 ||
          playerName3 === playerName4
        ) {
          return "Players can't have the same name.";
        }
        break;
    }
    if (
      playerName1.length > 12 ||
      playerName2.length > 12 ||
      playerName3.length > 12 ||
      playerName4.length > 12
    ) {
      return "Player name is too long. Total length can't exceed 12 characters.";
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
      this.leaderboard.findIndex((entry) => entry.playerName === playerName) + 1
    );
  }

  public addScore(playerName: string, score: number): void {
    this.leaderboard.push({
      playerName: playerName,
      score: score,
    });
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
    const storedLeaderboard = localStorage.getItem('leaderboard');
    if (storedLeaderboard) {
      this.leaderboard = JSON.parse(storedLeaderboard);
      this.updateTopLeaderboard();
    } else {
      console.log('No leaderboard found in local storage');
    }
  }
}
