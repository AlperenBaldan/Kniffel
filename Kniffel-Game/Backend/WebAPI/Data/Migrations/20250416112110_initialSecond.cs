using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data.Migrations
{
    /// <inheritdoc />
    public partial class initialSecond : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Players_GameSession_GameSessionId",
                table: "Players");

            migrationBuilder.DropForeignKey(
                name: "FK_Players_Point_PointId",
                table: "Players");

            migrationBuilder.DropIndex(
                name: "IX_Players_GameSessionId",
                table: "Players");

            migrationBuilder.DropIndex(
                name: "IX_Players_PointId",
                table: "Players");

            migrationBuilder.DropColumn(
                name: "GameSessionId",
                table: "Players");

            migrationBuilder.DropColumn(
                name: "PointId",
                table: "Players");

            migrationBuilder.DropColumn(
                name: "TurnOrder",
                table: "Players");

            migrationBuilder.RenameColumn(
                name: "CurrentPlayer",
                table: "GameSession",
                newName: "PlayerIdsInOrder");

            migrationBuilder.AddColumn<int>(
                name: "GameSessionId",
                table: "Point",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PlayerId",
                table: "Point",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "Highscore",
                table: "Players",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "CurrentPlayerID",
                table: "GameSession",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Point_GameSessionId",
                table: "Point",
                column: "GameSessionId");

            migrationBuilder.CreateIndex(
                name: "IX_Point_PlayerId",
                table: "Point",
                column: "PlayerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Point_GameSession_GameSessionId",
                table: "Point",
                column: "GameSessionId",
                principalTable: "GameSession",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Point_Players_PlayerId",
                table: "Point",
                column: "PlayerId",
                principalTable: "Players",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Point_GameSession_GameSessionId",
                table: "Point");

            migrationBuilder.DropForeignKey(
                name: "FK_Point_Players_PlayerId",
                table: "Point");

            migrationBuilder.DropIndex(
                name: "IX_Point_GameSessionId",
                table: "Point");

            migrationBuilder.DropIndex(
                name: "IX_Point_PlayerId",
                table: "Point");

            migrationBuilder.DropColumn(
                name: "GameSessionId",
                table: "Point");

            migrationBuilder.DropColumn(
                name: "PlayerId",
                table: "Point");

            migrationBuilder.DropColumn(
                name: "CurrentPlayerID",
                table: "GameSession");

            migrationBuilder.RenameColumn(
                name: "PlayerIdsInOrder",
                table: "GameSession",
                newName: "CurrentPlayer");

            migrationBuilder.AlterColumn<int>(
                name: "Highscore",
                table: "Players",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "GameSessionId",
                table: "Players",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PointId",
                table: "Players",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TurnOrder",
                table: "Players",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Players_GameSessionId",
                table: "Players",
                column: "GameSessionId");

            migrationBuilder.CreateIndex(
                name: "IX_Players_PointId",
                table: "Players",
                column: "PointId");

            migrationBuilder.AddForeignKey(
                name: "FK_Players_GameSession_GameSessionId",
                table: "Players",
                column: "GameSessionId",
                principalTable: "GameSession",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Players_Point_PointId",
                table: "Players",
                column: "PointId",
                principalTable: "Point",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
