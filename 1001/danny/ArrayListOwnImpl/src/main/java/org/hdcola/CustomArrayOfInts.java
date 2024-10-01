package org.hdcola;

public class CustomArrayOfInts {
    private int [] data = new int[2]; // only grows by doubling size, never shrinks
    private int size = 0; // how many items do you really have

    public int size() { return size; }

    public void add(int value) {
        if (size == data.length) {
            int [] newData = new int[data.length * 2];
            arraycopy(data, 0, newData, 0, data.length);
            data = newData;
        }
        data[size++] = value;
    }
    public void deleteByIndex(int index) {
        if (index < 0 || index >= size) {
            throw new ArrayIndexOutOfBoundsException("Index out of bounds: " + index);
        }
        arraycopy(data, index + 1, data, index, size - index - 1);
        size--;
    }
    public boolean deleteByValue(int value) {
        for (int i = 0; i < size; i++) {
            if (data[i] == value) {
                deleteByIndex(i);
                return true;
            }
        }
        return false;
    } // delete first value matching, true if value found, false otherwise
    public void insertValueAtIndex(int value, int index) {
        if (index < 0 || index > size) {
            throw new ArrayIndexOutOfBoundsException("Index out of bounds: " + index);
        }
        if (size == data.length) {
            int [] newData = new int[data.length * 2];
            arraycopy(data, 0, newData, 0, data.length);
            data = newData;
        }
        arraycopy(data, index, data, index + 1, size - index);
        data[index] = value;
        size++;
    }
    public void clear() { size = 0; }
    public int get(int index) {
        if (index < 0 || index >= size) {
            throw new ArrayIndexOutOfBoundsException("Index out of bounds: " + index);
        }
        return data[index];
    } // may throw ArrayIndexOutOfBoundsException
    public int[] getSlice(int startIdx, int length) {
        if (startIdx < 0 || startIdx >= size) {
            throw new ArrayIndexOutOfBoundsException("Index out of bounds: " + startIdx);
        }
        if (length < 0 || startIdx + length > size) {
            throw new ArrayIndexOutOfBoundsException("Length out of bounds: " + length);
        }
        int [] slice = new int[length];
        arraycopy(data, startIdx, slice, 0, length);
        return slice;
    } // may throw ArrayIndexOutOfBoundsException
    public int[] toArray() {
        int [] result = new int[size];
        arraycopy(data, 0, result, 0, size);
        return result;
    } // ensure no reference leak

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < size; i++) {
            sb.append(data[i]);
            if (i < size - 1) {
                sb.append(", ");
            }
        }
        sb.append("]");
        return sb.toString();
    } // returns String similar to: [3, 5, 6, -23]

    // System.arraycopy fork
    private static void arraycopy(int[] src, int srcPos, int[] dest, int destPos, int length) {
        for (int i = 0; i < length; i++) {
            dest[destPos + i] = src[srcPos + i];
        }
    }
}
