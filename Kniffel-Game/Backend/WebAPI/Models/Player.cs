namespace Models
{
    public class Player
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? Highscore { get; set; }
        public List<GameSessionPlayer> GameSessionPlayers { get; set; }
    }
}
