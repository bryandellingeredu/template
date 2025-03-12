using Application.Core;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Domain;


namespace Application.Pets
{
    public class CreateUpdate
    {
          public class Command : IRequest<Result<Unit>>
         {
            public Pet Pet  { get; set; }
         }

           public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context) => _context = context;

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken){
                var existingPet= await _context.Pets
                    .Where(x => x.Id == request.Pet.Id)
                    .FirstOrDefaultAsync();
                
                 if (existingPet != null){
                    existingPet.Name = request.Pet.Name;
                    existingPet.Type = request.Pet.Type; 
                      try{
                        await _context.SaveChangesAsync();
                         return Result<Unit>.Success(Unit.Value);
                     }
                     catch (Exception ex){
                         return Result<Unit>.Failure($"An error occurred when trying to update the pet: {ex.Message}");
                     } 
                 }else{
                    Pet newPet = new Pet();
                    newPet.Id = request.Pet.Id;
                    newPet.Name = request.Pet.Name;
                    newPet.Type = request.Pet.Type;
                     _context.Pets.Add(newPet);
                     var result = await _context.SaveChangesAsync() > 0;
                    if (!result) return Result<Unit>.Failure("Failed to create pet");
                    return Result<Unit>.Success(Unit.Value); 
                 }

            }
        }
    }
}