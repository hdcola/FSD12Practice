using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Blog.Models;

[Index(nameof(UserId))]
public class Blog
{
    [Key]
    public int BlogId { get; set; }

    [Required]
    [StringLength(200)]
    public required string Title { get; set; }

    [Required]
    public string Content { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    [Required]
    public required string UserId { get; set; }

    [ForeignKey(nameof(UserId))]
    public required IdentityUser User { get; set; }
}
