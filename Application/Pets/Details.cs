using Application.Core;
using MediatR;
using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Pets
{
    public class Details
    {
        public class Query : IRequest<Result<Pet>> 
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Pet>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context) => _context = context;

            public async Task<Result<Pet>> Handle(Query request, CancellationToken cancellationToken)
            {
                var pet = await _context.Pets.FindAsync(request.Id);

                if (pet == null)
                    return Result<Pet>.Failure($"No Pet Found for Id: {request.Id}");

                return Result<Pet>.Success(pet);
            }
        }
    }
}
