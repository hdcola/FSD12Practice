using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using TodoList.Data;
using Microsoft.Extensions.Logging;

namespace TodoList.Pages.Todos
{
    public class DeleteModel : PageModel
    {
        private readonly TodoList.Data.ApplicationDbContext _context;
        private readonly ILogger<DeleteModel> _logger;

        public DeleteModel(TodoList.Data.ApplicationDbContext context, ILogger<DeleteModel> logger)
        {
            _context = context;
            _logger = logger;
        }

        [BindProperty]
        public Todo Todo { get; set; } = default!;

        [TempData]
        public string? Confirmation { get; set; }

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var todo = await _context.Todos.FirstOrDefaultAsync(m => m.Id == id);

            if (todo == null)
            {
                return NotFound();
            }
            else
            {
                Todo = todo;
            }
            return Page();
        }

        public async Task<IActionResult> OnPostAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var todo = await _context.Todos.FindAsync(id);
            if (todo != null)
            {
                Todo = todo;
                _context.Todos.Remove(Todo);
                await _context.SaveChangesAsync();
                Confirmation = "Todo item deleted successfully!";
                _logger.LogInformation("Todo item deleted successfully - Id: {Id}, Task: {Task}, DueDate: {DueDate}, IsDone: {IsDone}, UserId: {UserId}",
                    Todo.Id, Todo.Task, Todo.DueDate, Todo.IsDone, Todo.UserId);
            }

            return RedirectToPage("./Index");
        }
    }
}
