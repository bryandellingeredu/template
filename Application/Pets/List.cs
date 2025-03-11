using Application.Core;
using MediatR;
using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Pets
{
    public class List
    {
        public class Query : IRequest<Result<List<Pet>>>
        {
        }

        public class Handler : IRequestHandler<Query, Result<List<Pet>>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context) => _context = context;

            public async Task<Result<List<Pet>>> Handle(Query request, CancellationToken cancellationToken)
            {
                List<Pet> list = await _context.Pets.ToListAsync(cancellationToken);

                if (list == null) list = new List<Pet>();

                return Result<List<Pet>>.Success(list);
            }
        }

    }
}
