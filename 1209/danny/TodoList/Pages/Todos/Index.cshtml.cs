using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using TodoList.Data;

namespace TodoList.Pages.Todos
{
    public class IndexModel : PageModel
    {
        private readonly TodoList.Data.ApplicationDbContext _context;

        public IndexModel(TodoList.Data.ApplicationDbContext context)
        {
            _context = context;
        }

        [TempData]
        public string? Confirmation { get; set; }

        public IList<Todo> Todo { get; set; } = default!;

        public async Task OnGetAsync()
        {
            Todo = await _context.Todos
                .Include(t => t.Owner).ToListAsync();
        }
    }
}
