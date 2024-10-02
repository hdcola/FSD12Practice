package org.hdcola;

public class Main {
    public static void main(String[] args) {
        Fibonacci fib = new Fibonacci(true);
        System.out.println("10th is: "+fib.getNthFib(10));
        System.out.println(fib.toString());
        System.out.println("fibsCompCount is: " + fib.getCountOfFibsComputed());
        System.out.println("20th is: "+fib.getNthFib(20));
        System.out.println(fib.toString());
        System.out.println("fibsCompCount is: " + fib.getCountOfFibsComputed());
        System.out.println("====================================");
        BigFibonacci bigFib = new BigFibonacci(true);
        System.out.println("100th is: "+bigFib.getNthFib(100));
        System.out.println(bigFib.toString());
        System.out.println("fibsCompCount is: " + bigFib.getCountOfFibsComputed());
        System.out.println("20th is: " + bigFib.getNthFib(20));
        System.out.println(bigFib.toString());
        System.out.println("fibsCompCount is: " + bigFib.getCountOfFibsComputed());
    }
}