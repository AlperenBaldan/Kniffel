using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data.Migrations
{
    /// <inheritdoc />
    public partial class initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "leaderboardEntries",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Position = table.Column<int>(type: "int", nullable: false),
                    Highscore = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_leaderboardEntries", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Players",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Ones = table.Column<int>(type: "int", nullable: false),
                    Twos = table.Column<int>(type: "int", nullable: false),
                    Threes = table.Column<int>(type: "int", nullable: false),
                    Fours = table.Column<int>(type: "int", nullable: false),
                    Fives = table.Column<int>(type: "int", nullable: false),
                    Sixes = table.Column<int>(type: "int", nullable: false),
                    Top_Sum = table.Column<int>(type: "int", nullable: false),
                    Bonus = table.Column<int>(type: "int", nullable: false),
                    Total_Top = table.Column<int>(type: "int", nullable: false),
                    Three_of_a_Kind = table.Column<int>(type: "int", nullable: false),
                    Four_of_a_Kind = table.Column<int>(type: "int", nullable: false),
                    Full_House = table.Column<int>(type: "int", nullable: false),
                    Small_Street = table.Column<int>(type: "int", nullable: false),
                    Large_Street = table.Column<int>(type: "int", nullable: false),
                    Kniffel = table.Column<int>(type: "int", nullable: false),
                    Chance = table.Column<int>(type: "int", nullable: false),
                    Bottom_Sum = table.Column<int>(type: "int", nullable: false),
                    Total_Sum = table.Column<int>(type: "int", nullable: false),
                    LeaderboardEntryID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Players", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Players_leaderboardEntries_LeaderboardEntryID",
                        column: x => x.LeaderboardEntryID,
                        principalTable: "leaderboardEntries",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Players_LeaderboardEntryID",
                table: "Players",
                column: "LeaderboardEntryID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Players");

            migrationBuilder.DropTable(
                name: "leaderboardEntries");
        }
    }
}
