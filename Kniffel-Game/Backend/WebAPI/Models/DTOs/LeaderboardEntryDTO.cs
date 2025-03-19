using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.DTOs
{
    public class LeaderboardEntryDTO
    {
        public int? ID { get; set; }
        public int Position { get; set; }
        public string Playername { get; set; }
        public int Highscore { get; set; }
    }
}
