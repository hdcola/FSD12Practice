using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MidtermPizzaOrders
{
    [Table("PizzaOrders")]
    public class PizzaOrder
    {
        [Key]
        public int Id { get; set; }
        public string ClientName { get; set; } // 1-100 characters
        public string ClientPostalCode { get; set; } // regexp verified A1A 1A1 format
        public DateTime DeliveryDeadline { get; set; } = DateTime.Now.AddHours(1); // UI must verify it's at least 45 minutes past current date/time, otherwise order can't be placed

        public enum SizeEnum { Small = 3, Medium = 7, Large = 12 };
        public SizeEnum Size { get; set; } = SizeEnum.Large; // use ComboBox with Tags to match integer values of the enum

        public int BakingTimeMinutes { get; set; } = 15; // 12-18, slider with label displaying current value,

        public string Extras { get; set; } // comma-separated list, e.g. "ExtraCheese,DeepDish", based on UI checkboxes

        public enum OrderStatusEnum { Placed, Fulfilled };
        public OrderStatusEnum OrderStatus { get; set; } = OrderStatusEnum.Placed; // initially set to Placed


        // background color for the row
        [NotMapped]
        public string RowColor
        {
            get
            {
                if (OrderStatus == OrderStatusEnum.Fulfilled)
                {
                    return "White";
                }
                else if (DateTime.Now.AddMinutes(40) > DeliveryDeadline)
                {
                    return "Red";
                }
                else
                {
                    return "Green";
                }
            }
        }
        public override string ToString()
        {
            return "Client Name: " + ClientName + "\nClient Postal Code: " + ClientPostalCode + "\nDelivery Deadline: " + DeliveryDeadline + "\nSize: " + Size + "\nBaking Time: " + BakingTimeMinutes + "\nExtras: " + Extras + "\nOrder Status: " + OrderStatus;
        }
    }
}
