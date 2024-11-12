using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TodoEF
{
    [Table("Todos")]
    public class Todo
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [Index(IsUnique = false)]
        [StringLength(100)]
        [RegularExpression(@"^[a-zA-Z0-9\s\./,;+\(\)\*!-]*$", ErrorMessage = "Only letters, digits, space, and ./,;-+)(*! are allowed.")]
        public string Task { get; set; } // 1-100 characters, only letters, digits, space ./,;-+)(*! allowed

        [Range(1, 5, ErrorMessage = "Difficulty must be between 1 and 5.")]
        public int Difficulty { get; set; } // 1-5 only front-end validation

        [Required]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime DueDate { get; set; } // 1900-2099 year required, format in GUI is whatever the OS is configured to use

        [Required]
        [EnumDataType(typeof(Status), ErrorMessage = "Invalid status value.")]
        public Status State { get; set; }
        public enum Status { Pending, Done, Delegated }

        public static bool ValidateTask(Todo todo, out String[] results)
        {
            results = new String[0];
            if (todo.Task.Length < 1 || todo.Task.Length > 100)
            {
                Array.Resize(ref results, results.Length + 1);
                results[results.Length - 1] = "Task must be between 1 and 100 characters.";
            }
            if (!System.Text.RegularExpressions.Regex.IsMatch(todo.Task, @"^[a-zA-Z0-9\s\./,;+\(\)\*!-]*$"))
            {
                Array.Resize(ref results, results.Length + 1);
                results[results.Length - 1] = "Only letters, digits, space, and ./,;-+)(*! are allowed.";
            }
            return results.Length == 0;
        }
    }
}
