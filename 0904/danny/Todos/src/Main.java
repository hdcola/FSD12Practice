import java.time.format.DateTimeFormatter;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Scanner;

public class Main {
    static ArrayList<Todo> todoList = new ArrayList<>();
    static Scanner input = new Scanner(System.in);
    static DataStorage dataStorage = new FileStorage();

    public static void main(String[] args) {
        loadData();
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
                    saveData();
                    break;
                default:
                    System.out.println("Invalid option. Please try again.");
            }
        }
    }


    static void loadData(){
        todoList = dataStorage.loadData();
    }


    static void saveData(){
        dataStorage.saveData(todoList);
    }


    public static void deleteTodo(){
        if(todoList.isEmpty()){
            System.out.println("There are no todos to delete.");
        }else{
            listTodos();
            int todoIndex = inputNumber("Deleting a todo. Which todo # would you like to delete? ");
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
            int todoIndex = inputNumber("Modifying a todo. Which todo # would you like to modify? ");
            if(todoIndex >= 1 && todoIndex <= todoList.size()){
                Todo todo = todoList.get(todoIndex - 1);
                System.out.println("Modifying todo " + todo);
                String task = inputString("Enter new task description: ");
                LocalDate dueDate = inputDate("Enter new due date (yyyy/mm/dd): ");
                int hoursOfWork = inputNumber("Enter new hours of work (integer): ");
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
        String task = inputString("Enter task description: ");
        LocalDate dueDate = inputDate("Enter due date (yyyy/mm/dd): ");
        int hoursOfWork = inputNumber("Enter hours of work (integer): ");
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

    public static LocalDate inputDate( String prompt) {
        DateTimeFormatter formatter =DateTimeFormatter.ofPattern("yyyy/M/d");
        while (true) {
            System.out.print(prompt);
            String dateString = input.nextLine();
            try {
                return LocalDate.parse(dateString, formatter);
            } catch (java.time.format.DateTimeParseException e) {
                System.out.println("Invalid date. Please enter a valid date in the format yyyy/mm/dd.");
            }
        }
    }

    public static int inputNumber(String prompt) {
        int number;
        while (true) {
            System.out.print(prompt);
            if (input.hasNextInt()) {
                number = input.nextInt();
                input.nextLine();
                break;
            } else {
                System.out.println("Invalid input. Please enter an integer.");
                input.next();
            }
        }
        return number;
    }

    public static String inputString(String prompt) {
        String string;
        while (true) {
            System.out.print(prompt);
            if (input.hasNextLine()) {
                string = input.nextLine();
                break;
            } else {
                System.out.println("Invalid input. Please enter a string.");
                input.next();
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