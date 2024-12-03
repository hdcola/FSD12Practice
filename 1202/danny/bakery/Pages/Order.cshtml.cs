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
    public async Task OnGetAsync()
    {
        var product = await context.Products.FindAsync(Id);
        if (product != null)
        {
            Product = product;
        }
    }
}
