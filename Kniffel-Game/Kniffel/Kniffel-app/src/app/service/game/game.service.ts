import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from '../../../Models/Player';
import { Cube } from '../../../Models/Cube';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private playerList: string[] = [];
  private readonly maxShowablePlayerCharacters: number = 5;
  private readonly zeroPoints = 0;
  private readonly fullHousePoints = 25;
  private readonly smallStreetPoints = 30;
  private readonly largeStreetPoints = 40;
  private readonly kniffelPoints = 50;


  constructor(private router: Router) {}

  public startGame(playerlist: string[]): void {
    this.playerList = playerlist;
    this.router.navigate(['/game']);
  }

  public getPlayerName(index: number): string {
    return this.playerList[index - 1];
  }

  getPlayerList(): string[] {
    return this.playerList;
  }

  public getNumberOfPlayers(): number {
    return this.playerList.length;
  }

  public validator(detail: string, cubes: Cube[]): number {
    let cubeValues = [
      cubes[0].cubeValue,
      cubes[1].cubeValue,
      cubes[2].cubeValue,
      cubes[3].cubeValue,
      cubes[4].cubeValue,
    ];
    let points: number = -1;
    switch (detail) {
      case 'Ones':
        points = this.returnOnes(cubeValues);
        break;
      case 'Twos':
        points = this.returnTwos(cubeValues);
        break;
      case 'Threes':
        points = this.returnThrees(cubeValues);
        break;
      case 'Fours':
        points = this.returnFours(cubeValues);
        break;
      case 'Fives':
        points = this.returnFives(cubeValues);
        break;
      case 'Sixes':
        points = this.returnSixes(cubeValues);
        break;
      case 'Three of a Kind':
        points = this.returnThreeOfAKindPoints(cubeValues);
        break;
      case 'Four of a Kind':
        points = this.returnFourOfAKindPoints(cubeValues);
        break;
      case 'Full House':
        points = this.returnFullHousePoints(cubeValues);
        break;
      case 'Small Street':
        points = this.returnSmallStreetPoints(cubeValues);
        break;
      case 'Large Street':
        points = this.returnLargeStreetPoints(cubeValues);
        break;
      case 'Kniffel':
        points = this.returnKniffelPoints(cubeValues);
        break;
      case 'Chance':
        points = this.cubeSumm(cubeValues);
        break;
    }
    return points;
  }

  public showPlayerName(name: string): string {
    if (name.length > this.maxShowablePlayerCharacters) {
      name = name.substring(0, 5) + '..';
    }
    return name;
  }

  public isCategoryEmpty(player: Player, detail: string): boolean {
    let points: number = -2;
    switch (detail) {
      case 'Ones':
        points = player.Ones;
        break;
      case 'Twos':
        points = player.Twos;
        break;
      case 'Threes':
        points = player.Threes;
        break;
      case 'Fours':
        points = player.Fours;
        break;
      case 'Fives':
        points = player.Fives;
        break;
      case 'Sixes':
        points = player.Sixes;
        break;
      case 'Three of a Kind':
        points = player.Three_of_a_Kind;
        break;
      case 'Four of a Kind':
        points = player.Four_of_a_Kind;
        break;
      case 'Full House':
        points = player.Full_House;
        break;
      case 'Small Street':
        points = player.Small_Street;
        break;
      case 'Large Street':
        points = player.Large_Street;
        break;
      case 'Kniffel':
        points = player.Kniffel;
        break;
      case 'Chance':
        points = player.Chance;
        break;
    }
    if (points === -1) {
      return true;
    } else {
      return false;
    }
  }

  private cubeSumm(cubeValues: number[]): number {
    return (
      cubeValues[0] +
      cubeValues[1] +
      cubeValues[2] +
      cubeValues[3] +
      cubeValues[4]
    );
  }

  private returnOnes(cubeValues: number[]): number {
    return cubeValues.filter((value) => value === 1).length;
  }

  private returnTwos(cubeValues: number[]): number {
    return 2 * cubeValues.filter((value) => value === 2).length;
  }

  private returnThrees(cubeValues: number[]): number {
    return 3 * cubeValues.filter((value) => value === 3).length;
  }

  private returnFours(cubeValues: number[]): number {
    return 4 * cubeValues.filter((value) => value === 4).length;
  }

  private returnFives(cubeValues: number[]): number {
    return 5 * cubeValues.filter((value) => value === 5).length;
  }

  private returnSixes(cubeValues: number[]): number {
    return 6 * cubeValues.filter((value) => value === 6).length;
  }

  private returnThreeOfAKindPoints(cubeValues: number[]): number {
    let duplicate = cubeValues.some(
      (num, i, arr) => arr.filter((item) => item === num).length >= 3
    );
    if (duplicate) {
      return this.cubeSumm(cubeValues);
    } else {
      return this.zeroPoints;
    }
  }

  private returnFourOfAKindPoints(cubeValues: number[]): number {
    let duplicate = cubeValues.some(
      (num, i, arr) => arr.filter((item) => item === num).length >= 4
    );
    return duplicate ? this.cubeSumm(cubeValues) : this.zeroPoints;
  }

  private returnFullHousePoints(cubeValues: number[]): number {
    let unique = [...new Set(cubeValues)];
    let duplicates = unique.map((value) => [
      value,
      cubeValues.filter((str) => str === value).length,
    ]);
    return duplicates.length === 2 ? this.fullHousePoints : this.zeroPoints;
  }

  private returnSmallStreetPoints(cubeValues: number[]): number {
    cubeValues.sort((a, b) => a - b);
    cubeValues = [...new Set(cubeValues)];
    for (let i = 0; i < cubeValues.length - 3; i++) {
      if (
        cubeValues[i + 1] === cubeValues[i] + 1 &&
        cubeValues[i + 2] === cubeValues[i] + 2 &&
        cubeValues[i + 3] === cubeValues[i] + 3
      ) {
        return this.smallStreetPoints;
      }
    }
    return this.zeroPoints;
  }

  private returnLargeStreetPoints(cubeValues: number[]): number {
    cubeValues.sort((a, b) => a - b);
    return cubeValues[1] === cubeValues[0] + 1 &&
      cubeValues[2] === cubeValues[0] + 2 &&
      cubeValues[3] === cubeValues[0] + 3 &&
      cubeValues[4] === cubeValues[0] + 4
      ? this.largeStreetPoints
      : this.zeroPoints;
  }

  private returnKniffelPoints(cubeValues: number[]): number {
    return cubeValues[0] != 0 &&
      cubeValues[0] === cubeValues[1] &&
      cubeValues[1] === cubeValues[2] &&
      cubeValues[2] === cubeValues[3] &&
      cubeValues[3] === cubeValues[4]
      ? this.kniffelPoints
      : this.zeroPoints;
  }

  

  public gameFinished(): void {
    this.router.navigate(['/leaderboard']);
  }

  public resetGame(): void {
    this.playerList = [];
  }
}
