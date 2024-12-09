using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using TodoList.Data;

namespace TodoList.Pages.Todos
{
    public class EditModel : PageModel
    {
        private readonly TodoList.Data.ApplicationDbContext _context;

        public EditModel(TodoList.Data.ApplicationDbContext context)
        {
            _context = context;
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
            Todo = todo;
            return Page();
        }

        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more information, see https://aka.ms/RazorPagesCRUD.
        public async Task<IActionResult> OnPostAsync()
        {
            // Add date validation
            if (Todo.DueDate.Year < 2000 || Todo.DueDate.Year > 2099)
            {
                ModelState.AddModelError("Todo.DueDate", "Date must be between 2000 and 2099");
                return Page();
            }

            if (!ModelState.IsValid)
            {
                return Page();
            }

            var existingTodo = await _context.Todos.FindAsync(Todo.Id);
            if (existingTodo == null)
            {
                return NotFound();
            }

            existingTodo.Task = Todo.Task;
            existingTodo.DueDate = Todo.DueDate;
            existingTodo.IsDone = Todo.IsDone;

            try
            {
                await _context.SaveChangesAsync();
                Confirmation = "Todo item updated successfully!";
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TodoExists(Todo.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return RedirectToPage("./Index");
        }

        private bool TodoExists(int id)
        {
            return _context.Todos.Any(e => e.Id == id);
        }
    }
}
