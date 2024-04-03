use std::env;

fn main() {
    let mut input_file = "EmployeesSalary.txt";

    let args: Vec<String> = env::args().collect();
    if (args.len() == 1) {
        input_file = &args[1];
    }

    let output_file = "EmployeesUpdatedSalary.txt";
}
