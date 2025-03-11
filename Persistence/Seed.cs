
using Domain;

namespace Persistence
{
    public class Seed
    {
          public static async Task SeedData(DataContext context){
             if (context.Pets.Any()) return;

             var pets =  new List<Pet>{
             new Pet{Name = "Snoopy", Type = "Beagle"},
             new Pet{Name = "Garfield", Type = "Cat"},
             new Pet{Name = "Tweety", Type = "Parakeet"},
             new Pet{Name = "Bugs", Type = "Bunny"},
             new Pet{Name = "Wile", Type = "Coyote"},
                };
            await context.Pets.AddRangeAsync(pets);   
            await context.SaveChangesAsync();

          }
    }
}