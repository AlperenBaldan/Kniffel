import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GameService } from '../service/game/game.service';
import { CubeService } from '../service/cube/cube.service';
import { LeaderboardService } from '../service/leaderboard/leaderboard.service';
import { MatButtonModule } from '@angular/material/button';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Player } from '../../Models/Player';
import { Cube } from '../../Models/Cube';
import { Category } from '../../enums/Category';


@Component({
  selector: 'app-game',
  imports: [CommonModule, MatButtonModule, NgbTooltipModule, MatToolbarModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
  standalone: true,
})
export class GameComponent implements OnInit {
  constructor(
    private gameService: GameService,
    private cubeService: CubeService,
    private leaderboardService: LeaderboardService
  ) {}

  private readonly MAX_ROLLS = 3;
  private readonly LAST_ROUND = 13;

  public cubeLinks: string[] = [
    'assets/images/dice1.png',
    'assets/images/dice1.png',
    'assets/images/dice1.png',
    'assets/images/dice1.png',
    'assets/images/dice1.png',
  ];

  public categories = [
    { name: Category.Ones },
    { name: Category.Twos },
    { name: Category.Threes },
    { name: Category.Fours },
    { name: Category.Fives },
    { name: Category.Sixes },
    { name: 'Top Sum' },
    { name: 'Bonus' },
    { name: 'Total Top' },
    { name: Category.ThreeOfAKind },
    { name: Category.FourOfAKind },
    { name: Category.FullHouse },
    { name: Category.SmallStreet },
    { name: Category.LargeStreet },
    { name: Category.Kniffel },
    { name: Category.Chance },
    { name: 'Bottom Sum' },
    { name: 'Total Sum' },
];

  public categoriesHelpText = [
    { name: 'Count only ones.' },
    { name: 'Count only twos.' },
    { name: 'Count only threes.' },
    { name: 'Count only fours.' },
    { name: 'Count only fives.' },
    { name: 'Count only sixes.' },
    { name: 'Sum of the upper part.' },
    { name: '+35 points if top sum > 63 points.' },
    { name: '= Top Sum + Bonus.' },
    { name: 'At least 3 same dice, all eyes count.' },
    { name: 'At least  same dice, all eyes count.' },
    { name: '3 dice the same AND 2 dice the same – 25 points.' },
    { name: '1-2-3-4, 2-3-4-5, or 3-4-5-6 – 30 points.' },
    { name: '1-2-3-4-5 or 2-3-4-5-6 – 40 points.' },
    { name: 'All dice the same – 50 points.' },
    { name: 'All eyes count.' },
    { name: 'Sum of the lower part.' },
    { name: 'Total = Total Top + Bottom Sum.' },
  ];

  public players: Player[] = [];
  public currentPlayer: Player = new Player('');
  public rotateCubes: boolean[] = [];
  private rolled: boolean = false;

  public cubes: Cube[] = [
    { cubeValue: 0, isCubeClicked: false }, 
    { cubeValue: 0, isCubeClicked: false }, 
    { cubeValue: 0, isCubeClicked: false }, 
    { cubeValue: 0, isCubeClicked: false }, 
    { cubeValue: 0, isCubeClicked: false }
  ];

  public round: number = 0;
  private rolledNumber: number = 0;
  public errorMessage: string = '';

  public sessionLeaderboard: Player[] = [];

  ngOnInit(): void {
    this.resetGame();
    let numberOfPlayers = this.gameService.getNumberOfPlayers();
    
    if (numberOfPlayers >= 1) {
      let player1: Player = new Player(this.gameService.getPlayerName(1));
      this.players.push(player1);
    }
    if (numberOfPlayers >= 2) {
      let player2: Player = new Player(this.gameService.getPlayerName(2));
      this.players.push(player2);
    }
    if (numberOfPlayers >= 3) {
      let player3: Player = new Player(this.gameService.getPlayerName(3));
      this.players.push(player3);
    }
    if (numberOfPlayers >= 4) {
      let player4: Player = new Player(this.gameService.getPlayerName(4));
      this.players.push(player4);
    }
    console.log(this.players);
    this.sessionLeaderboard = [...this.players];
    this.currentPlayer = this.players[0];
  }

  public showPlayerName(name: string): string {
    return this.gameService.showPlayerName(name);
  }

  public validator(player: Player, detail: string): void {
    if (!this.rolled) {
      this.errorMessage = 'Please roll the dice first.';
    } else {
      if (this.currentPlayer === player) {
        if (this.isCategoryEmpty(player, detail)) {
          switch (detail) {
            case Category.Ones:
              player.Ones = this.gameService.validator(detail, this.cubes);
              break;
            case Category.Twos:
              player.Twos = this.gameService.validator(detail, this.cubes);
              break;
            case Category.Threes:
              player.Threes = this.gameService.validator(detail, this.cubes);
              break;
            case Category.Fours:
              player.Fours = this.gameService.validator(detail, this.cubes);
              break;
            case Category.Fives:
              player.Fives = this.gameService.validator(detail, this.cubes);
              break;
            case Category.Sixes:
              player.Sixes = this.gameService.validator(detail, this.cubes);
              break;
            case Category.ThreeOfAKind:
              player.Three_of_a_Kind = this.gameService.validator(
                detail,
                this.cubes
              );
              break;
            case Category.FourOfAKind:
              player.Four_of_a_Kind = this.gameService.validator(
                detail,
                this.cubes
              );
              break;
            case Category.FullHouse:
              player.Full_House = this.gameService.validator(
                detail,
                this.cubes
              );
              break;
            case Category.SmallStreet:
              player.Small_Street = this.gameService.validator(
                detail,
                this.cubes
              );
              break;
            case Category.LargeStreet:
              player.Large_Street = this.gameService.validator(
                detail,
                this.cubes
              );
              break;
            case Category.Kniffel:
              player.Kniffel = this.gameService.validator(detail, this.cubes);
              break;
            case Category.Chance:
              player.Chance = this.gameService.validator(detail, this.cubes);
              break;
          }

          this.sessionLeaderboard.sort((a, b) => b.Total_Sum - a.Total_Sum);

          this.resetCubes();
          this.cubeLinks = this.cubeService.resetCubeLinks();
          this.updateCurrentPlayer();
          this.rolled = false;
          if (this.round === this.LAST_ROUND) {
            this.gameFinished();
          }
        }
      } else {
        this.errorMessage = 'It is not your turn!';
      }
    }
  }

  private isCategoryEmpty(player: Player, detail: string): boolean {
    return this.gameService.isCategoryEmpty(player, detail);
  }

  private updateCurrentPlayer(): void {
    if (this.currentPlayer === this.players[this.players.length - 1]) 
    {
      this.currentPlayer = this.players[0];
      this.round++;
    }
    else 
    {
      this.currentPlayer = this.players[this.players.findIndex(player => player === this.currentPlayer) + 1];
    }
    console.log(this.currentPlayer);
  }

  public showHoverPoints(detail: string): number | null{
    return this.gameService.validator(detail, this.cubes);
  }
  
  public roll(): void {
    this.rolled = true;
    if (this.rolledNumber >= this.MAX_ROLLS) {
      this.errorMessage = 'Du hast bereits 3 Mal geworfen!';
    } else {
      for (let i = 0; i < this.cubes.length; i++) {
        if (!this.cubes[i].isCubeClicked) {
          this.cubes[i].cubeValue = this.cubeService.roll();
          this.cubeLinks[i] = this.cubeService.getCubeLink(this.cubes[i].cubeValue);
          this.rotateCubes[i] = true;
          setTimeout(() => (this.rotateCubes[i] = false), 500);
        }
      }
      this.rolledNumber++;
      this.errorMessage = '';
    }
  }

  

  public cube1Clicked(): void {
    this.cubes[0].isCubeClicked = !this.cubes[0].isCubeClicked;
  }

  public cube2Clicked(): void {
    this.cubes[1].isCubeClicked = !this.cubes[1].isCubeClicked;
  }

  public cube3Clicked(): void {
    this.cubes[2].isCubeClicked = !this.cubes[2].isCubeClicked;
  }

  public cube4Clicked(): void {
    this.cubes[3].isCubeClicked = !this.cubes[3].isCubeClicked;
  }

  public cube5Clicked(): void {
    this.cubes[4].isCubeClicked = !this.cubes[4].isCubeClicked;
  }


  private resetCubes(): void {
    this.rotateCubes = [false, false, false, false, false];
    this.cubes = [
      { cubeValue: 0, isCubeClicked: false }, 
      { cubeValue: 0, isCubeClicked: false }, 
      { cubeValue: 0, isCubeClicked: false }, 
      { cubeValue: 0, isCubeClicked: false }, 
      { cubeValue: 0, isCubeClicked: false }];
    this.rolledNumber = 0;
    this.errorMessage = '';
  }

  private resetPlayer(): void {
    this.players = [];
  }

  private gameFinished(): void {
    this.players.forEach((player) => {
      this.leaderboardService.addScore(player.name, player.Total_Sum);
    });
    this.resetGame();

    this.gameService.gameFinished();
  }

  private resetGame(): void {
    this.resetCubes();
    this.resetPlayer();
    this.round = 0;
  }
}

