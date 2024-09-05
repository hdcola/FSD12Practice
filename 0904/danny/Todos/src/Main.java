import java.io.File;
import java.io.FileNotFoundException;
import java.time.format.DateTimeFormatter;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Scanner;

public class Main {
    static ArrayList<Todo> todoList = new ArrayList<>();
    static Scanner input = new Scanner(System.in);

    public static void main(String[] args) {
        loadDataFromFile();
        int option = 5;
        while (option != 0){
            option = inputMainMenu();
            switch (option){
                case 1:
                    addTodo();
                    break;
                case 2:
                    listTodos();
                    break;
                case 3:
                    deleteTodo();
                    break;
                case 4:
                    modifyTodo();
                    break;
                case 0:
                    System.out.println("Exiting. Good bye!");
                    saveDataToFile();
                    System.exit(0);
                default:
                    System.out.println("Invalid option. Please try again.");
            }
        }
    }


    static void loadDataFromFile(){
        loadDataFromFile("todos.txt");
    }

    static void loadDataFromFile(String filename) {
        try {
            Scanner fileScanner = new Scanner(new File(filename));
            while (fileScanner.hasNextLine()) {
                String dataLine = fileScanner.nextLine();
                try{
                    Todo todo = new Todo(dataLine);
                    todoList.add(todo);
                }catch (IllegalArgumentException e){
                    System.out.println("Invalid data: " + dataLine);
                }
            }
            fileScanner.close();
        } catch (FileNotFoundException e) {
            System.out.println("File not found: " + filename);
        }
    }

    static void saveDataToFile(){
        saveDataToFile("todos.txt");
    }

    static void saveDataToFile(String filename) {
        try {
            java.io.PrintWriter fileWriter = new java.io.PrintWriter(filename);
            for (Todo todo : todoList) {
                fileWriter.println(todo.toDataString());
            }
            fileWriter.close();
        } catch (FileNotFoundException e) {
            System.out.println("File not found: " + filename);
        }
    }

    public static void deleteTodo(){
        if(todoList.isEmpty()){
            System.out.println("There are no todos to delete.");
        }else{
            listTodos();
            int todoIndex = inputNumber(input, "Deleting a todo. Which todo # would you like to delete? ");
            if(todoIndex >= 1 && todoIndex <= todoList.size()){
                Todo todo = todoList.remove(todoIndex - 1);
                System.out.println("Deleted todo #"+ todoIndex +" successfully.");
            }else{
                System.out.println("Invalid todo number.");
            }
        }
    }

    public static void modifyTodo(){
        if(todoList.isEmpty()){
            System.out.println("There are no todos to modify.");
        }else{
            listTodos();
            int todoIndex = inputNumber(input, "Modifying a todo. Which todo # would you like to modify? ");
            if(todoIndex >= 1 && todoIndex <= todoList.size()){
                Todo todo = todoList.get(todoIndex - 1);
                System.out.println("Modifying todo " + todo);
                String task = inputString(input, "Enter new task description: ");
                LocalDate dueDate = inputDate(input, "Enter new due date (yyyy/mm/dd): ");
                int hoursOfWork = inputNumber(input, "Enter new hours of work (integer): ");
                Todo.TaskStatus status = inputEnum(input, "Enter if task is 'Done' or 'Pending': ", Todo.TaskStatus.class);
                try {
                    todo.setTask(task);
                    todo.setDueDate(dueDate);
                    todo.setHoursOfWork(hoursOfWork);
                    todo.setStatus(status);
                    System.out.println("You've modified todo #"+ todoIndex +" as follows:");
                    System.out.println(todo);
                } catch (IllegalArgumentException e) {
                    System.out.println(e.getMessage());
                }
            }else{
                System.out.println("Invalid todo number.");
            }
        }
    }

    public static void listTodos(){
        if(todoList.isEmpty()){
            System.out.println("There are no todos.");
        }else{
            for(int i = 0; i < todoList.size(); i++) {
                System.out.println("#" + (i + 1) + ": " + todoList.get(i));
            }
        }
    }

    public static void addTodo(){
        String task = inputString(input, "Enter task description: ");
        LocalDate dueDate = inputDate(input, "Enter due date (yyyy/mm/dd): ");
        int hoursOfWork = inputNumber(input, "Enter hours of work (integer): ");
        Todo.TaskStatus status = Todo.TaskStatus.Pending;
        try {
            Todo todo = new Todo(task, dueDate, hoursOfWork, status);
            todoList.add(todo);
            System.out.println("You've created the following todo:");
            System.out.println(todo);
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
        }
    }

    public static int inputMainMenu(){
        while(true){
            System.out.println("\nPlease make a choice [0-4]:");
            System.out.println("1. Add a todo");
            System.out.println("2. List all todos (numbered)");
            System.out.println("3. Delete a todo");
            System.out.println("4. Modify a todo");
            System.out.println("0. Exit");
            System.out.print("Pick an option: ");
            if(input.hasNextInt()){
                int number = input.nextInt();
                input.nextLine();
                return number;
            }else{
                input.next();
            }
            System.out.println("Invalid option. Please try again.");
        }
    }

    public static LocalDate inputDate(Scanner scanner, String prompt) {
        DateTimeFormatter formatter =DateTimeFormatter.ofPattern("yyyy/M/d");
        while (true) {
            System.out.print(prompt);
            String dateString = scanner.nextLine();
            try {
                return LocalDate.parse(dateString, formatter);
            } catch (java.time.format.DateTimeParseException e) {
                System.out.println("Invalid date. Please enter a valid date in the format yyyy/mm/dd.");
            }
        }
    }

    public static int inputNumber(Scanner scanner, String prompt) {
        int number;
        while (true) {
            System.out.print(prompt);
            if (scanner.hasNextInt()) {
                number = scanner.nextInt();
                scanner.nextLine();
                break;
            } else {
                System.out.println("Invalid input. Please enter an integer.");
                scanner.next();
            }
        }
        return number;
    }

    public static String inputString(Scanner scanner, String prompt) {
        String string;
        while (true) {
            System.out.print(prompt);
            if (scanner.hasNextLine()) {
                string = scanner.nextLine();
                break;
            } else {
                System.out.println("Invalid input. Please enter a string.");
                scanner.next();
            }
        }
        return string;
    }

    public static <T extends Enum<T>> T inputEnum(Scanner scanner, String prompt, Class<T> enumType) {
        while (true) {
            System.out.print(prompt);
            try {
                if (scanner.hasNextLine()) {
                    String statusString = scanner.nextLine();
                    return Enum.valueOf(enumType, statusString);
                }
            } catch (IllegalArgumentException e) {
                System.out.println("Invalid input. Please enter a valid value for " + enumType.getSimpleName() + ".");
            }

        }
    }
}