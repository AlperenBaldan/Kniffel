import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from '../../../Models/Player';
import { Cube } from '../../../Models/Cube';
import { Category } from '../../../enums/Category';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private playerList: string[] = [];
  private readonly MAX_SHOWABLE_PLAYER_CHARACTERS = 5;
  private readonly ZERO_POINTS = 0;
  private readonly FULL_HOUSE_POINTS = 25;
  private readonly SMALL_STREET_POINTS = 30;
  private readonly LARGE_STREET_POINTS = 40;
  private readonly KNIFFEL_POINTS = 50;


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

  public validator(detail: string, cubes: Cube[]): number | null {
    let cubeValues = [
      cubes[0].cubeValue,
      cubes[1].cubeValue,
      cubes[2].cubeValue,
      cubes[3].cubeValue,
      cubes[4].cubeValue,
    ];
    let points = null;
    switch (detail) {
      case Category.Ones:
        points = this.returnOnes(cubeValues);
        break;
      case Category.Twos:
        points = this.returnTwos(cubeValues);
        break;
      case Category.Threes:
        points = this.returnThrees(cubeValues);
        break;
      case Category.Fours:
        points = this.returnFours(cubeValues);
        break;
      case Category.Fives:
        points = this.returnFives(cubeValues);
        break;
      case Category.Sixes:
        points = this.returnSixes(cubeValues);
        break;
      case Category.ThreeOfAKind:
        points = this.returnThreeOfAKindPoints(cubeValues);
        break;
      case Category.FourOfAKind:
        points = this.returnFourOfAKindPoints(cubeValues);
        break;
      case Category.FullHouse:
        points = this.returnFullHousePoints(cubeValues);
        break;
      case Category.SmallStreet:
        points = this.returnSmallStreetPoints(cubeValues);
        break;
      case Category.LargeStreet:
        points = this.returnLargeStreetPoints(cubeValues);
        break;
      case Category.Kniffel:
        points = this.returnKniffelPoints(cubeValues);
        break;
      case Category.Chance:
        points = this.cubeSumm(cubeValues);
        break;
    }
    return points;
  }

  public showPlayerName(name: string): string {
    if (name.length > this.MAX_SHOWABLE_PLAYER_CHARACTERS) {
      name = name.substring(0, 5) + '..';
    }
    return name;
  }

  public isCategoryEmpty(player: Player, detail: string): boolean {
    let points: number | null = null;
    switch (detail) {
      case Category.Ones:
        points = player.Ones;
        break;
      case Category.Twos:
        points = player.Twos;
        break;
      case Category.Threes:
        points = player.Threes;
        break;
      case Category.Fours:
        points = player.Fours;
        break;
      case Category.Fives:
        points = player.Fives;
        break;
      case Category.Sixes:
        points = player.Sixes;
        break;
      case Category.ThreeOfAKind:
        points = player.Three_of_a_Kind;
        break;
      case Category.FourOfAKind:
        points = player.Four_of_a_Kind;
        break;
      case Category.FullHouse:
        points = player.Full_House;
        break;
      case Category.SmallStreet:
        points = player.Small_Street;
        break;
      case Category.LargeStreet:
        points = player.Large_Street;
        break;
      case Category.Kniffel:
        points = player.Kniffel;
        break;
      case Category.Chance:
        points = player.Chance;
        break;
    }
    if (points === null) {
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
      return this.ZERO_POINTS;
    }
  }

  private returnFourOfAKindPoints(cubeValues: number[]): number {
    let duplicate = cubeValues.some(
      (num, i, arr) => arr.filter((item) => item === num).length >= 4
    );
    return duplicate ? this.cubeSumm(cubeValues) : this.ZERO_POINTS;
  }

  private returnFullHousePoints(cubeValues: number[]): number {
    let unique = [...new Set(cubeValues)];
    let duplicates = unique.map((value) => [
      value,
      cubeValues.filter((str) => str === value).length,
    ]);
    return duplicates.length === 2 ? this.FULL_HOUSE_POINTS : this.ZERO_POINTS;
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
        return this.SMALL_STREET_POINTS;
      }
    }
    return this.ZERO_POINTS;
  }

  private returnLargeStreetPoints(cubeValues: number[]): number {
    cubeValues.sort((a, b) => a - b);
    return cubeValues[1] === cubeValues[0] + 1 &&
      cubeValues[2] === cubeValues[0] + 2 &&
      cubeValues[3] === cubeValues[0] + 3 &&
      cubeValues[4] === cubeValues[0] + 4
      ? this.LARGE_STREET_POINTS
      : this.ZERO_POINTS;
  }

  private returnKniffelPoints(cubeValues: number[]): number {
    return cubeValues[0] != 0 &&
      cubeValues[0] === cubeValues[1] &&
      cubeValues[1] === cubeValues[2] &&
      cubeValues[2] === cubeValues[3] &&
      cubeValues[3] === cubeValues[4]
      ? this.KNIFFEL_POINTS
      : this.ZERO_POINTS;
  }

  

  public gameFinished(): void {
    this.router.navigate(['/leaderboard']);
  }

  public resetGame(): void {
    this.playerList = [];
  }
}
