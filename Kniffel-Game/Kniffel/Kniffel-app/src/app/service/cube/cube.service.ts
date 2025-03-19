import { Injectable } from '@angular/core';
import { Cube } from '../../../../Models/Cube';

@Injectable({
  providedIn: 'root',
})
export class CubeService {
  constructor() {}

  public roll(cubes: Cube[]): Cube[] {
    if (cubes[0].isCubeClicked === false) {
      cubes[0].cubeValue = Math.floor(Math.random() * 6) + 1;
    }
    if (cubes[1].isCubeClicked === false) {
      cubes[1].cubeValue = Math.floor(Math.random() * 6) + 1;
    }
    if (cubes[2].isCubeClicked === false) {
      cubes[2].cubeValue = Math.floor(Math.random() * 6) + 1;
    }
    if (cubes[3].isCubeClicked === false) {
      cubes[3].cubeValue = Math.floor(Math.random() * 6) + 1;
    }
    if (cubes[4].isCubeClicked === false) {
      cubes[4].cubeValue = Math.floor(Math.random() * 6) + 1;
    }
    return cubes;
  }

  public getCubeLink(cubeValue: number): string {
    if (cubeValue == 1) {
      return 'assets/images/dice1.png';
    } else if (cubeValue == 2) {
      return 'assets/images/dice2.png';
    } else if (cubeValue == 3) {
      return 'assets/images/dice3.png';
    } else if (cubeValue == 4) {
      return 'assets/images/dice4.png';
    } else if (cubeValue == 5) {
      return 'assets/images/dice5.png';
    } else {
      return 'assets/images/dice6.png';
    }
  }

  public resetCubeLinks(): string[] {
    return [
      'assets/images/dice1.png',
      'assets/images/dice1.png',
      'assets/images/dice1.png',
      'assets/images/dice1.png',
      'assets/images/dice1.png',
    ];
  }
}

