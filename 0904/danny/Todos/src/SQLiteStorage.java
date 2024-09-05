import java.sql.*;
import java.util.ArrayList;

public class SQLiteStorage implements DataStorage {
    public SQLiteStorage() {
        try {
            // Class.forName("org.sqlite.JDBC");

            Connection connection = DriverManager.getConnection("jdbc:sqlite:todos.db");
            Statement statement = connection.createStatement();
            statement.executeUpdate("CREATE TABLE IF NOT EXISTS todos (task TEXT, due_date TEXT, hours_of_work INTEGER, status TEXT)");
            connection.close();
        } catch (SQLException e) {
            System.out.println("Database error: " + e.getMessage());
        }
    }

    @Override
    public ArrayList<Todo> loadData() {
        return loadDataFromDatabase();
    }

    ArrayList<Todo> loadDataFromDatabase() {
        ArrayList<Todo> todoList = new ArrayList<>();
        try {
            Connection connection = DriverManager.getConnection("jdbc:sqlite:todos.db");
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery("SELECT * FROM todos");
            while (resultSet.next()) {
                try {
                    Todo todo = new Todo(
                            resultSet.getString("task"),
                            resultSet.getString("due_date"),
                            resultSet.getInt("hours_of_work"),
                            resultSet.getString("status")
                    );
                    todoList.add(todo);
                } catch (IllegalArgumentException e) {
                    System.out.println("Invalid data: " + resultSet.getString("task"));
                }
            }
            connection.close();
        } catch (SQLException e) {
            System.out.println("Database error: " + e.getMessage());
        }
        return todoList;
    }

    @Override
    public void saveData(ArrayList<Todo> todoList) {
        saveDataToDatabase(todoList);
    }

    void saveDataToDatabase(ArrayList<Todo> todoList) {
        try {
            Connection connection = DriverManager.getConnection("jdbc:sqlite:todos.db");
            Statement statement = connection.createStatement();
            statement.executeUpdate("DROP TABLE IF EXISTS todos");
            statement.executeUpdate("CREATE TABLE todos (task TEXT, due_date TEXT, hours_of_work INTEGER, status TEXT)");
            for (Todo todo : todoList) {
                statement.executeUpdate("INSERT INTO todos (task, due_date, hours_of_work, status) VALUES ('" +
                        todo.getTask() + "', '" +
                        todo.getDueDateFormatted() + "', " +
                        todo.getHoursOfWork() + ", '" +
                        todo.getStatus() + "')");
            }
            connection.close();
        } catch (SQLException e) {
            System.out.println("Database error: " + e.getMessage());
        }
    }
}
