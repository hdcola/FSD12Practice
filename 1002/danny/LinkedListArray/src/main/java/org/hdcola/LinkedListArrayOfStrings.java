package org.hdcola;

public class LinkedListArrayOfStrings {
    private class Container {
        Container next;
        String value;
    }
    private Container start, end;
    private int size;

    public void add(String value) {
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

    public String get(int index) throws IndexOutOfBoundsException {
        return getContainer(index).value;
    }

    public void insertValueAtIndex(String value, int index) throws IndexOutOfBoundsException {
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

    public void replaceValueAtIndex(String value, int index) {
        Container traversal = getContainer(index);
        traversal.value = value;
    } // put

    public void deleteByIndex(int index) {
        if (index < 0 || index >= size) {
            throw new IndexOutOfBoundsException();
        }
        if (index == 0) {
            start = start.next;
            if (start == null) {
                end = null;
            }
        } else {
            Container traversal = getContainer(index - 1);
            traversal.next = traversal.next.next;
            if (traversal.next == null) {
                end = traversal;
            }
        }
        size--;
    }
    public boolean deleteByValue(String value) {
        Container traversal = start;
        Container previous = null;
        while(traversal != null) {
            if (traversal.value.equals(value)) {
                if (previous == null) {
                    start = start.next;
                } else {
                    previous.next = traversal.next;
                }

                if (traversal.next == null) {
                    end = previous;
                }

                traversal.next = null;
                traversal = null ;

                size--;
                return true;
            }
            previous = traversal;
            traversal = traversal.next;
        }
        return false;
    } // delete first value found

    public int getSize() {
        return size;
    }

    @Override
    public String toString() {
        StringBuffer sb = new StringBuffer();
        sb.append("[");
        Container traversal = start;
        while(traversal != null) {
            sb.append(traversal.value);
            if (traversal.next != null){
                sb.append(",");
            }
            traversal = traversal.next;
        }
        sb.append("]");
        return sb.toString();
    } // comma-separated values list similar to: [5,8,11]

    public String[] toArray() {
        String[] array = new String[size];
        Container traversal = start;
        for (int i = 0; i < size; i++) {
            array[i] = traversal.value;
            traversal = traversal.next;
        }
        return array;
    } // could be used for Unit testing

}
