using Application.Pets;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PetsController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult> GetPets() => HandleResult(await Mediator.Send(new List.Query()));
    }
}
