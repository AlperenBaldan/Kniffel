import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaderboardService } from '../service/leaderboard/leaderboard.service';
import { GameService } from '../service/game/game.service';

@Component({
  selector: 'app-leaderboard',
  imports: [CommonModule],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.css',
  standalone: true,
})
export class LeaderboardComponent implements OnInit {
  constructor(
    private leaderboardService: LeaderboardService,
    private gameService: GameService
  ) {}

  public topLeaderboard: { playerName: string; score: number }[] = [];
  public playerList: { playerName: string; score: number }[] = [];

  ngOnInit() {
    this.topLeaderboard = this.leaderboardService.getTopLeaderboard();
    let playerName = this.gameService.getPlayerList();
    console.log(playerName + '= before playername');
    this.gameService.resetGame();
    console.log(playerName + "= after playername");
    playerName.forEach((name) => {
      this.playerList.push(this.leaderboardService.getPlayerByName(name));
    });
    // this.playerList.push(
    //   { playerName: 'test6', score: 6 },
    //   { playerName: 'Alperen', score: 273 }
    // );
    this.playerList.sort((a, b) => b.score - a.score);
    console.log(this.playerList + "after sorting");
  }

  public isPlayedPlayerInTopLeaderboard(playerName: string): boolean {
    if (this.leaderboardService.isPlayedPlayerInTopLeaderboard(playerName) && this.playerList.some((entry) => entry.playerName === playerName)) {
      return true;
    }
    return false;
  }

  public getPlayerPosition(playerName: string): number {
    return this.leaderboardService.getPlayerPosition(playerName);
  }
}
