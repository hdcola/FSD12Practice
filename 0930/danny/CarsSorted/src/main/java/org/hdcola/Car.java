package org.hdcola;

import java.util.Comparator;

public class Car implements Comparable<Car>{
    String makeModel;
    double engineSizeL;
    int prodYear;

    public Car(String makeModel, double engineSizeL, int prodYear) {
        this.makeModel = makeModel;
        this.engineSizeL = engineSizeL;
        this.prodYear = prodYear;
    }

    public int getProdYear() {
        return prodYear;
    }

    public String getMakeModel() {
        return makeModel;
    }

    @Override
    public String toString() {
        return makeModel + " " + engineSizeL + " " + prodYear;
    }

    @Override
    public int compareTo(Car o) {
        return this.makeModel.compareTo(o.makeModel);
    }
    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        Car car = (Car) obj;
        return engineSizeL==car.engineSizeL && prodYear == car.prodYear && makeModel.equals(car.makeModel);
    }

    public final static Comparator<Car> sortByProdYear = new CarsSortByProdYear();

    static class CarsSortByProdYear implements Comparator<Car> {
        @Override
        public int compare(Car o1, Car o2) {
            return o1.prodYear-o2.prodYear;
        }
    }

    public final static Comparator<Car> sortByEngineSize = new CarsSortByEngineSize();

    static class CarsSortByEngineSize implements Comparator<Car> {
        @Override
        public int compare(Car o1, Car o2) {
            return (int)(o1.engineSizeL*1000000) - (int)( o2.engineSizeL*1000000);
        }
    }
}

