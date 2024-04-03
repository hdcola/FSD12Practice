use std::env;
use std::fs;

fn main() {
    let mut input_file = "EmployeesSalary.txt";

    let args: Vec<String> = env::args().collect();
    if args.len() == 1 {
        input_file = &args[1];
    }

    let output_file = "EmployeesUpdatedSalary.txt";
    update_salary(input_file, output_file);
}

fn update_salary(input_file: &str, output_file: &str) {
    // Read the file and update the salary
    let contents = fs::read_to_string(input_file).expect("Something went wrong reading the file");
    // parse lastname,firstname,salary,increase
    let lines = contents.lines();
    let mut updated_lines = Vec::new();
    for line in lines {
        let parts: Vec<&str> = line.split(" ").collect();
        let lastname = parts[0];
        let firstname = parts[1];
        let salary = parts[2].parse::<f64>().unwrap();
        let increase = parts[3].parse::<f64>().unwrap();
        let updated_salary = salary + (salary * increase / 100.0);
        let updated_line = format!("{} {} {:.2}", firstname, lastname, updated_salary);
        updated_lines.push(updated_line);
    }
    // Write the updated salary to the output file
    let output = updated_lines.join("\n");
    fs::write(output_file, output).expect("Unable to write file");
}
