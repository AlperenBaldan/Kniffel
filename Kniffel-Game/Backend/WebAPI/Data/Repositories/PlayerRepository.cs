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


        Player p1 = new() { Name = "DummyTest2", Highscore = 100};



        public Player? GetPlayerById(int id)
        {
            var player = _context.Player.FirstOrDefault(p =>  p.Id == id);
            return player;
        }
    }
}
