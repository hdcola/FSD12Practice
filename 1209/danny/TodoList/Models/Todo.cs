using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

public class Todo
{
    [Key]
    public int Id { get; set; }

    public string? UserId { get; set; }

    [Required]
    [StringLength(200, MinimumLength = 1, ErrorMessage = "Task must be between 1 and 200 characters")]
    public required string Task { get; set; }

    [Required]
    public DateTime DueDate { get; set; }

    public bool IsDone { get; set; } = false;

    [ForeignKey(nameof(UserId))]
    public IdentityUser? Owner { get; set; }
}