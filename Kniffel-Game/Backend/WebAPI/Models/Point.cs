namespace Models
{
    public class Point
    {
        public int Id { get; set; }
        public int? Ones { get; set; }
        public int? Twos { get; set; }
        public int? Threes { get; set; }
        public int? Fours { get; set; }
        public int? Fives { get; set; }
        public int? Sixes { get; set; }
        public int Top_Sum { get; set; }
        public int Bonus { get; set; }
        public int Total_Top { get; set; }
        public int? Three_of_a_Kind { get; set; }
        public int? Four_of_a_Kind { get; set; }
        public int? Full_House { get; set; }
        public int? Small_Street { get; set; }
        public int? Large_Street { get; set; }
        public int? Kniffel { get; set; }
        public int? Chance { get; set; }
        public int Bottom_Sum { get; set; }
        public int Total_Sum { get; set; }
        public int PlayerId { get; set; }
        public Player Player { get; set; }
        public int GameSessionId { get; set; }
        public GameSession GameSession { get; set; }
    }
}
