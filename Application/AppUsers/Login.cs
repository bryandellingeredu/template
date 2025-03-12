using Application.Core;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Domain;

namespace Application.AppUsers
{
    public class Login
    {
        public class Command : IRequest<Result<AppUser>>
        {
            public string Email { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<AppUser>>
        {
            public Task<Result<AppUser>> Handle(Command request, CancellationToken cancellationToken)
            {
                return Task.FromResult(Result<AppUser>.Success(new AppUser { Email = request.Email }));
            }
        }
    }
}
