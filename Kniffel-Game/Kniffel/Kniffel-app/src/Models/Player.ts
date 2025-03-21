export class Player {
  name: string;

  Ones: number = -1;
  Twos: number = -1;
  Threes: number = -1;
  Fours: number = -1;
  Fives: number = -1;
  Sixes: number = -1;
  Top_Sum: number = 0;
  Bonus: number = 0;
  Total_Top: number = 0;
  Three_of_a_Kind: number = -1;
  Four_of_a_Kind: number = -1;
  Full_House: number = -1;
  Small_Street: number = -1;
  Large_Street: number = -1;
  Kniffel: number = -1;
  Chance: number = -1;
  Bottom_Sum: number = 0;
  Total_Sum: number = 0;

  constructor(name: string) {
    this.name = name;
  }
}
