using dotnetapp.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace dotnetapp.Data    
{
public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

 
     public DbSet<User> Users { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<Player> Players { get; set; }
        public DbSet<Referee> Referees { get; set; }
        public DbSet<Venue> Venues { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<Schedule> Schedules { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Schedule>()
                  .HasOne(s => s.Team1)
                  .WithMany()
                  .HasForeignKey(s => s.Team1Id)
                  .OnDelete(DeleteBehavior.Restrict); // Use Restrict for one and NoAction for others

            modelBuilder.Entity<Schedule>()
                .HasOne(s => s.Team2)
                .WithMany()
                .HasForeignKey(s => s.Team2Id);    // Configure other relationships
         
            base.OnModelCreating(modelBuilder);
        }


}
}