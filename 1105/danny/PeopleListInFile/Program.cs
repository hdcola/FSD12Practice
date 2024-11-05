using System;

List<Person> people = new List<Person>();

void AddPersonInfo()
{
    string name = InputHelper.ReadString("Enter name:", 2, 100);
    int age = InputHelper.ReadInt("Enter age:", 0, 120);
    string city = InputHelper.ReadString("Enter city:", 2, 100);

    Person person = new Person
    {
        Name = name,
        Age = age,
        City = city
    };

    people.Add(person);
}

void ListAllPersonsInfo()
{
    foreach (Person person in people)
    {
        Console.WriteLine(person);
    }
}

void FindPersonByName()
{
    string name = InputHelper.ReadString("Enter name to search for:", 2, 100);
    bool found = false;
    foreach (Person person in people)
    {
        if (person.Name == name)
        {
            Console.WriteLine(person);
            found = true;
        }
    }
    if (!found)
    {
        Console.WriteLine("Person not found.");
    }
}

void FindPersonYoungerThan()
{
    int age = InputHelper.ReadInt("Enter age to search for:", 0, 120);
    bool found = false;
    foreach (Person person in people)
    {
        if (person.Age < age)
        {
            Console.WriteLine(person);
            found = true;
        }
    }
    if (!found)
    {
        Console.WriteLine("Person not found.");
    }
}

void WriteToFile()
{
    using (StreamWriter writer = new StreamWriter("people.txt"))
    {
        foreach (Person person in people)
        {
            writer.WriteLine($"{person.Name};{person.Age};{person.City}");
        }
    }
}

void ReadFromFile()
{
    people.Clear();

    if (!File.Exists("people.txt"))
    {
        return;
    }

    try
    {
        foreach (string line in File.ReadLines("people.txt"))
        {
            string[] parts = line.Split(';');
            if (parts.Length < 3) continue;

            if (int.TryParse(parts[1], out int age))
            {
                Person person = new Person
                {
                    Name = parts[0],
                    Age = age,
                    City = parts[2]
                };

                people.Add(person);
            }
            else
            {
                Console.WriteLine($"Invalid age format: '{parts[1]}' for person '{parts[0]}'");
            }
        }
    }
    catch (IOException e)
    {
        Console.WriteLine("Error reading file: " + e.Message);
    }
    catch (OutOfMemoryException e)
    {
        Console.WriteLine("Error: Out of memory - " + e.Message);
    }
}

string menu = """
1. Add person info
2. List persons info
3. Find a person by name
4. Find all persons younger than age
0. Exit
""";

ReadFromFile();
while (true)
{
    Console.WriteLine(menu);
    int choice = InputHelper.ReadInt("Enter choice:", 0, 4);
    switch (choice)
    {
        case 1:
            AddPersonInfo();
            break;
        case 2:
            ListAllPersonsInfo();
            break;
        case 3:
            FindPersonByName();
            break;
        case 4:
            FindPersonYoungerThan();
            break;
        case 0:
            WriteToFile();
            Console.WriteLine("Goodbye!");
            return;
    }
    Console.WriteLine("");
}