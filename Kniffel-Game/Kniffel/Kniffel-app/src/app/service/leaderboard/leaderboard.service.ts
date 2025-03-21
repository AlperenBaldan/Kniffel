import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LeaderboardService {
  private leaderboard: { playerName: string; score: number }[] = [];
  private topLeaderboard: { playerName: string; score: number }[] = [];
  private readonly maxNameLength = 12;
  private readonly emptyname = '';

  constructor() {}

  public startGameConditions(
    numberofPlayers: number,
    playerNames: string[]
  ): string {
    this.loadleaderboard();
    for (let i = 0; i < playerNames.length; i++) {
      if (playerNames[i] === this.emptyname) 
      {
        return 'Please enter a name for Player ' + i + '!';
      }
      if (this.isNameInLeaderboard(playerNames[i])) {
        return 'Player with name ' + playerNames[i] + ' already exists!';
      }
      playerNames.
    }


    switch (numberofPlayers) {
  
      case 2:
       if (playerName1 === playerName2) {
          return "Players cant't have the same name.";
        }
        break;
      case 3:
        if (
          playerName1 === playerName2 ||
          playerName1 === playerName3 ||
          playerName2 === playerName3
        ) {
          return "Players cant't have the same name.";
        }
        break;
      case 4:
        if (
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
      playerName1.length > this.maxNameLength ||
      playerName2.length > this.maxNameLength ||
      playerName3.length > this.maxNameLength ||
      playerName4.length > this.maxNameLength
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
