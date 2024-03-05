use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();

    // make sure we get the number of arguments we expect
    if args.len() > 2 {
        println!("Usage: {} <number>", args[0]);
        return;
    }

    // you can change default number_str
    let mut number_str: String = String::from("1231321");

    // you can change number_str from command line argument
    if args.len() == 2 {
        number_str = args[1].to_string();
    }

    // convert the string to a number
    let _number: i32 = match number_str.parse() {
        Ok(n) => n,
        Err(_) => {
            println!("{} is not a number", number_str);
            return;
        }
    };

    // use for reverse the number_str to reversed_number_str
    let mut reversed_number_str = String::new();
    for c in number_str.chars() {
        reversed_number_str = c.to_string() + &reversed_number_str;
    }

    if &reversed_number_str == &number_str {
        println!("{} is a palindrome", number_str);
    } else {
        println!("{} is not a palindrome", number_str);
    }
}
