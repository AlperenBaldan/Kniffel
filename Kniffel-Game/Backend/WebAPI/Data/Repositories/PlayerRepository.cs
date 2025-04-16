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


        Player p1 = new() { Name = "DummyTest", Highscore = 0};



        public void InsertDummyData()
        {
            //_context.Add(pointsP1);
            _context.Add(p1);
            _context.SaveChanges();
        }
    }
}
