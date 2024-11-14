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

        // map xaml control names to validation methods
        private Dictionary<String, ValidationDelegate> validationMethod;

        private Todo currentTodo = new Todo();

        public MainWindow()
        {
            InitializeComponent();

            // create db context and load Todos
            db = new TodoDbContext();

            // set lvTodos ListView.ItemsSource to Todos ObservableCollection
            Todos = new ObservableCollection<Todo>(db.Todos.ToList());
            lvTodos.ItemsSource = Todos;
            // add GridViewColumnHeader.ClickEvent event handler
            AddHandler(GridViewColumnHeader.ClickEvent, new RoutedEventHandler(GridViewColumnHeader_Click));

            // set cbState ComboBox.ItemsSource to the Status enum values
            cbState.ItemsSource = Enum.GetValues(typeof(Todo.Status));

            // set currentTodo to the first item in Todos
            renderCurrentTodo();

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

        private void updateDbAndRenderListView()
        {
            db.SaveChanges();
            Todos.Clear();
            db.Todos.ToList().ForEach(Todos.Add);
        }

        private void renderCurrentTodo()
        {
            txtTask.Text = currentTodo.Task;
            cbState.SelectedValue = currentTodo.State;
            dpDueDate.SelectedDate = currentTodo.DueDate;
            sldDifficulty.Value = currentTodo.Difficulty;
        }

        private void newTodoAndRender()
        {
            currentTodo = new Todo();
            renderCurrentTodo();
            btnDelete.IsEnabled = false;
            btnUpdate.IsEnabled = false;
        }

        private void btnAdd_Click(object sender, RoutedEventArgs e)
        {
            // create new Todo from input
            Todo todo = new Todo
            {
                Task = txtTask.Text,
                State = (Todo.Status)cbState.SelectedValue,
                DueDate = dpDueDate.SelectedDate ?? DateTime.Now,
                Difficulty = (int)sldDifficulty.Value
            };
            db.Todos.Add(todo);
            updateDbAndRenderListView();
            newTodoAndRender();
        }

        private void btnDelete_Click(object sender, RoutedEventArgs e)
        {
            // remove currentTodo from db and update ListView
            db.Todos.Remove(currentTodo);
            updateDbAndRenderListView();
            newTodoAndRender();
        }

        private void lvTodos_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            currentTodo = (Todo)lvTodos.SelectedItem;
            if (currentTodo != null)
            {
                btnDelete.IsEnabled = true;
                btnUpdate.IsEnabled = true;
                renderCurrentTodo();
            }
            else
            {
                btnDelete.IsEnabled = false;
                btnUpdate.IsEnabled = false;
            }
        }

        private void btnUpdate_Click(object sender, RoutedEventArgs e)
        {
            if (currentTodo != null)
            {
                currentTodo.Task = txtTask.Text;
                currentTodo.State = (Todo.Status)cbState.SelectedValue;
                currentTodo.DueDate = dpDueDate.SelectedDate ?? DateTime.Now;
                currentTodo.Difficulty = (int)sldDifficulty.Value;
                updateDbAndRenderListView();
                newTodoAndRender();
            }
        }

        private void txtTask_TextChanged(object sender, TextChangedEventArgs e)
        {
            if (sender is TextBox)
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
                        tbTaskError.Text = message;
                    }
                    else
                    {
                        // clear validation error
                        tbTaskError.Text = "";
                    }
                }
            }
        }

        private void btnExport_Click(object sender, RoutedEventArgs e)
        {
            // export Todos to a file
            Microsoft.Win32.SaveFileDialog dlg = new Microsoft.Win32.SaveFileDialog
            {
                FileName = "Todos",
                DefaultExt = ".txt",
                Filter = "Text documents (.txt)|*.txt"
            };
            Nullable<bool> result = dlg.ShowDialog();
            if (result == true)
            {
                string filename = dlg.FileName;
                System.IO.File.WriteAllLines(filename, Todos.Select(todo => todo.ToString()));
            }
            lbStatus.Text = $"Exported {Todos.Count} Todos to {dlg.FileName}";
        }

        private void MenuIztem_Click(object sender, RoutedEventArgs e)
        {
            var selectItems = lvTodos.SelectedItems;
            foreach (Todo todo in selectItems)
            {
                db.Todos.Remove(todo);
            }
            updateDbAndRenderListView();
            newTodoAndRender();
            lbStatus.Text = $"Deleted your selected item(s).";
        }

        private void GridViewColumnHeader_Click(object sender, RoutedEventArgs e)
        {
            var headerClicked = e.OriginalSource as GridViewColumnHeader;
            if (headerClicked != null)
            {
                string header = headerClicked.Column.Header as string;
                if (header == "Task")
                {
                    lvTodos.ItemsSource = Todos.OrderBy(todo => todo.Task);
                }
                else if (header == "State")
                {
                    lvTodos.ItemsSource = Todos.OrderBy(todo => todo.State);
                }
                else if (header == "Due Date")
                {
                    lvTodos.ItemsSource = Todos.OrderBy(todo => todo.DueDate);
                }
                else if (header == "Difficulty")
                {
                    lvTodos.ItemsSource = Todos.OrderBy(todo => todo.Difficulty);
                }
                else if (header == "Id")
                {
                    lvTodos.ItemsSource = Todos.OrderBy(todo => todo.Id);
                }
                lbStatus.Text = $"Sorted by {header}";
            }
        }
    }
}
