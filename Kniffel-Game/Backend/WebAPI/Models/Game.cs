using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class Game
    {
        public required int Id { get; set; }
        public int Round { get; set; }
        public virtual Player CurrentPlayer { get; set; }
        public virtual List<Player>? Player { get; set; }
    }
}
