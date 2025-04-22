using Business.Interfaces;
using DataContracts.Interfaces;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Services
{
    public class PlayerService : IPlayerService
    {
        private readonly IPlayerRepository _playerRepository;

        public PlayerService(IPlayerRepository playerRepository)
        {
            _playerRepository = playerRepository;
        }

        public Player? GetPlayerById(int id)
        {
            var player = _playerRepository.GetPlayerById(id);
            if (player == null)
            {
                throw new KeyNotFoundException($"Player with id {id} could not be found.");
            }
            else
            {
                // mapper wenn später vorhanden
                return player;
            }
        }
    }
}
