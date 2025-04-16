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
                name: "GameSession",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CurrentPlayer = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Round = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GameSession", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Point",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ones = table.Column<int>(type: "int", nullable: true),
                    Twos = table.Column<int>(type: "int", nullable: true),
                    Threes = table.Column<int>(type: "int", nullable: true),
                    Fours = table.Column<int>(type: "int", nullable: true),
                    Fives = table.Column<int>(type: "int", nullable: true),
                    Sixes = table.Column<int>(type: "int", nullable: true),
                    Top_Sum = table.Column<int>(type: "int", nullable: false),
                    Bonus = table.Column<int>(type: "int", nullable: false),
                    Total_Top = table.Column<int>(type: "int", nullable: false),
                    Three_of_a_Kind = table.Column<int>(type: "int", nullable: true),
                    Four_of_a_Kind = table.Column<int>(type: "int", nullable: true),
                    Full_House = table.Column<int>(type: "int", nullable: true),
                    Small_Street = table.Column<int>(type: "int", nullable: true),
                    Large_Street = table.Column<int>(type: "int", nullable: true),
                    Kniffel = table.Column<int>(type: "int", nullable: true),
                    Chance = table.Column<int>(type: "int", nullable: true),
                    Bottom_Sum = table.Column<int>(type: "int", nullable: false),
                    Total_Sum = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Point", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Players",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Highscore = table.Column<int>(type: "int", nullable: false),
                    TurnOrder = table.Column<int>(type: "int", nullable: true),
                    PointId = table.Column<int>(type: "int", nullable: false),
                    GameSessionId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Players", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Players_GameSession_GameSessionId",
                        column: x => x.GameSessionId,
                        principalTable: "GameSession",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Players_Point_PointId",
                        column: x => x.PointId,
                        principalTable: "Point",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Players_GameSessionId",
                table: "Players",
                column: "GameSessionId");

            migrationBuilder.CreateIndex(
                name: "IX_Players_PointId",
                table: "Players",
                column: "PointId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Players");

            migrationBuilder.DropTable(
                name: "GameSession");

            migrationBuilder.DropTable(
                name: "Point");
        }
    }
}
