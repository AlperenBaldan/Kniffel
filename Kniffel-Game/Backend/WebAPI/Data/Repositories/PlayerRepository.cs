using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models;
using DataContracts.Interfaces;

namespace Data.Repositories
{
    public class PlayerRepository : IPlayerRepository
    {

        private readonly DatabaseContext _context;

        public PlayerRepository(DatabaseContext context) 
        { 
            _context = context;
        }



        Player player1 = new() { Id = 1, Name = "Anton", Ones = -1, Twos = -1, Threes = -1, Fours = -1, Fives = -1, Sixes = -1, Top_Sum = 0, Bonus = 0, Total_Top = 0, Three_of_a_Kind = -1, Four_of_a_Kind = -1, Full_House = -1, Small_Street = -1, Large_Street = -1, Kniffel = -1, Chance = -1, Bottom_Sum = 0, Total_Sum = 0, LeaderboardEntry = { ID = 1, Position = 1, Highscore = 200 } };
        Player player2 = new() { Id = 1, Name = "Marlon", Ones = -1, Twos = -1, Threes = -1, Fours = -1, Fives = -1, Sixes = -1, Top_Sum = 0, Bonus = 0, Total_Top = 0, Three_of_a_Kind = -1, Four_of_a_Kind = -1, Full_House = -1, Small_Street = -1, Large_Street = -1, Kniffel = -1, Chance = -1, Bottom_Sum = 0, Total_Sum = 0, LeaderboardEntry = { ID = 2, Position = 2, Highscore = 190 } };
        Player player3 = new() { Id = 1, Name = "Johannes", Ones = -1, Twos = -1, Threes = -1, Fours = -1, Fives = -1, Sixes = -1, Top_Sum = 0, Bonus = 0, Total_Top = 0, Three_of_a_Kind = -1, Four_of_a_Kind = -1, Full_House = -1, Small_Street = -1, Large_Street = -1, Kniffel = -1, Chance = -1, Bottom_Sum = 0, Total_Sum = 0, LeaderboardEntry = { ID = 3, Position = 3, Highscore = 180 } };
        Player player4 = new() { Id = 1, Name = "Frederik", Ones = -1, Twos = -1, Threes = -1, Fours = -1, Fives = -1, Sixes = -1, Top_Sum = 0, Bonus = 0, Total_Top = 0, Three_of_a_Kind = -1, Four_of_a_Kind = -1, Full_House = -1, Small_Street = -1, Large_Street = -1, Kniffel = -1, Chance = -1, Bottom_Sum = 0, Total_Sum = 0, LeaderboardEntry = { ID = 4, Position = 4, Highscore = 170 } };
        Player player5 = new() { Id = 1, Name = "Florian", Ones = -1, Twos = -1, Threes = -1, Fours = -1, Fives = -1, Sixes = -1, Top_Sum = 0, Bonus = 0, Total_Top = 0, Three_of_a_Kind = -1, Four_of_a_Kind = -1, Full_House = -1, Small_Street = -1, Large_Street = -1, Kniffel = -1, Chance = -1, Bottom_Sum = 0, Total_Sum = 0, LeaderboardEntry = { ID = 5, Position = 5, Highscore = 160 } };




        public void InsertDummyData()
        {
            _context.Players.Add(player1);
            _context.Players.Add(player2);
            _context.Players.Add(player3);
            _context.Players.Add(player4);
            _context.Players.Add(player5);
            _context.SaveChanges();
        }
    }
}
