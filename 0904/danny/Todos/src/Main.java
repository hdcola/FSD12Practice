import java.time.format.DateTimeFormatter;
import java.time.LocalDate;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Scanner;

public class Main {
    static ArrayList<Todo> todoList = new ArrayList<>();
    static Scanner input = new Scanner(System.in);

    public static void main(String[] args) {
        addTodo();
    }

    public static void addTodo(){
        String task = inputString(input, "Enter task description: ");
        LocalDate dueDate = inputDate(input, "Enter due date (yyyy/mm/dd): ");
        int hoursOfWork = inputNumber(input, "Enter hours of work (integer): ");
        try {
            Todo todo = new Todo(task, dueDate, hoursOfWork);
            todoList.add(todo);
            System.out.println("You've created the following todo:");
            System.out.println(todo);
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
        }
    }

    public static int inputMainMenu(){
        while(true){
            System.out.println("Please make a choice [0-4]:");
            System.out.println("1. Add a todo");
            System.out.println("2. List all todos (numbered)");
            System.out.println("3. Delete a todo");
            System.out.println("4. Modify a todo");
            System.out.println("0. Exit");
            System.out.print("Pick an option: ");
            if(input.hasNextInt()){
                int option = input.nextInt();
                if(option >= 1 && option <= 3){
                    return option;
                }else if(option == 0) {
                    System.exit(0);
                }
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
            String dateString = scanner.next();
            try {
                return LocalDate.parse(dateString, formatter);
            } catch (Exception e) {
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
            if (scanner.hasNext()) {
                string = scanner.next();
                break;
            } else {
                System.out.println("Invalid input. Please enter a string.");
                scanner.next();
            }
        }
        return string;
    }

}