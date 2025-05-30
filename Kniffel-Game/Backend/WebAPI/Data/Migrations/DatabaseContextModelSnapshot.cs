﻿// <auto-generated />
using System;
using Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Data.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    partial class DatabaseContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Models.GameSession", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("CurrentPlayerID")
                        .HasColumnType("int");

                    b.Property<DateTime>("LastPlayedTime")
                        .HasColumnType("datetime2");

                    b.Property<int>("Round")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("GameSession");
                });

            modelBuilder.Entity("Models.GameSessionPlayer", b =>
                {
                    b.Property<int>("GameSessionId")
                        .HasColumnType("int");

                    b.Property<int>("PlayerId")
                        .HasColumnType("int");

                    b.Property<int>("Order")
                        .HasColumnType("int");

                    b.Property<int>("PlayerGamePointId")
                        .HasColumnType("int");

                    b.HasKey("GameSessionId", "PlayerId");

                    b.HasIndex("PlayerGamePointId");

                    b.HasIndex("PlayerId");

                    b.ToTable("GameSessionPlayer");
                });

            modelBuilder.Entity("Models.Player", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("Highscore")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Player");
                });

            modelBuilder.Entity("Models.PlayerGamePoint", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("Bonus")
                        .HasColumnType("int");

                    b.Property<int>("Bottom_Sum")
                        .HasColumnType("int");

                    b.Property<int?>("Chance")
                        .HasColumnType("int");

                    b.Property<int?>("Fives")
                        .HasColumnType("int");

                    b.Property<int?>("Four_of_a_Kind")
                        .HasColumnType("int");

                    b.Property<int?>("Fours")
                        .HasColumnType("int");

                    b.Property<int?>("Full_House")
                        .HasColumnType("int");

                    b.Property<int?>("Kniffel")
                        .HasColumnType("int");

                    b.Property<int?>("Large_Street")
                        .HasColumnType("int");

                    b.Property<int?>("Ones")
                        .HasColumnType("int");

                    b.Property<int?>("Sixes")
                        .HasColumnType("int");

                    b.Property<int?>("Small_Street")
                        .HasColumnType("int");

                    b.Property<int?>("Three_of_a_Kind")
                        .HasColumnType("int");

                    b.Property<int?>("Threes")
                        .HasColumnType("int");

                    b.Property<int>("Top_Sum")
                        .HasColumnType("int");

                    b.Property<int>("Total_Sum")
                        .HasColumnType("int");

                    b.Property<int>("Total_Top")
                        .HasColumnType("int");

                    b.Property<int?>("Twos")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("PlayerGamePoint");
                });

            modelBuilder.Entity("Models.GameSessionPlayer", b =>
                {
                    b.HasOne("Models.GameSession", "GameSession")
                        .WithMany("GameSessionPlayers")
                        .HasForeignKey("GameSessionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Models.PlayerGamePoint", "PlayerGamePoint")
                        .WithMany()
                        .HasForeignKey("PlayerGamePointId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Models.Player", "Player")
                        .WithMany("GameSessionPlayers")
                        .HasForeignKey("PlayerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("GameSession");

                    b.Navigation("Player");

                    b.Navigation("PlayerGamePoint");
                });

            modelBuilder.Entity("Models.GameSession", b =>
                {
                    b.Navigation("GameSessionPlayers");
                });

            modelBuilder.Entity("Models.Player", b =>
                {
                    b.Navigation("GameSessionPlayers");
                });
#pragma warning restore 612, 618
        }
    }
}
