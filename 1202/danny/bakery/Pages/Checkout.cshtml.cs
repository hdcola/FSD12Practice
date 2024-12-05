using System.ComponentModel.DataAnnotations;
using System.Text.Json;
using bakery.Data;
using bakery.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace bakery.Pages
{
    public class CheckoutModel : PageModel
    {
        private readonly BakeryContext context;

        public CheckoutModel(BakeryContext context)
        {
            this.context = context;
        }

        public Basket Basket { get; set; } = new();
        public List<Product> SelectedProducts { get; set; } = new();

        [BindProperty, Required, Display(Name = "Your Email Address")]
        public string OrderEmail { get; set; }
        [BindProperty, Required, Display(Name = "Shipping Address")]
        public string ShippingAddress { get; set; }
        [TempData]
        public string Confirmation { get; set; }

        public async Task OnGetAsync()
        {
            if (Request.Cookies[nameof(Basket)] is not null)
            {
                var basketJson = Request.Cookies[nameof(Basket)];
                if (basketJson is not null)
                {
                    Basket = JsonSerializer.Deserialize<Basket>(basketJson) ?? new Basket();
                    if (Basket.NumberOfItems > 0)
                    {
                        var selectedProducts = Basket.Items.Select(x => x.ProductId).ToArray();
                        SelectedProducts = await context.Products.Where(x => selectedProducts.Contains(x.Id)).ToListAsync();

                    }
                }
            }
        }

        public async Task<IActionResult> OnPostAsync()
        {
            if (ModelState.IsValid && Request.Cookies[nameof(Basket)] is not null)
            {
                var basketJson = Request.Cookies[nameof(Basket)];
                if (basketJson is not null)
                {
                    Basket = JsonSerializer.Deserialize<Basket>(basketJson) ?? new Basket();
                    if (Basket.NumberOfItems > 0)
                    {
                        // var order = new Order
                        // {
                        //     OrderEmail = OrderEmail,
                        //     ShippingAddress = ShippingAddress,
                        //     OrderDate = DateTime.Now,
                        //     OrderItems = Basket.Items.Select(x => new OrderItem
                        //     {
                        //         ProductId = x.ProductId,
                        //         Quantity = x.Quantity,
                        //         UnitPrice = x.UnitPrice
                        //     }).ToList()
                        // };
                        // context.Orders.Add(order);
                        // await context.SaveChangesAsync();
                        await Task.Run(() => Response.Cookies.Append(nameof(Basket), string.Empty, new CookieOptions { Expires = DateTime.Now.AddDays(-1) }));
                        Confirmation = "Thank you for your order!";
                        return RedirectToPage("/OrderSuccess");
                    }
                }
            }
            return Page();
        }
    }
}
