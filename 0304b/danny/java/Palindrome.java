/**
 * Palindrome
 */
public class Palindrome {

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
            int _ = Integer.parseInt(numbeString);
            if (isPalindrome(numbeString)) {
                System.out.println(numbeString + " is a palindrome");
            } else {
                System.out.println(numbeString + " is not a palindrome");
            }
        } catch (NumberFormatException e) {
            System.out.println("Error: " + numbeString + " is not a number");
        }

    }

    public static boolean isPalindrome(String str) {
        int i = 0;
        int j = str.length();
        String reversedString = "";
        for (; i < j; i++) {
            reversedString = str.charAt(i) + reversedString;
        }
        if (reversedString.equals(str)) {
            return true;
        }
        return false;
    }
}