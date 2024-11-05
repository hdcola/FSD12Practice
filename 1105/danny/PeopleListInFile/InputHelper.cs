using System;

public class InputHelper
{
    static public string ReadString(string prompt, int minLength, int maxLength)
    {
        string input;
        bool isValid; 
        do
        {
            Console.Write(prompt);
            input = Console.ReadLine() ?? string.Empty;
            isValid = input.Length >= minLength && input.Length <= maxLength && !input.Contains(';'); // Use char overload
            if (!isValid)
            {
                Console.WriteLine($"Invalid input. Please enter a valid string with a length between {minLength} and {maxLength} characters.");
            }
        } while (!isValid);
        return input;
    }

    static public int ReadInt(string prompt, int min, int max)
    {
        int input;
        bool isValid;
        do
        {
            Console.Write(prompt);
            isValid = int.TryParse(Console.ReadLine(), out input);
            if (!isValid || input < min || input > max)
            {
                Console.WriteLine($"Invalid input. Please enter a valid integer between {min} and {max}");
                isValid = false;
            }
        } while (!isValid);
        return input;
    }
}
