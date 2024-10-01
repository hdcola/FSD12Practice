package org.hdcola;

public class Main {
    public static void main(String[] args) {
        Fibonacci fib = new Fibonacci(true);
        System.out.println(fib.getNthFib(5));
        System.out.println(fib.toString());
        System.out.println(fib.getNthFib(10));
        System.out.println(fib.toString());
    }
}