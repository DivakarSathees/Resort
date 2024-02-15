// Program.cs

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Text;
using System.Threading.Tasks;
using dotnetapp.Models;
using dotnetapp.Repository;
using dotnetapp.Service;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DevConnection")));

// Add authentication services
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["JWT:Issuer"],
            ValidAudience = builder.Configuration["JWT:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Key"]))
        };
    });

// Register services and repositories
builder.Services.AddScoped<UserService, UserServiceImpl>(); 
builder.Services.AddScoped<UserRepo>();
builder.Services.AddScoped<ResortService, ResortServiceImpl>();
builder.Services.AddScoped<ResortRepo>();
builder.Services.AddScoped<ReviewService, ReviewServiceImpl>();
builder.Services.AddScoped<ReviewRepo>();
builder.Services.AddScoped<BookingService, BookingServiceImpl>();
builder.Services.AddScoped<BookingRepo>();
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();


// // Seed roles (if needed)
// using (var scope = app.Services.CreateScope())
// {
//     var serviceProvider = scope.ServiceProvider;
//     var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();

//     // Define roles to be seeded
//     var roles = new[] { "Admin", "Customer" };

//     foreach (var role in roles)
//     {
//         var roleExists = await roleManager.RoleExistsAsync(role);
//         if (!roleExists)
//         {
//             // Create the role
//             var newRole = new IdentityRole(role);
//             var result = await roleManager.CreateAsync(newRole);

//             if (!result.Succeeded)
//             {
//                 // Handle error if role creation fails
//                 foreach (var error in result.Errors)
//                 {
//                     // Log or handle the error appropriately
//                     Console.WriteLine($"Error creating role {role}: {error.Description}");
//                 }
//             }
//         }
//     }
// }

app.MapControllers();
app.Run();
