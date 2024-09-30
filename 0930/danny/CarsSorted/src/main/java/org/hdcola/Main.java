package org.hdcola;

import java.io.File;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Scanner;

public class Main {

    static ArrayList<Car> parking = new ArrayList<>();

    public static void main(String[] args) {
        readDataFromFile();
        parking.add(new Car("Nissan", 2, 2024));
        parking.add(new Car("Toyota", 1.6, 2020));
        parking.add(new Car("Ford", 2.5, 2018));
        parking.add(new Car("Chevrolet", 1.8, 2019));
        parking.add(new Car("Honda", 2.2, 2021));

        // sort parking by makeModel
        parking.sort(null);
        System.out.println("Sorted by makeModel:");
                parking.forEach(System.out::println);

        // sort parking by engineSizeL
        parking.sort(new EngineSizeComparator());
        System.out.println("\nSorted by engineSizeL:");
        parking.forEach(System.out::println);

        // use lambda expression sort parking by prodYear
        parking.sort((o1, o2) -> Integer.compare(o1.getProdYear(), o2.getProdYear()));
        System.out.println("\nSorted by prodYear:");
        parking.forEach(System.out::println);

        //use Comparator::CONSTANT to sort parking by prodYear
        parking.sort(Comparator.comparingInt(Car::getProdYear));
        System.out.println("\nSorted by prodYear:");
        parking.forEach(System.out::println);
    }

    static void readDataFromFile() {
        String fileName = "cars.txt";
        try (Scanner scanner= new Scanner(new File(fileName))){
            while (scanner.hasNext()){
                String line = scanner.nextLine();
                String[] parts = line.split(";");
                String makeModel = parts[0];
                String engineSizeL = parts[1];
                String prodYear = parts[2];
                try {
                    parking.add(new Car(makeModel, Double.parseDouble(engineSizeL), Integer.parseInt(prodYear)));
                }catch (NumberFormatException e){
                    System.out.println("Invalid data in file: " + line);
                }
            }
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}