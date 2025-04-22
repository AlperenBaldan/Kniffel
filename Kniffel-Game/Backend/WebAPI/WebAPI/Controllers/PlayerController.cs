using Business.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlayerController : ControllerBase
    {
        private readonly IPlayerService _playerService;


        public PlayerController(IPlayerService playerService)
        {
            _playerService = playerService;
        }


        [HttpGet("{id}")]
        public ActionResult GetPlayerById(int id)
        {
            try
            {
                var player = _playerService.GetPlayerById(id);
                return Ok(player);
            }
            catch (KeyNotFoundException ex)
            {
                return StatusCode(404, new { ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "Ein unerwarteter Fehler ist aufgetreten.", Details = ex.Message });
            }
        }
    }
}
