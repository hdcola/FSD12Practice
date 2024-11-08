using System.Configuration;
using System.Data;
using System.Windows;

namespace AllInputs
{
    /// <summary>
    /// Interaction logic for App.xaml
    /// </summary>
    public partial class App : Application
    {
        private void Application_DispatcherUnhandledException(object sender, System.Windows.Threading.DispatcherUnhandledExceptionEventArgs e)
        {
            MessageBox.Show("An unhandled exception just occurred: " + e.Exception.Message, "Unknown Exception", MessageBoxButton.OK, MessageBoxImage.Error);
            e.Handled = true;
        }
    }

}
