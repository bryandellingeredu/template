using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
          public static async Task SeedData(DataContext context){
             if (context.VisitorRequests.Any()) return;

             var visitorRequests =  new List<VisitorRequest>{
                new VisitorRequest{Title = "Visitor Request One", Description = "Description One"},
                new VisitorRequest{Title = "Visitor Request Two", Description = "Description Two"},
                new VisitorRequest{Title = "Visitor Request Three"},
                new VisitorRequest{Title = "Visitor Request Four", Description = "Description Four"},
                new VisitorRequest{Title = "Visitor Request Five", Description = "Description Five"},
                };
            await context.VisitorRequests.AddRangeAsync(visitorRequests);
            await context.SaveChangesAsync();

          }
    }
}