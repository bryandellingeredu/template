using Application.Core;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Domain;
using Application.GraphHelper;
using Microsoft.Extensions.Configuration;
using System.Text;
using Microsoft.Graph.Models;

namespace Application.Pets
{
    public class SendEmail
    {
        public class Command : IRequest<Result<Unit>>
        {
            public SendEmailDTO SendEmailDTO { get; set; }
        }


        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IGraphHelperService _graphHelper;

            public Handler( DataContext context, IGraphHelperService graphHelper)
            {
                _context = context;
                _graphHelper = graphHelper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                string link = $"https://localhost:3000/template?redirecttopath=petform/{request.SendEmailDTO.Id}";
                var pet = await _context.Pets.FindAsync(request.SendEmailDTO.Id);
                string title = $"Check Out this Pet! ";
                StringBuilder body = new StringBuilder();
                body.Append($"<p> <strong> Pet Name: </strong> {pet.Name} </p>");
                body.Append($"<p> <strong> Pet Type: </strong> {pet.Type} </p>");
                body.Append($"<p> <strong> Link To Pet: </strong> <a href='{link}'>{pet.Name}</a></p>");

                List<string> recipients = new List<string>();
                recipients.Add(request.SendEmailDTO.Email);

                await _graphHelper.SendEmailAsync(title, body.ToString(), recipients.ToArray());

                return Result<Unit>.Success(Unit.Value);

            }
        }

    }
}
