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

        [Range(1, 5)]
        public int Difficulty { get; set; } // 1-5 only front-end validation

        [Required]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime DueDate { get; set; } // 1900-2099 year required, format in GUI is whatever the OS is configured to use

        [Required]
        public Status State { get; set; }
        public enum Status { Pending, Done, Delegated }
    }
}
