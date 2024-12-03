using bakery.Data;
using bakery.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace bakery.Pages;

public class IndexModel : PageModel
{
    private readonly BakeryContext _context;

    public IndexModel(BakeryContext context)
    {
        _context = context;
    }

    public List<Product> Products { get; set; } = new();

    public async Task OnGetAsync()
    {
        Products = await _context.Products.ToListAsync();
    }
}
