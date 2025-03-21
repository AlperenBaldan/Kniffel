import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class CubeService {
  constructor() {}

  public roll(): number {
    return Math.floor(Math.random() * 6) + 1;
  }

  public getCubeLink(cubeValue: number): string {
    if (cubeValue === 1) {
      return 'assets/images/dice1.png';
    } else if (cubeValue === 2) {
      return 'assets/images/dice2.png';
    } else if (cubeValue === 3) {
      return 'assets/images/dice3.png';
    } else if (cubeValue === 4) {
      return 'assets/images/dice4.png';
    } else if (cubeValue === 5) {
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

