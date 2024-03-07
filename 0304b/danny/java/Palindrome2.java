public class Palindrome2 {
    public static void main(String[] args) {
        if (args.length > 1) {
            System.out.println("Usage: java Palindrome <number>");
            return;
        }

        String numbeString = "123321";
        if (args.length == 1) {
            numbeString = args[0];
        }

        // try converting the string to a number, if it fails, print an error message
        try {
            int number = Integer.parseInt(numbeString);
            if (isPalindrome(number)) {
                System.out.println(numbeString + " is a palindrome");
            } else {
                System.out.println(numbeString + " is not a palindrome");
            }
        } catch (NumberFormatException e) {
            System.out.println("Error: " + numbeString + " is not a number");
        }
    }

    public static boolean isPalindrome(int number) {
        int reversedNumber = 0;
        int originalNumber = number;
        while (number != 0) {
            int digit = number % 10;
            reversedNumber = reversedNumber * 10 + digit;
            number /= 10;
        }
        return originalNumber == reversedNumber;
    }
}
