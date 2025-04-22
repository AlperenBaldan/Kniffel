using System;
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
                    CurrentPlayerID = table.Column<int>(type: "int", nullable: false),
                    Round = table.Column<int>(type: "int", nullable: false),
                    LastPlayedTime = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GameSession", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Player",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Highscore = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Player", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PlayerGamePoint",
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
                    table.PrimaryKey("PK_PlayerGamePoint", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "GameSessionPlayer",
                columns: table => new
                {
                    GameSessionId = table.Column<int>(type: "int", nullable: false),
                    PlayerId = table.Column<int>(type: "int", nullable: false),
                    PlayerGamePointId = table.Column<int>(type: "int", nullable: false),
                    Order = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GameSessionPlayer", x => new { x.GameSessionId, x.PlayerId });
                    table.ForeignKey(
                        name: "FK_GameSessionPlayer_GameSession_GameSessionId",
                        column: x => x.GameSessionId,
                        principalTable: "GameSession",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GameSessionPlayer_PlayerGamePoint_PlayerGamePointId",
                        column: x => x.PlayerGamePointId,
                        principalTable: "PlayerGamePoint",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GameSessionPlayer_Player_PlayerId",
                        column: x => x.PlayerId,
                        principalTable: "Player",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GameSessionPlayer_PlayerGamePointId",
                table: "GameSessionPlayer",
                column: "PlayerGamePointId");

            migrationBuilder.CreateIndex(
                name: "IX_GameSessionPlayer_PlayerId",
                table: "GameSessionPlayer",
                column: "PlayerId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GameSessionPlayer");

            migrationBuilder.DropTable(
                name: "GameSession");

            migrationBuilder.DropTable(
                name: "PlayerGamePoint");

            migrationBuilder.DropTable(
                name: "Player");
        }
    }
}
