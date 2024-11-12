using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Data.Entity;
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

namespace TodoEF
{
    public delegate bool ValidationDelegate(Todo todo, out String[] results);

    public partial class MainWindow : Window
    {
        private TodoDbContext db;
        public ObservableCollection<Todo> Todos { get; set; }


        private Dictionary<String, ValidationDelegate> validationMethod;

        public MainWindow()
        {
            InitializeComponent();
            db = new TodoDbContext();
            Todos = new ObservableCollection<Todo>(db.Todos.ToList());
            lvTodos.ItemsSource = Todos;
            // set cbState ComboBox.ItemsSource to the Status enum values
            cbState.ItemsSource = Enum.GetValues(typeof(Todo.Status));

            // map xaml control names to validation methods
            validationMethod = new Dictionary<String, ValidationDelegate>
                    {
                        { "txtTask", Todo.ValidateTask }
                    };
        }

        protected override void OnClosed(EventArgs e)
        {
            db.Dispose();
            base.OnClosed(e);
        }

        private void btnAdd_Click(object sender, RoutedEventArgs e)
        {

        }

        private void btnDelete_Click(object sender, RoutedEventArgs e)
        {

        }

        private void ShowValidationError(Control control, String message)
        {
            // set red border
            control.BorderBrush = Brushes.Red;
            control.BorderThickness = new Thickness(2);

            // set tooltip
            ToolTip tt = new ToolTip();
            tt.Content = message;
            control.ToolTip = tt;
        }

        private void ClearValidationError(Control control)
        {
            // clear border
            control.ClearValue(Border.BorderBrushProperty);
            control.ClearValue(Border.BorderThicknessProperty);

            // clear tooltip
            control.ClearValue(ToolTipProperty);
        }

        private void txtTask_TextChanged(object sender, TextChangedEventArgs e)
        {
            // get sender name
            String name = ((TextBox)sender).Name;
            // get validation method
            if (validationMethod.TryGetValue(name, out ValidationDelegate method))
            {
                // validate input
                String[] results;
                if (!method(new Todo { Task = ((TextBox)sender).Text }, out results))
                {
                    // showvalidationError
                    string message = String.Join("\n", results);
                    ShowValidationError((Control)sender, message);
                }
                else
                {
                    // clear validation error
                    ClearValidationError((Control)sender);
                }
            }
        }
    }
}
