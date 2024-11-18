using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace MidtermPizzaOrders
{
    /// <summary>
    /// Interaction logic for NewOrderDialog.xaml
    /// </summary>
    public partial class NewOrderDialog : Window
    {
        public PizzaOrder Order { get; set; } = new PizzaOrder();

        private bool isClientNameValid = true;
        private bool isClientPostalCodeValid = true;
        private bool isDeliveryTimeValid = true;

        public NewOrderDialog()
        {
            InitializeComponent();
            // set dpDate to Order.DeliveryDeadline
            dpDate.SelectedDate = Order.DeliveryDeadline.Date;
            // set textTime to Order.DeliveryDeadline hh:mm
            textTime.Text = Order.DeliveryDeadline.ToString("HH:mm");

            // set cbSize ItemsSource to PizzaOrder.SizeEnum    
            cbSize.ItemsSource = Enum.GetValues(typeof(PizzaOrder.SizeEnum));
            cbSize.SelectedItem = Order.Size;


        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            if (sender is Button)
            {
                var button = (Button)sender;
                if ((string)button.Content == "Place order")
                {
                    validClientName();
                    validPostalCode();
                    validDeliveryTime();

                    if (!isClientNameValid || !isClientPostalCodeValid || !isDeliveryTimeValid)
                    {
                        return;
                    }

                    Order.ClientName = textClientName.Text;
                    Order.ClientPostalCode = textClientPostalCode.Text;
                    Order.DeliveryDeadline = dpDate.SelectedDate.Value.Add(TimeSpan.Parse(textTime.Text));
                    Order.Size = (PizzaOrder.SizeEnum)cbSize.SelectedItem;
                    Order.BakingTimeMinutes = (int)sldBakingTimeMinutes.Value;

                    List<string> extras = new List<string>();
                    if (chkCheese.IsChecked == true)
                    {
                        extras.Add("ExtraCheese");
                    }
                    if (chkDish.IsChecked == true)
                    {
                        extras.Add("DeepDish");
                    }
                    if (chkWheat.IsChecked == true)
                    {
                        extras.Add("WholeWheat");
                    }
                    Order.Extras = string.Join(",", extras);

                    DialogResult = true;
                    Close();
                }
                else if ((string)button.Content == "Cancel")
                {
                    DialogResult = false;
                    Close();
                }
            }
        }

        private void textClientName_TextChanged(object sender, TextChangedEventArgs e)
        {
            validClientName();
        }

        private void validClientName()
        {
            // validate client name should be 1-100 characters
            if (textClientName.Text.Length < 1 || textClientName.Text.Length > 100)
            {
                textClientName.Background = Brushes.Red;
                textClientNameError.Text = "Client name must be 1-100 characters";
                isClientNameValid = false;
            }
            else
            {
                textClientName.Background = Brushes.White;
                textClientNameError.Text = "";
                isClientNameValid = true;
            }
        }

        private void textClientPostalCode_TextChanged(object sender, TextChangedEventArgs e)
        {
            validPostalCode();
        }

        private void validPostalCode()
        {
            // validate postal code should be in A1A 1A1 format
            if (System.Text.RegularExpressions.Regex.IsMatch(textClientPostalCode.Text, @"^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$"))
            {
                textClientPostalCode.Background = Brushes.White;
                textClientPostalCodeError.Text = "";
                isClientPostalCodeValid = true;
            }
            else
            {
                textClientPostalCode.Background = Brushes.Red;
                textClientPostalCodeError.Text = "Postal code must be in A1A 1A1 format";
                isClientPostalCodeValid = false;
            }
        }

        private void textTime_TextChanged(object sender, TextChangedEventArgs e)
        {
            validDeliveryTime();
        }

        private void validDeliveryTime()
        {
            // dpDate and textTime must be at least 45 minutes past current date/time
            if (dpDate.SelectedDate != null && textTime.Text.Length > 0)
            {
                DateTime deliveryDateTime = dpDate.SelectedDate.Value.Add(TimeSpan.Parse(textTime.Text));
                if (deliveryDateTime < DateTime.Now.AddMinutes(45))
                {
                    dpDate.Background = Brushes.Red;
                    textTime.Background = Brushes.Red;
                    textTimeError.Text = "Delivery time must be at least 45 minutes from now";
                    isDeliveryTimeValid = false;
                }
                else
                {
                    dpDate.Background = Brushes.White;
                    textTime.Background = Brushes.White;
                    textTimeError.Text = "";
                    isDeliveryTimeValid = true;
                }
            }
        }

        private void sldBakingTimeMinutes_ValueChanged(object sender, RoutedPropertyChangedEventArgs<double> e)
        {
            labSize.Content = sldBakingTimeMinutes.Value.ToString();
        }
    }
}
