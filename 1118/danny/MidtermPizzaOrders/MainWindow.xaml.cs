using CsvHelper;
using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Globalization;
using System.IO;
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
            // update the status message
            LblStatusMessage.Text = "Order placed";
        }

        private void menuFulfilled_Click(object sender, RoutedEventArgs e)
        {
            // get all selected orders
            List<PizzaOrder> selectedOrders = LvOrders.SelectedItems.Cast<PizzaOrder>().ToList();
            // set their status to Fulfilled
            selectedOrders.ForEach(order => order.OrderStatus = PizzaOrder.OrderStatusEnum.Fulfilled);
            // update the DB and re-render the ListView
            updateDBAndRenderListView();
            // update the status message
            LblStatusMessage.Text = "Order fulfilled";
        }

        private void LvOrders_LoadingRow(object sender, DataGridRowEventArgs e)
        {
            // Get the DataRow
            PizzaOrder order = (PizzaOrder)e.Row.Item;
            // Set the background color of the row
            e.Row.Background = new SolidColorBrush((Color)ColorConverter.ConvertFromString(order.RowColor));
        }

        private void menuExit_Click(object sender, RoutedEventArgs e)
        {
            // display a standard dialog box asking the user "Are you sure you want to quit?" with Yes/No buttons. Only if user selects Yes the application terminates.
            MessageBoxResult result = MessageBox.Show("Are you sure you want to quit?", "Quit", MessageBoxButton.YesNo);
            if (result == MessageBoxResult.Yes)
            {
                Application.Current.Shutdown();
            }
        }

        private void Window_Closing(object sender, System.ComponentModel.CancelEventArgs e)
        {
            // display a standard dialog box asking the user "Are you sure you want to quit?" with Yes/No buttons. Only if user selects Yes the application terminates.
            MessageBoxResult result = MessageBox.Show("Are you sure you want to quit?", "Quit", MessageBoxButton.YesNo);
            if (result == MessageBoxResult.No)
            {
                e.Cancel = true;
            }
        }

        private void menuExport_Click(object sender, RoutedEventArgs e)
        {
            // Show SaveFileDialog with two filters for *.csv and *.*. 
            // If user selects a file, export the data to that file.
            SaveFileDialog saveFileDialog = new SaveFileDialog();
            saveFileDialog.Filter = "CSV files (*.csv)|*.csv|All files (*.*)|*.*";
            if (saveFileDialog.ShowDialog() == true)
            {
                // use CsvHelper to export the data to a CSV file
                using (var writer = new StreamWriter(saveFileDialog.FileName))
                using (var csv = new CsvWriter(writer, CultureInfo.InvariantCulture))
                {
                    csv.WriteRecords(pizzaOrders);
                }
                LblStatusMessage.Text = "Data exported to " + saveFileDialog.FileName;
            }
        }
    }
}
