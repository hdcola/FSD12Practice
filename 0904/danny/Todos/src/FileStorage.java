import java.io.File;
import java.util.ArrayList;
import java.util.Scanner;

public class FileStorage implements DataStorage {

    @Override
    public ArrayList<Todo> loadData() {
        return loadDataFromFile("todos.txt");
    }

    ArrayList<Todo> loadDataFromFile(String filename) {
        ArrayList<Todo> todoList = new ArrayList<>();
        try(Scanner fileScanner = new Scanner(new File(filename))) {
            while (fileScanner.hasNextLine()) {
                String dataLine = fileScanner.nextLine();
                try{
                    Todo todo = new Todo(dataLine);
                    todoList.add(todo);
                }catch (IllegalArgumentException e){
                    System.out.println("Invalid data: " + dataLine);
                }
            }
        } catch (Exception e) {
            System.out.println("Read data error: " + filename);
        }
        return todoList;
    }
    
    @Override
    public void saveData(ArrayList<Todo> todoList) {
        saveDataToFile("todos.txt", todoList);
    }

    void saveDataToFile(String filename, ArrayList<Todo> todoList) {
        try (java.io.PrintWriter fileWriter = new java.io.PrintWriter(filename);){
            for (Todo todo : todoList) {
                fileWriter.println(todo.toDataString());
            }
        } catch (Exception e) {
            System.out.println("Write data error: " + filename);
        }
    }
}
