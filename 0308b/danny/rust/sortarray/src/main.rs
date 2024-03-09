fn main() {
    let mut a = [3, 2, 5];
    for i in 0..a.len() {
        for j in i + 1..a.len() {
            if a[i] > a[j] {
                let temp = a[i];
                a[i] = a[j];
                a[j] = temp;
            }
        }
    }
    for i in 0..a.len() {
        println!("{}", a[i]);
    }
}
