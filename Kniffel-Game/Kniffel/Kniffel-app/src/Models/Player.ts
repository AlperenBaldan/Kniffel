export class Player {
  name: string;

  Ones: number | null = null;
  Twos: number | null = null;
  Threes: number | null = null;
  Fours: number | null = null;
  Fives: number | null = null;
  Sixes: number | null = null;

  get Top_Sum(): number {
    return (this.Ones ?? 0) + (this.Twos ?? 0) + (this.Threes ?? 0) +
    (this.Fours ?? 0) + (this.Fives ?? 0) + (this.Sixes ?? 0);
  }
  
  get Bonus(): number {
    return this.Top_Sum > 63 ? 35 : 0;
  }

  get Total_Top(): number {
    return (this.Top_Sum ?? 0) + (this.Bonus ?? 0);
  }

  Three_of_a_Kind: number | null = null;
  Four_of_a_Kind: number | null = null;
  Full_House: number | null = null;
  Small_Street: number | null = null;
  Large_Street: number | null = null;
  Kniffel: number | null = null;
  Chance: number | null = null;
  
  get Bottom_Sum(): number {
    return (this.Three_of_a_Kind ?? 0) + (this.Four_of_a_Kind ?? 0) + (this.Full_House ?? 0) +
    (this.Small_Street ?? 0) + (this.Large_Street ?? 0) + (this.Kniffel ?? 0) + (this.Chance ?? 0);
  }

  get Total_Sum(): number {
    return (this.Total_Top + this.Bottom_Sum);
  }

  

  constructor(name: string) {
    this.name = name;
  }
}
