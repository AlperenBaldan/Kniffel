using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataContracts.Interfaces
{
    public interface IPlayerRepository
    {
        public Player? GetPlayerById(int id);
    }
}
