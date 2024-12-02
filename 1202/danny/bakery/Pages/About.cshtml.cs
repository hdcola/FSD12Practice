using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace bakery.Pages
{
    public class AboutModel : PageModel
    {
        public string TimeOfDay { get; set; } = "evening";
        public void OnGet()
        {
            TimeOfDay = "evening";
            if (DateTime.Now.Hour < 12)
            {
                TimeOfDay = "morning";
            }
            else if (DateTime.Now.Hour < 18)
            {
                TimeOfDay = "afternoon";
            }
        }
    }
}
