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
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private TodoDbContext db;
        public ObservableCollection<Todo> Todos { get; set; }

        public MainWindow()
        {
            InitializeComponent();
            db = new TodoDbContext();
            Todos = new ObservableCollection<Todo>(db.Todos.ToList());
            lvTodos.ItemsSource = Todos;
            // set cbState ComboBox.ItemsSource to the Status enum values
            cbState.ItemsSource = Enum.GetValues(typeof(Todo.Status));
        }

        protected override void OnClosed(EventArgs e)
        {
            db.Dispose();
            base.OnClosed(e);
        }
    }
}
