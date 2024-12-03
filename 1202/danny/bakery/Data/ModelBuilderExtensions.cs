using bakery.Models;
using Microsoft.EntityFrameworkCore;

namespace bakery.Data;

public static class ModelBuilderExtensions
{
    public static void Seed(this ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>().HasData(
            new Product
            {
                Id = 1,
                Name = "Apple Pie",
                Description = "A classic apple pie with a flaky crust and a hint of cinnamon.",
                Price = 12.99m,
                ImageName = "apple_pie.jpg"
            },
            new Product
            {
                Id = 2,
                Name = "Chocolate Cake",
                Description = "A rich and decadent chocolate cake with layers of chocolate frosting.",
                Price = 15.99m,
                ImageName = "chocolate_cake.jpg"
            },
            new Product
            {
                Id = 3,
                Name = "Blueberry Muffin",
                Description = "A moist and fluffy blueberry muffin bursting with fresh blueberries.",
                Price = 3.99m,
                ImageName = "blueberry_muffin.jpg"
            }
        );
    }
}