using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
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
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace MidtermPizzaOrders
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private PizzaOrderDbContext db = new PizzaOrderDbContext();
        private ObservableCollection<PizzaOrder> pizzaOrders;

        public MainWindow()
        {
            InitializeComponent();

            pizzaOrders = new ObservableCollection<PizzaOrder>(db.PizzaOrders.ToList());
            LvOrders.ItemsSource = pizzaOrders;
        }

        private void MenuItem_Click(object sender, RoutedEventArgs e)
        {
            var newOrderDialog = new NewOrderDialog();
            bool? result = newOrderDialog.ShowDialog();
            if (result == true)
            {
                pizzaOrders.Add(newOrderDialog.Order);
                db.PizzaOrders.Add(newOrderDialog.Order);
                db.SaveChanges();
                updateDBAndRenderListView();
                LblStatusMessage.Text = "Order placed";
            }
        }

        private void updateDBAndRenderListView()
        {
            db.SaveChanges();
            pizzaOrders.Clear();
            db.PizzaOrders.ToList().ForEach(pizzaOrders.Add);
        }

        private void menuPlaced_Click(object sender, RoutedEventArgs e)
        {
            // get all selected orders
            List<PizzaOrder> selectedOrders = LvOrders.SelectedItems.Cast<PizzaOrder>().ToList();
            // set their status to Placed
            selectedOrders.ForEach(order => order.OrderStatus = PizzaOrder.OrderStatusEnum.Placed);
            // update the DB and re-render the ListView
            updateDBAndRenderListView();
        }

        private void menuFulfilled_Click(object sender, RoutedEventArgs e)
        {
            // get all selected orders
            List<PizzaOrder> selectedOrders = LvOrders.SelectedItems.Cast<PizzaOrder>().ToList();
            // set their status to Fulfilled
            selectedOrders.ForEach(order => order.OrderStatus = PizzaOrder.OrderStatusEnum.Fulfilled);
            // update the DB and re-render the ListView
            updateDBAndRenderListView();
        }
    }
}
