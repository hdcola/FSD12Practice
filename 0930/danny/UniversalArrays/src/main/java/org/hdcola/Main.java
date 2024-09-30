package org.hdcola;

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        inputArray(new int[5]);
    }

    static void inputArray(int[] data) {
        System.out.println("Please input data.lengthintegers:", );
        try(Scanner scanner = new Scanner(System.in)) {
            for(int i = 0; i < data.length; i++) {
                data[i] = scanner.nextInt();
            }
        }
    }
}