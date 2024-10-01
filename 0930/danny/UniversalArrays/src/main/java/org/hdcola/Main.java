package org.hdcola;

import java.util.Arrays;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        int[] data = new int[5];
        inputArray(data);
        System.out.println("The array is: " );
        printArray(data);
        System.out.println("========================================");

        int[][] data2d = new int[2][3];
        inputArray(data2d);
        System.out.println("The 2D array is: " );
        printArray(data2d);
        System.out.println("========================================");

        int[] data2 = {1, 2, 3, 4, 5};
        printArray(data2);
        System.out.println("========================================");

        int[][] data2d2 = {{-234234, 9, 4, 22}, {3, 128, -2}, {123,  -7,  0,  1, 7}};
        printArray(data2d2);
        System.out.println("========================================");


        int[] a1 = {1, 2, 3};
        int[] a2 = {7, 5};
        int[] result = concatArrays(a1, a2);
        printArray(a1);
        printArray(a2);
        System.out.println("The concatenated array is: ");
        printArray(result);
        System.out.println("========================================");

        int[] a3 = {1, 2, 3, 2, 3, 5};
        int[] a4 = {7, 5, 3, 3, 0};
        int[] duplicates = findDuplicates(a3, a4);
        printArray(a3);
        printArray(a4);
        System.out.println("The duplicates are: ");
        printArray(duplicates);
        System.out.println("========================================");

        int[][] a5 = {{1, 2, 3}, {4, 5, 6}};
        int[][] a6 = {{7, 5, 3}, {3, 3, 1}};
        int[] duplicates2 = findDuplicates(a5, a6);
        printArray(a5);
        System.out.println();
        printArray(a6);
        System.out.println("The duplicates are: ");
        printArray(duplicates2);
    }

    static void inputArray(int[] data) {
        System.out.printf("Please input %d integers:\n", data.length);
        try (Scanner scanner = new Scanner(System.in)) {
            for (int i = 0; i < data.length; i++) {
                System.out.printf("Enter value %d: ", i + 1);
                data[i] = scanner.nextInt();
            }
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
    }

    static void inputArray(int [][] data2d){
        System.out.printf("Please input %dx%d integers(end the row if input is not an int):\n", data2d.length, data2d[0].length);
        try (Scanner scanner = new Scanner(System.in)) {
            for (int i = 0; i < data2d.length; i++) {
                for (int j = 0; j < data2d[i].length; j++) {
                    System.out.printf("Enter value row %d column %d: ", i + 1, j + 1);
                    String input = scanner.nextLine();
                    // if the input is not an integer, skip this row
                    try {
                        data2d[i][j] = Integer.parseInt(input);
                    } catch (NumberFormatException e) {
                        // remove other item in the row
                        int[] row = new int[j];
                        System.arraycopy(data2d[i], 0, row, 0, j);
                        data2d[i] = row;
                        System.out.println("Invalid input, skipping this row.");
                        break;
                    }
                }
            }
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
    }

    static void printArray(int [] data) {
        for(int i = 0; i < data.length; i++) {
            if (i == data.length - 1) {
                System.out.printf("%d\n", data[i]);
            } else {
                System.out.printf("%d, ", data[i]);
            }
        }
    }

    static  void printArray(int[][] data2d){
        int [] columnWidths = getColumnWidths(data2d);
        for (int i = 0; i < data2d.length; i++) {
            for (int j = 0; j < data2d[i].length; j++) {
                if (j == data2d[i].length - 1) {
                    System.out.printf("%" + columnWidths[j] + "d\n", data2d[i][j]);
                } else {
                    System.out.printf("%" + columnWidths[j] + "d, ", data2d[i][j]);
                }
            }
        }
    }

    static int[] getColumnWidths(int[][] data2d) {
        // find the max column count
        int maxColumn = 0;
        for (int[] row : data2d) {
            if (row.length > maxColumn) {
                maxColumn = row.length;
            }
        }

        int[] columnWidths = new int[maxColumn];

        for (int[] row : data2d) {
            for (int j = 0; j < row.length; j++) {
                int length = String.valueOf(row[j]).length();
                if (length > columnWidths[j]) {
                    columnWidths[j] = length;
                }
            }
        }
        return columnWidths;
    }

    static int[] concatArrays(int [] a1, int[]a2){
        int [] result = new int[a1.length + a2.length];
        for (int i = 0; i < a1.length; i++) {
            result[i] = a1[i];
        }
        for (int i = 0; i < a2.length; i++) {
            result[a1.length + i] = a2[i];
        }
        return result;
    }

    static int[] findDuplicates(int [] a1, int[]a2) {
        int count = 0;

        int[] result = new int[Math.min(a1.length , a2.length)];

        for (int i = 0; i < a1.length; i++) {
            for (int j = 0; j < a2.length; j++) {
                if (a1[i] == a2[j]) {
                    // check if the number is already in the result
                    boolean found = false;
                    for(int n: result) {
                        if (n == a1[i]) {
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        result[count] = a1[i];
                        count++;
                    }
                }
            }
        }

        // remove the empty space
        int[] finalResult = new int[count];
        System.arraycopy(result, 0, finalResult, 0, count);
        return finalResult;
    }

    static int[] findDuplicates(int [][] a1, int[][]a2) {
        int count = 0;
        int[] result = new int[Math.min(getArrayLength(a1), getArrayLength(a2))];
        for (int i = 0; i < a1.length; i++) {
            for (int j = 0; j < a1[i].length; j++) {
                for (int k = 0; k < a2.length; k++) {
                    for (int l = 0; l < a2[k].length; l++) {
                        if (a1[i][j] == a2[k][l]) {
                            // check if the number is already in the result
                            boolean found = false;
                            for(int n: result) {
                                if (n == a1[i][j]) {
                                    found = true;
                                    break;
                                }
                            }
                            if (!found) {
                                result[count] = a1[i][j];
                                count++;
                            }
                        }
                    }
                }
            }
        }
        // remove the empty space
        int[] finalResult = new int[count];
        System.arraycopy(result, 0, finalResult, 0, count);
        return finalResult;
    }

    static int getArrayLength(int[][] a1) {
        int count = 0;
        for (int i = 0; i < a1.length; i++) {
            count += a1[i].length;
        }
        return count;
    }
}