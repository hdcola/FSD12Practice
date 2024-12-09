using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

public class Todo
{
    [Key]
    public int Id { get; set; }

    [Required]
    public required string UserId { get; set; }

    [Required]
    public required string Task { get; set; }

    [Required]
    public DateTime DueDate { get; set; }

    public bool IsDone { get; set; } = false;


    [ForeignKey(nameof(UserId))]
    public IdentityUser? Owner { get; set; }
}