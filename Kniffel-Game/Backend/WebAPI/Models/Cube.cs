using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class Cube
    {
        public required int Id { get; set; }
        public int CubeValue { get; set; }
        public bool IsCubeClicked { get; set; }
    }
}
