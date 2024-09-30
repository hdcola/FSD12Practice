package org.hdcola;

import java.util.Comparator;

public class EngineSizeComparator implements Comparator<Car> {
    @Override
    public int compare(Car o1, Car o2) {
        return Double.compare(o1.engineSizeL, o2.engineSizeL);
    }
}
