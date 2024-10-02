package org.hdcola;

import java.lang.reflect.Array;

public class LinkedListArray<T> {


    private class Container {
        Container next;
        T value;
    }
    private Container start, end;
    private int size;

    public void add(T value) {
        Container container = new Container();
        container.value = value;
        if (start == null) {
            start = container;
        } else {
            end.next = container;
        }
        end = container;
        size++;
    }

    private Container getContainer(int index) {
        if (index < 0 || index >= size) {
            throw new IndexOutOfBoundsException();
        }
        Container traversal = start;
        // traverse the list to the index
        for(int i = 0; i< index; i++) {
            traversal = traversal.next;
        }
        return traversal;
    }

    public T get(int index) throws IndexOutOfBoundsException {
        return getContainer(index).value;
    }

    public void insertValueAtIndex(T value, int index) throws IndexOutOfBoundsException {
        Container container = new Container();
        container.value = value;
        if (index == 0){
            container.next = start;
            start = container;
        }else {
            Container traversal = getContainer(index - 1);
            container.next = traversal.next;
            traversal.next = container;
        }
        size++;
    }

    public void replaceValueAtIndex(T value, int index) {
        Container traversal = getContainer(index);
        traversal.value = value;
    } // put

    public void deleteByIndex(int index) {
        if (index < 0 || index >= size) {
            throw new IndexOutOfBoundsException();
        }
        if (index == 0) {
            start = start.next;
        } else {
            Container traversal = getContainer(index - 1);
            traversal.next = traversal.next.next;
        }
        size--;
    }

    public boolean deleteByValue(T value) {
        if (start == null) {
            return false;
        }
        Container traversal = start;
        if (traversal.value.equals(value)) {
            start = start.next;
            if (start == null) {
                end = null;
            }
            size--;
            return true;
        }
        while (traversal.next != null) {
            if (traversal.next.value.equals(value)) {
                traversal.next = traversal.next.next;
                if (traversal.next == null) {
                    end = traversal;
                }
                size--;
                return true;
            }
            traversal = traversal.next;
        }
        return false;
    }

    public int getSize() {
        return size;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        Container traversal = start;
        sb.append("[");
        while (traversal != null) {
            sb.append(traversal.value);
            if (traversal.next != null) {
                sb.append(",");
            }
            traversal = traversal.next;
        }
        sb.append("]");
        return sb.toString();
    }

    @SuppressWarnings("unchecked")
    public <T>T[] toArray() {
        Class<T> clazz = (Class<T>) start.value.getClass();
        T[] array = (T[]) Array.newInstance(clazz, size);
        Container traversal = start;
        for (int i = 0; i < size; i++) {
            array[i] = clazz.cast(traversal.value);
            traversal = traversal.next;
        }
        return array;
    }
}
