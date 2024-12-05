using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace bakery.Pages.Shared.Components.Basket
{
    public class BasketViewComponent : ViewComponent
    {
        public IViewComponentResult Invoke()
        {
            Models.Basket basket = new();
            if (Request.Cookies[nameof(Basket)] is not null)
            {
                var basketJson = Request.Cookies[nameof(Basket)];
                if (basketJson is not null)
                {
                    basket = JsonSerializer.Deserialize<Models.Basket>(basketJson) ?? new Models.Basket();
                }
            }
            return View(basket);
        }
    }
};
