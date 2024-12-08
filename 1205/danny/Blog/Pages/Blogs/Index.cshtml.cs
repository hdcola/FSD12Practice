using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Blog.Data;
using Microsoft.AspNetCore.Identity;  // Add this

namespace Blog.Pages.Blogs
{
    public class IndexModel : PageModel
    {
        private readonly Blog.Data.ApplicationDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;  // Add this

        public IndexModel(Blog.Data.ApplicationDbContext context,
            UserManager<IdentityUser> userManager)  // Modify constructor
        {
            _context = context;
            _userManager = userManager;
        }

        public IList<Article> Article { get; set; } = default!;

        public async Task OnGetAsync()
        {
            var currentUser = await _userManager.GetUserAsync(User);
            Console.WriteLine(currentUser.Id);
            if (currentUser != null)
            {
                Article = await _context.Articles
                    .Include(a => a.User)
                    .Where(a => a.UserId == currentUser.Id)
                    .ToListAsync();
            }
        }
    }
}
