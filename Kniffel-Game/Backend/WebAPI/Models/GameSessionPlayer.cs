namespace Models
{
    public class GameSessionPlayer
    {
        public int GameSessionId { get; set; }
        public GameSession GameSession { get; set; }

        public int PlayerId { get; set; }
        public Player Player { get; set; }

        public int PlayerGamePointId { get; set; }
        public PlayerGamePoint PlayerGamePoint { get; set; }

        public int Order { get; set; }
    }

}
