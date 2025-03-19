using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class LeaderboardEntry
    {
        public required int ID {  get; set; }
        public int Position { get; set; }
        public int Highscore { get; set; }
    }
}
