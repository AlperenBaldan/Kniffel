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


        [HttpPost]
        public ActionResult InsertDummyData()
        {
            try
            {
                _playerService.InsertDummyData();
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "Ein unerwarteter Fehler ist aufgetreten.", Details = ex.Message });
            }
        }
    }
}
