package org.hdcola;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.Iterator;
import java.util.NoSuchElementException;
import java.util.Spliterator;
import java.util.function.Consumer;

public class PriorityStack<T> implements Iterable<T> {
    // you may add a constructor if you like (but I don't see why)


    private class Container {
        // add a constructor and/or toString if you like
        T value;
        boolean hasPriority;
        Container nextBelow;
        // you are NOT allowed to add "previousAbove" reference
    }


    private Container top; // top of the stack element


    private int size;

    public void push(T value) {
        push(value, false);
    }


    public void push(T value, boolean hasPriority) {
        Container newContainer = new Container();
        newContainer.value = value;
        newContainer.hasPriority = hasPriority;
        newContainer.nextBelow = top;
        top = newContainer;
        size++;
    }


    public T pop() {
        // remove and return the top item
        // if no item found (size == 0) then throw NoSuchElementException
        if (size == 0) {
            throw new NoSuchElementException();
        }
        T value = top.value;
        top = top.nextBelow;
        size--;
        return value;
    }


    public T popPriority() {
        // find an item with priority starting from the top, remove it and return it
        // if no priority item found then remove and return the top item
        // if stack is empty then throw NoSuchElementException
        if (size == 0) {
            throw new NoSuchElementException();
        }

        if (top.hasPriority) {
            return pop();
        }

        Container current = top;
        while (current.nextBelow != null) {
            if (current.nextBelow.hasPriority) {
                T value = current.nextBelow.value;
                current.nextBelow = current.nextBelow.nextBelow;
                size--;
                return value;
            }
            current = current.nextBelow;
        }
        // if no priority item found then remove and return the top item
        return pop();
    }


    public int hasValue(T value) {
        // this code only looks for the *first* occurence of the value, starting from top
        // WARNING: you must call value.equals(item.value) to determine whether
        // two values are equal, just like you would do for a String
        // returning value 0 means the value is on top of the stack,
        // 1 means 1 below the top, and so on...
        // returns -1 if value is not on the stack
        int index = 0;
        Container current = top;
        while (current != null) {
            if (current.value.equals(value)) {
                return index;
            }
            current = current.nextBelow;
            index++;
        }
        return -1;
    }


    public T removeValue(T value) {
        // removes the first item from top containing the value and returns the value
        // if item with value is not found throw NoSuchElementException
        if (size == 0) {
            throw new NoSuchElementException();
        }
        Container current = top;
        Container previous = null;
        while (current != null) {
            if (current.value.equals(value)) {
                if (previous == null) {
                    top = current.nextBelow;
                } else {
                    previous.nextBelow = current.nextBelow;
                }
                size--;
                return current.value;
            }
            previous = current;
            current = current.nextBelow;
        }
        throw new NoSuchElementException();
    }


    public int getSize() {
        return size;
    }


    public void reorderByPriority() {
        // reorder items (re-create a new stack, if you like)
        // where all priority items are on top and non-priority items are below them
        // Note: order within the priority items group and non-priority items group must remain the same
        // Suggestion: instead of reordering the existing stack items
        // it may be easier to re-create a new stack with items in the order you need
        Container current = top;
        Container priorityTop = null;
        Container priorityBottom = null;
        Container nonPriorityTop = null;
        Container nonPriorityBottom = null;

        while (current != null) {
            Container next = current.nextBelow;
            if (current.hasPriority) {
                if (priorityTop == null) {
                    priorityTop = current;
                    priorityBottom = current;
                } else {
                    priorityBottom.nextBelow = current;
                    priorityBottom = current;
                }
            } else {
                if (nonPriorityTop == null) {
                    nonPriorityTop = current;
                    nonPriorityBottom = current;
                } else {
                    nonPriorityBottom.nextBelow = current;
                    nonPriorityBottom = current;
                }
            }
            current = next;
        }
        if (priorityTop != null) {
            priorityBottom.nextBelow = nonPriorityTop;
            top = priorityTop;
        } else {
            top = nonPriorityTop;
        }
    }


    @Override
    public String toString() {
        // return string describing the contents of the stack, starting from the top
        // Use value.toString() to conver values kept in the stack to strings.
        // Format exactly like this (assuming T is a String to keep it simple):
        // "[Jerry:N,Terry:N,Martha:P,Tom:P,Jimmy:N]"
        // N means item has no priority, P means item has priority
        // For full marks you must use StringBuilder or StrigBuffer, no + (string concatenation) allowed.
        StringBuilder sb = new StringBuilder();
        sb.append("[");
        Container current = top;
        while (current != null) {
            sb.append(current.value.toString());
            sb.append(current.hasPriority ? ":P" : ":N");
            if (current.nextBelow != null) {
                sb.append(",");
            }
            current = current.nextBelow;
        }
        sb.append("]");
        return sb.toString();
    }


    // you may need these fields to implement toArrayReversed
    private T[] reversed;
    private int reversedCount;


    @SuppressWarnings("unchecked")
    public T[] toArrayReversed(/* may need a parameter - template type */) { // Note: this is "the twist"
        // return array with items on the stack
        // WARNING: element 0 of the array must be the BOTTOM of the stack
        // NOTE: To obtain full marks for this method you must use recursion.
        // Collect items on your way back, just before returning from each method call.
        // This case is similar to when constructors of parent classes are called (Programming II course).
        if (size == 0) {
            return (T[]) Array.newInstance(Object.class, 0);
        }
        Class<T> clazz = (Class<T>) top.value.getClass();
        T[] array = (T[]) Array.newInstance(clazz, size);
        Container current = top;
        for (int i = 0; i < size; i++) {
            array[size-1-i] = clazz.cast(current.value);;
            current = current.nextBelow;
        }
        return array;
    }


    // NOTE: *ONLY* implement this method if you can't implement toArrayReversed.
    // Make sure to add a unit test for it later.
    @SuppressWarnings("unchecked")
    public T[] toArray() {
        if (size == 0) {
            return (T[]) Array.newInstance(Object.class, 0);
        }
        Class<T> clazz = (Class<T>) top.value.getClass();
        T[] array = (T[]) Array.newInstance(clazz, size);
        Container current = top;
        for (int i = 0; i < size; i++) {
            array[i] = clazz.cast(current.value);;
            current = current.nextBelow;
        }
        return array;
    }


    @Override
    public Iterator<T> iterator() {
        return new Iterator<T>() {
            private Container current = top;

            @Override
            public boolean hasNext() {
                return current != null;
            }

            @Override
            public T next() {
                T value = current.value;
                current = current.nextBelow;
                return value;
            }
        };
    }


    // NOTE: you are only allowed to add private methods and private fields (if needed)
}
