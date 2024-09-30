package org.hdcola;

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

    @Override
    public String toString() {
        return makeModel + " " + engineSizeL + " " + prodYear;
    }

    @Override
    public int compareTo(Car o) {
        return this.makeModel.compareTo(o.makeModel);
    }
}

