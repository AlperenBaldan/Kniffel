import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { GameService } from '../service/game/game.service';
import { CubeService } from '../service/cube/cube.service';
import { LeaderboardService } from '../service/leaderboard/leaderboard.service';
import { MatButtonModule } from '@angular/material/button';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Player } from '../../../Models/Player';
import { Cube } from '../../../Models/Cube';


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

  public cubeLinks: string[] = [
    'assets/images/dice1.png',
    'assets/images/dice1.png',
    'assets/images/dice1.png',
    'assets/images/dice1.png',
    'assets/images/dice1.png',
  ];

  public categories = [
    { name: 'Ones' },
    { name: 'Twos' },
    { name: 'Threes' },
    { name: 'Fours' },
    { name: 'Fives' },
    { name: 'Sixes' },
    { name: 'Top Sum' },
    { name: 'Bonus' },
    { name: 'Total Top' },
    { name: 'Three of a Kind' },
    { name: 'Four of a Kind' },
    { name: 'Full House' },
    { name: 'Small Street' },
    { name: 'Large Street' },
    { name: 'Kniffel' },
    { name: 'Chance' },
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

  private player1: Player = new Player('');
  private player2: Player = new Player('');
  private player3: Player = new Player('');
  private player4: Player = new Player('');
  public players: Player[] = [];
  public currentPlayer: Player = new Player('');
  private numberOfPlayers: number = 1;
  public rotateCubes: boolean[] = [];
  private rolled: boolean = false;

  public cube1: Cube = new Cube(0, false);
  public cube2: Cube = new Cube(0, false);
  public cube3: Cube = new Cube(0, false);
  public cube4: Cube = new Cube(0, false);
  public cube5: Cube = new Cube(0, false);
  public cubes: Cube[] = [
    this.cube1,
    this.cube2,
    this.cube3,
    this.cube4,
    this.cube5,
  ];

  public round: number = 0;
  private rolledNumber: number = 0;
  public errorMessage: string = '';

  public sessionLeaderboard: Player[] = [];

  ngOnInit(): void {
    this.resetGame();
    this.numberOfPlayers = this.gameService.getNumberOfPlayers();
    for (let i = 0; i < this.numberOfPlayers; i++) {
      if (i === 0) {
        this.player1.name = this.gameService.getPlayerName(i);
        this.players.push(this.player1);
      }
      if (i === 1) {
        this.player2.name = this.gameService.getPlayerName(i);
        this.players.push(this.player2);
      }
      if (i === 2) {
        this.player3.name = this.gameService.getPlayerName(i);
        this.players.push(this.player3);
      }
      if (i === 3) {
        this.player4.name = this.gameService.getPlayerName(i);
        this.players.push(this.player4);
      }
    }
    this.sessionLeaderboard = [...this.players];
    this.currentPlayer = this.player1;
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
          this.updateCubes();
          switch (detail) {
            case 'Ones':
              player.Ones = this.gameService.validator(detail, this.cubes);
              player.Top_Sum += player.Ones;
              break;
            case 'Twos':
              player.Twos = this.gameService.validator(detail, this.cubes);
              player.Top_Sum += player.Twos;
              break;
            case 'Threes':
              player.Threes = this.gameService.validator(detail, this.cubes);
              player.Top_Sum += player.Threes;
              break;
            case 'Fours':
              player.Fours = this.gameService.validator(detail, this.cubes);
              player.Top_Sum += player.Fours;
              break;
            case 'Fives':
              player.Fives = this.gameService.validator(detail, this.cubes);
              player.Top_Sum += player.Fives;
              break;
            case 'Sixes':
              player.Sixes = this.gameService.validator(detail, this.cubes);
              player.Top_Sum += player.Sixes;
              break;
            case 'Three of a Kind':
              player.Three_of_a_Kind = this.gameService.validator(
                detail,
                this.cubes
              );
              player.Bottom_Sum += player.Three_of_a_Kind;
              break;
            case 'Four of a Kind':
              player.Four_of_a_Kind = this.gameService.validator(
                detail,
                this.cubes
              );
              player.Bottom_Sum += player.Four_of_a_Kind;
              break;
            case 'Full House':
              player.Full_House = this.gameService.validator(
                detail,
                this.cubes
              );
              player.Bottom_Sum += player.Full_House;
              break;
            case 'Small Street':
              player.Small_Street = this.gameService.validator(
                detail,
                this.cubes
              );
              player.Bottom_Sum += player.Small_Street;
              break;
            case 'Large Street':
              player.Large_Street = this.gameService.validator(
                detail,
                this.cubes
              );
              player.Bottom_Sum += player.Large_Street;
              break;
            case 'Kniffel':
              player.Kniffel = this.gameService.validator(detail, this.cubes);
              player.Bottom_Sum += player.Kniffel;
              break;
            case 'Chance':
              player.Chance = this.gameService.validator(detail, this.cubes);
              player.Bottom_Sum += player.Chance;
              break;
          }

          if (player.Top_Sum >= 63) {
            player.Bonus = 35;
          }
          player.Total_Top = player.Top_Sum + player.Bonus;
          player.Total_Sum = player.Bottom_Sum + player.Total_Top;

          this.sessionLeaderboard.sort((a, b) => b.Total_Sum - a.Total_Sum);

          this.resetCubes();
          this.cubeLinks = this.cubeService.resetCubeLinks();
          this.updateRound();
          this.updateCurrentPlayer();
          this.rolled = false;
          if (this.round == 13) {
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
    for (let i = 0; i < this.players.length ; i++) {
      if (this.currentPlayer == this.players[this.players.length - 1]) {
        this.currentPlayer = this.player1;
        this.round++;
      } else if (this.currentPlayer == this.players[i]) {
        this.currentPlayer = this.players[i + 1];
        return;
      }
    }
  }

  private updateRound(): void {
    // if (this.currentPlayer === this.players[this.numberOfPlayers - 1]) {
    //   this.round++;
    // }
    // this.round++;
  }

  public showHoverPoints(detail: string): number {
    return this.gameService.validator(detail, this.cubes);
  }

  public roll(): void {
    this.rolled = true;
    if (this.rolledNumber >= 3) {
      this.errorMessage = 'Du hast bereits 3 Mal geworfen!';
    } else {
      this.updateCubes();
      let newCubevalues = this.cubeService.roll(this.cubes);
      for (let i = 0; i < this.cubes.length; i++) {
        if (!this.cubes[i].isCubeClicked) {
          this.cubes[i].cubeValue = newCubevalues[i].cubeValue;
          this.cubeLinks[i] = this.cubeService.getCubeLink(
            newCubevalues[i].cubeValue
          );
          this.rotateCubes[i] = true;
          // Nach 3 Sekunden die Drehung stoppen
          setTimeout(() => (this.rotateCubes[i] = false), 500);
        }
      }
      this.rolledNumber++;
      this.errorMessage = '';
    }
  }

  public cubeClicked(cubeNumber: number): void {
    if (cubeNumber == 1) {
      this.cube1.isCubeClicked
        ? (this.cube1.isCubeClicked = false)
        : (this.cube1.isCubeClicked = true);
    } else if (cubeNumber == 2) {
      this.cube2.isCubeClicked
        ? (this.cube2.isCubeClicked = false)
        : (this.cube2.isCubeClicked = true);
    } else if (cubeNumber == 3) {
      this.cube3.isCubeClicked
        ? (this.cube3.isCubeClicked = false)
        : (this.cube3.isCubeClicked = true);
    } else if (cubeNumber == 4) {
      this.cube4.isCubeClicked
        ? (this.cube4.isCubeClicked = false)
        : (this.cube4.isCubeClicked = true);
    } else if (cubeNumber == 5) {
      this.cube5.isCubeClicked
        ? (this.cube5.isCubeClicked = false)
        : (this.cube5.isCubeClicked = true);
    }
    console.log('clicked cube with number ' + cubeNumber);
  }

  private updateCubes(): void {
    this.cubes = [this.cube1, this.cube2, this.cube3, this.cube4, this.cube5];
  }

  private resetCubes(): void {
    this.rotateCubes = [false, false, false, false, false];
    this.cube1.cubeValue = 0;
    this.cube2.cubeValue = 0;
    this.cube3.cubeValue = 0;
    this.cube4.cubeValue = 0;
    this.cube5.cubeValue = 0;
    this.cube1.isCubeClicked = false;
    this.cube2.isCubeClicked = false;
    this.cube3.isCubeClicked = false;
    this.cube4.isCubeClicked = false;
    this.cube5.isCubeClicked = false;
    this.cubes = [this.cube1, this.cube2, this.cube3, this.cube4, this.cube5];
    this.rolledNumber = 0;
    this.errorMessage = '';
  }

  private resetPlayer(): void {
    this.player1 = new Player('');
    this.player2 = new Player('');
    this.player3 = new Player('');
    this.player4 = new Player('');
    this.players = [];
    this.numberOfPlayers = 1;
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

