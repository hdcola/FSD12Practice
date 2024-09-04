import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int randomCount = inputNumber(scanner,"How many random integers do you want to generate? ");
        if (randomCount <= 0) {
            System.out.println("Thank you, bye.");
            System.exit(0);
        }
        String userName = inputString(scanner,"What is your name?");
        int startRange = inputNumber(scanner,"Enter minimum: ");
        int endRange = inputNumber(scanner,"Enter maximum: ");
        if (startRange > endRange) {
            System.out.println("Invalid input. Minimum must be less than or equal to maximum.");
            System.exit(0);
        }
        genRandomInt(randomCount, startRange, endRange);
        System.out.println("Did I do well, " + userName + "?");
    }

    public static void genRandomInt(int randomCount, int startRange, int endRange) {
        System.out.print("Result: ");
        for (int i = 0; i < randomCount; i++) {
            int randomInt = (int) (Math.random() * (endRange - startRange + 1) + startRange);
            if (i == randomCount - 1) {
                System.out.print(randomInt);
            } else {
                System.out.print(randomInt + ", ");
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
                // scanner.next();
                System.exit(0);
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