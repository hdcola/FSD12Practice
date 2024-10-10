package org.hdcola;

import java.lang.reflect.Array;
import java.util.Arrays;

public class RoundFIFOQueue<T extends Comparable> {
    private class Node {
        T value;
        Node next;
        int debugId; // optional, for debugging only
    }

    private Node enqueue, dequeue;
    private int size;
    private int maxSize; // maxSize is assigned in the constructor

    public RoundFIFOQueue(int maxSize) {
        this.maxSize = maxSize;
        // * allocate maxSize of Nodes and as you're doing it
        // * link them up with next references
        // * point enqueue & dequeue to one of these nodes
        //
        // Suggestion: for debugging purposes give each Node a debugId (0, 1, 2...)
        // so that when you're looking at data in memory or printing them out
        // you can tell which Node is which
        //
        // Suggestion: use debugger to verify that you ineed have linked up all nodes in a circle
        // before continuing with this task. If you did not then the rest of your code won't work.

        // init queue
        enqueue = dequeue = new Node();
        enqueue.debugId = 0;
        for (int i = 1; i < maxSize; i++) {
            enqueue.next = new Node();
            enqueue = enqueue.next;
            enqueue.debugId = i;
        }
        enqueue.next = dequeue;
        enqueue = dequeue;
    }

    public void printQueue() {
        // for debugging only but required as a part of your solution
        // print out each Node's content on a separate line
        // starting with eneuque reference, following next reference maxSize (or probably maxSize-1) times.
        // after the loop is done you should be back at eneuque - check that and if you're not
        // throw new RuntimeException("Internal error: queue may not be circular");
        // example line of output for node with debugId=2, value="Joe" (String type):
        // Node #0(2): Joe
        Node current = enqueue;
        for (int i = 0; i < maxSize; i++) {
            System.out.println("Node #" + i + "(" + current.debugId + "): " + current.value
                    // show if this is enqueue or dequeue
                    + ((current.debugId == enqueue.debugId ? " (E)" : "")
                    // show if this is dequeue
                    + (current.debugId == dequeue.debugId ? " (D)" : "")
            ));
            current = current.next;
        }
        if (enqueue != current) {
            throw new RuntimeException("Internal error: queue may not be circular");
        }
    }

    // puts value into the queue
    // throws RuntimeException("No space in the queue") if queue is full
    // unless "grow" is set to true, in which case you can create a new Node so you can insert more than current maxSize
    // if you do - you need to update maxSize as well.
    public void enque(T value, boolean grow) {
        if (size == maxSize) {
            if (!grow) {
                throw new RuntimeException("No space in the queue");
            } else {
                // grow the queue
                maxSize++;
                Node newEnqueue = new Node();
                newEnqueue.debugId = maxSize - 1;
                newEnqueue.next = enqueue.next;
                enqueue.next = newEnqueue;
                enqueue = newEnqueue;
            }
        }
        enqueue.value = value;
        enqueue = enqueue.next;
        size++;
    }

    // removes and returns value from the queue (in FIFO order)
    // throws RuntimeException("Queue is empty") if queue is empty
    // sets value reference to null of the Node whose value will be returned
    public T deque() {
        if (size == 0) {
            throw new RuntimeException("Queue is empty");
        }
        T value = dequeue.value;
        dequeue.value = null;
        dequeue = dequeue.next;
        size--;
        return value;
    }

    public int size() { return size; }

    // returns array of "size" number of elements with most recently enqueued elements first (following "next" references)
    public T[] toArray(T[] template) {
        return toArray();
    }

    public T[] toArray() {
        if (size == 0) {
            return createEmptyArray();
        }

        @SuppressWarnings("unchecked")
        T[] array = (T[]) Array.newInstance(dequeue.value.getClass(), size);

        Node start = dequeue;
        for (int i = size - 1; i >= 0; i--) {
            array[i] = start.value;
            start = start.next;
        }
        return array;
    }

    // checks if value is present in Queue and returns the number of occurrences of that value (0 if not found)
    // must use n.compareTo(v) == 0, not equals()
    public int countValues(T value) {
        int count = 0;
        Node current = dequeue;
        for (int i = 0; i < size; i++) {
            if (current.value.compareTo(value) == 0) {
                count++;
            }
            current = current.next;
        }
        return count;
    }

    @SafeVarargs
    private T[] createEmptyArray(T... array){
        return Arrays.copyOf(array, 0);
    }
}
