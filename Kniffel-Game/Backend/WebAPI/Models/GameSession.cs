namespace Models
{
    public class GameSession
    {
        public int Id { get; set; }
        public int CurrentPlayerID { get; set; }
        public int Round { get; set; }
        public DateTime LastPlayedTime { get; set; }
        public List<GameSessionPlayer> GameSessionPlayers { get; set; }

    }
}
