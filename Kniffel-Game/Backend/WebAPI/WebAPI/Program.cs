using Business.Interfaces;
using Business.Services;
using Data;
using Data.Repositories;
using DataContracts.Interfaces;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<DatabaseContext>(opt =>
{
    opt.UseSqlServer(
        builder.Configuration.GetConnectionString("KniffelConnection"));
});

// Service Injection
builder.Services.AddScoped<IPlayerService, PlayerService>();



// Repository Injection
builder.Services.AddScoped<IPlayerRepository, PlayerRepository>();





var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
