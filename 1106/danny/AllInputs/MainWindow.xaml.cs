using System.IO;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace AllInputs
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private string age = "below 18";
        private string saveFile = @"..\..\..\data.txt";

        public MainWindow()
        {
            InitializeComponent();
        }

        private void btnRegister_Click(object sender, RoutedEventArgs e)
        {
            // Check txtName, if it is empty, show error message
            if (string.IsNullOrEmpty(txtName.Text))
            {
                MessageBox.Show("Name is required", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
                return;
            }

            // get Pets list
            List<string> pets = new List<string>();
            if (chkCat.IsChecked == true)
            {
                pets.Add("cat");
            }
            if (chkDog.IsChecked == true)
            {
                pets.Add("dog");
            }
            if (chkOther.IsChecked == true)
            {
                pets.Add("other");
            }

            string item = $"{txtName.Text};{age};{string.Join(',', pets)};{cbContinent.Text};{sliderTemp.Value}";

            try
            {
                // check saveFile exists
                if (!File.Exists(saveFile))
                {
                    File.Create(saveFile).Close();
                }
                // append item to saveFile
                File.AppendAllText(saveFile, item + Environment.NewLine);
            }
            catch (UnauthorizedAccessException ex)
            {
                MessageBox.Show("Access denied to the file: " + ex.Message, "Permission Error", MessageBoxButton.OK, MessageBoxImage.Warning);
            }
            catch (IOException ex)
            {
                MessageBox.Show("I/O error occurred: " + ex.Message, "I/O Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
            catch (Exception ex)
            {
                MessageBox.Show("An unexpected error occurred: " + ex.Message, "Unknown Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }

            txtName.Text = "";
            chkCat.IsChecked = false;
            chkDog.IsChecked = false;
            chkOther.IsChecked = false;
            cbContinent.SelectedIndex = 0;
            sliderTemp.Value = 25;
            rbBelow18.IsChecked = true;
        }

        private void RadioButton_Checked(object sender, RoutedEventArgs e)
        {
            RadioButton? rb = sender as RadioButton;
            if (rb != null && rb.Content != null)
            {
                age = rb.Content.ToString()!;
            }
        }
    }
}