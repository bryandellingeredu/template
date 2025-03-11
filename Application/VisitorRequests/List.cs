using Application.Core;
using MediatR;
using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.VisitorRequests
{
    public class List
    {
        public class Query : IRequest<Result<List<VisitorRequest>>>
        {
        }

        public class Handler : IRequestHandler<Query, Result<List<VisitorRequest>>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context) => _context = context;

            public async Task<Result<List<VisitorRequest>>> Handle(Query request, CancellationToken cancellationToken)
            {
                List<VisitorRequest> list = await _context.VisitorRequests.ToListAsync(cancellationToken);

                if (list == null) list = new List<VisitorRequest>();

                return Result<List<VisitorRequest>>.Success(list);
            }
        }

    }
}
