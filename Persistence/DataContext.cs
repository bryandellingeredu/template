using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<VisitorRequest> VisitorRequests { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Set the default schema to 'Visitor'
            modelBuilder.HasDefaultSchema("Visitor");

            base.OnModelCreating(modelBuilder);
        }
    }
}