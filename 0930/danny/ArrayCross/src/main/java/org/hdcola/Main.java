package org.hdcola;

public class Main {
    public static void main(String[] args) {
        int[][] data2D = {
                {1, 3, 6, 8},
                {7, 1, 2, 3},
                {8, 3, 2, 1},
                {1, 7, 1, 9},
        };

        int[][] data2Djagged = {
                {1, 3, 6, 8, 9, 1},
                {7, 1, 2, 3},
                {8, 3, 2},
                {1, 7, 1, 9},
        };

        int[] smallestItem = findSmallestItemSumOfCross(data2D);
        printArray(data2D);
        System.out.printf("Smallest item is %d at (%d, %d)\n", smallestItem[0], smallestItem[1], smallestItem[2]);
        System.out.println("=====================================");

        int[] smallestItem2 = findSmallestItemSumOfCross(data2Djagged);
        printArray(data2Djagged);
        System.out.printf("Smallest item is %d at (%d, %d)\n", smallestItem2[0], smallestItem2[1], smallestItem2[2]);
        System.out.println("=====================================");


        printArray(data2D);
        System.out.println("-------------------------------------");
        printArray(getSumOfCrossArray(data2D));
        System.out.println("=====================================");

        printArray(data2Djagged);
        System.out.println("-------------------------------------");
        printArray(getSumOfCrossArray(data2Djagged));
        System.out.println("=====================================");

    }

    static int[][] getSumOfCrossArray(int[][] data) {
        int[][] sumOfCrossArray = new int[data.length][];
        for (int i = 0; i < data.length; i++) {
            sumOfCrossArray[i] = new int[data[i].length];
            for (int j = 0; j < data[i].length; j++) {
                sumOfCrossArray[i][j] = sumOfCross(data, i, j);
            }
        }
        return sumOfCrossArray;
    }

    static int[] findSmallestItemSumOfCross(int[][] data) {
        if (data.length == 0) {
            return new int[] {0, -1, -1};
        }
        int[] smallestItem = {data[0][0], 0, 0};
        for (int i = 0; i < data.length; i++) {
            for (int j = 0; j < data[i].length; j++) {
                int sum = sumOfCross(data, i, j) + data[i][j];
                if (sum < smallestItem[0]) {
                    smallestItem[0] = sum;
                    smallestItem[1] = i;
                    smallestItem[2] = j;
                }
            }
        }
        return smallestItem;
    }

    static int getIfExists(int[][] data, int row, int col) {
        if (row >= 0 && col >= 0 && row < data.length && col < data[row].length) {
            return data[row][col];
        } else {
            return 0;
        }
    }

    static int sumOfCross(int[][] data, int row, int col) {
        int sum = 0;
        sum = getIfExists(data, row-1, col);
        sum += getIfExists(data, row, col-1);
        sum += getIfExists(data, row+1, col);
        sum += getIfExists(data, row, col+1);
        return sum;
    }

    static int[][] duplicateEmptyArray2D(int[][] orig2d){
        int[][] newArray = new int[orig2d.length][];
        for (int i = 0; i < orig2d.length; i++) {
            newArray[i] = new int[orig2d[i].length];
        }
        return newArray;
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
}