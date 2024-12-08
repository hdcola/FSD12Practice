using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
public class Article
{
    [Key]
    public int ArticleId { get; set; }

    [Required(ErrorMessage = "Title is required")]
    public required string Title { get; set; }
    public string Content { get; set; } = "";
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    [Required(ErrorMessage = "User is required")]
    public required string UserId { get; set; }

    [ForeignKey("UserId")]
    public required IdentityUser User { get; set; }
}