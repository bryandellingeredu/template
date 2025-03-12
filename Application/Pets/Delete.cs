using Application.Core;
using MediatR;
using Persistence;

namespace Application.Pets
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context) => _context = context;

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var existingPet = await _context.Pets.FindAsync(request.Id);

                if (existingPet == null)
                    return Result<Unit>.Failure($"No pet found with ID: {request.Id}");

                _context.Pets.Remove(existingPet);

                var result = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (!result)
                    return Result<Unit>.Failure("Failed to delete pet");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
