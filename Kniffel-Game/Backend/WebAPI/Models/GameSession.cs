namespace Models
{
    public class GameSession
    {
        public int Id { get; set; }
        public int CurrentPlayerID { get; set; }
        public int Round { get; set; }
        public List<int> PlayerIdsInOrder { get; set; }
    }
}
