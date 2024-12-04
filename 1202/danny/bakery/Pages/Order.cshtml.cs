using System.ComponentModel.DataAnnotations;
using bakery.Data;
using bakery.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace bakery.Pages;

public class OrderModel : PageModel
{
    private BakeryContext context;
    public OrderModel(BakeryContext context) =>
        this.context = context;

    [BindProperty(SupportsGet = true)]
    public int Id { get; set; }
    public Product Product { get; set; } = new();

    [BindProperty, Range(1, int.MaxValue, ErrorMessage = "You must order at least one item")]
    public int Quantity { get; set; } = 1;
    [BindProperty, Required, EmailAddress, Display(Name = "Your Email Address")]
    public string OrderEmail { get; set; } = "";
    [BindProperty, Required, Display(Name = "Shipping Address")]
    public string ShippingAddress { get; set; } = "";
    [BindProperty]
    public decimal UnitPrice { get; set; }
    [TempData]
    public string? Confirmation { get; set; }

    public async Task OnGetAsync()
    {
        var product = await context.Products.FindAsync(Id);
        if (product != null)
        {
            Product = product;
        }
    }

    public async Task<IActionResult> OnPostAsync()
    {
        var product = await context.Products.FindAsync(Id);
        if (product == null) return NotFound();
        Product = product;
        if (ModelState.IsValid)
        {
            Confirmation = @$"You have ordered {Quantity} x {Product.Name} 
                        at a total cost of {Quantity * UnitPrice:c}";
            return RedirectToPage("/OrderSuccess");
        }
        return Page();
    }
}
