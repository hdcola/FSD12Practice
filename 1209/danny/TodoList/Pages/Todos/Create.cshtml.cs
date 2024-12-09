using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using TodoList.Data;
using Microsoft.AspNetCore.Identity;

namespace TodoList.Pages.Todos
{
    public class CreateModel : PageModel
    {
        private readonly TodoList.Data.ApplicationDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;

        public CreateModel(TodoList.Data.ApplicationDbContext context, UserManager<IdentityUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public IActionResult OnGet()
        {
            return Page();
        }

        [BindProperty]
        public Todo Todo { get; set; } = default!;

        [TempData]
        public string? Confirmation { get; set; }
        // For more information, see https://aka.ms/RazorPagesCRUD.
        public async Task<IActionResult> OnPostAsync()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Challenge();
            }

            // Add date validation
            if (Todo.DueDate.Year < 2000 || Todo.DueDate.Year > 2099)
            {
                ModelState.AddModelError("Todo.DueDate", "Date must be between 2000 and 2099");
                return Page();
            }

            Todo.UserId = user.Id;

            if (!ModelState.IsValid)
            {
                return Page();
            }

            _context.Todos.Add(Todo);
            await _context.SaveChangesAsync();
            Confirmation = "Todo item created successfully!";

            return RedirectToPage("./Index");
        }
    }
}
