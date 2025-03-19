using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.DTOs
{
    public class GameDTO
    {
        public int? Id { get; set; }
        public int Round { get; set; }
        public Player CurrentPlayer { get; set; }
        public List<Player>? Player { get; set; }
    }
}
