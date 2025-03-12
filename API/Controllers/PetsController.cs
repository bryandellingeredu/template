using Application.Pets;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PetsController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult> GetPets() => HandleResult(await Mediator.Send(new List.Query()));

        [HttpGet("{id}")]
        public async Task<ActionResult> GetPet(Guid id) => HandleResult(await Mediator.Send(new Details.Query { Id = id }));

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePet(Guid id) => HandleResult(await Mediator.Send(new Delete.Command { Id = id }));

        [HttpPost]
        public async Task<IActionResult> CreateUpdatePet([FromBody] Pet pet) =>
            HandleResult(await Mediator.Send(new CreateUpdate.Command { Pet = pet }));

        [HttpPost("sendemail")]
        public async Task<IActionResult> SendEmail([FromBody] SendEmailDTO sendEmailDTO) =>
        HandleResult(await Mediator.Send(new SendEmail.Command { SendEmailDTO = sendEmailDTO }));
    }
}
