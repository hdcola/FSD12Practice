using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using TodoList.Data;
using Microsoft.AspNetCore.Identity;

namespace TodoList.Pages.Todos
{
    public class IndexModel : PageModel
    {
        private readonly TodoList.Data.ApplicationDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;

        public IndexModel(TodoList.Data.ApplicationDbContext context, UserManager<IdentityUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [TempData]
        public string? Confirmation { get; set; }

        public IList<Todo> Todo { get; set; } = default!;

        public async Task OnGetAsync()
        {
            var currentUser = await _userManager.GetUserAsync(User);
            if (currentUser != null)
            {
                Todo = await _context.Todos
                    .Include(t => t.Owner)
                    .Where(t => t.UserId == currentUser.Id)
                    .ToListAsync();
            }
        }
    }
}
