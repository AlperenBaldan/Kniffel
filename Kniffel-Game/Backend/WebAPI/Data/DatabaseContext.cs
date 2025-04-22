using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }

        public DbSet<Player> Player { get; set; }
        public DbSet<PlayerGamePoint> PlayerGamePoint { get; set; }
        public DbSet<GameSession> GameSession { get; set; }
        public DbSet<GameSessionPlayer> GameSessionPlayer { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<GameSessionPlayer>().HasKey(gsp => new { gsp.GameSessionId, gsp.PlayerId });
        }

    }
}
