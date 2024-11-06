using System;
using System.Text.RegularExpressions;

public class Person
{
    private string _name = "";
    public required string Name
    {
        get => _name;
        set
        {
            if (string.IsNullOrEmpty(value) || value.Length < 2 || value.Length > 100 || value.Contains(";"))
            {
                throw new ArgumentException("Name must be 2-100 characters long and not contain semicolons.");
            }
            _name = value;
        }
    }

    public required int Age { get; set; }

    private string _city = "";
    public required string City
    {
        get => _city;
        set
        {
            if (!Regex.IsMatch(value, @"^[^;]{2,100}$"))
            {
                throw new ArgumentException("City must be 2-100 characters long and not contain semicolons.");
            }
            _city = value;
        }
    }

    public override string ToString()
    {
        return $"Name: {Name}, Age: {Age}, City: {City}";
    }
}
