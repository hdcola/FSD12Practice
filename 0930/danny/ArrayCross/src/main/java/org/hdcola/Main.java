package org.hdcola;

public class Main {
    public static void main(String[] args) {
        int[][] data = {{1, 2, 3, 4, 5}, {6, 7, 8, 9}, {10, 11, 12}};
        printArray(data);
        System.out.printf("%d row %d col getIfExists return %d\n", 1, 3, getIfExists(data, 1, 3));
        System.out.printf("%d row %d col getIfExists return %d\n", 2, 4, getIfExists(data, 2, 4));
        System.out.println("====================================");


        printArray(data);
        System.out.printf("sum of cross at %d row %d col is %d\n", 1, 3,  sumOfCross(data, 1, 3));
        System.out.printf("sum of cross at %d row %d col is %d\n", 1, 1, sumOfCross(data, 1, 1));
        System.out.println("====================================");

    }

    static int getIfExists(int[][] data, int row, int col) {
        if (row < data.length && col < data[row].length) {
            return data[row][col];
        } else {
            return 0;
        }
    }

    static int sumOfCross(int[][] data, int row, int col) {
        int sum = 0;
        if (isAvailable(data, row-1, col)) {
            sum += data[row-1][col];
        }
        if (isAvailable(data, row+1, col)) {
            sum += data[row+1][col];
        }
        if (isAvailable(data, row, col-1)) {
            sum += data[row][col-1];
        }
        if (isAvailable(data, row, col+1)) {
            sum += data[row][col+1];
        }
        return sum;
    }

    static boolean isAvailable(int[][] data, int row, int col) {
        return row < data.length && col < data[row].length && row >= 0 && col >= 0;
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