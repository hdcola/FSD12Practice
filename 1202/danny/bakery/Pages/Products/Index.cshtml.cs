using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using bakery.Data;
using bakery.Models;

namespace bakery.Pages.Products
{
    public class IndexModel : PageModel
    {
        private readonly bakery.Data.BakeryContext _context;

        public IndexModel(bakery.Data.BakeryContext context)
        {
            _context = context;
        }

        public IList<Product> Product { get;set; } = default!;

        public async Task OnGetAsync()
        {
            Product = await _context.Products.ToListAsync();
        }
    }
}
