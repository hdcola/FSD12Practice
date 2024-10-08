package org.hdcola;

import java.util.*;

public class BinaryTreeOfInts implements Iterable<Integer>{
    @Override
    public Iterator<Integer> iterator() {
        return new Iterator<Integer>() {

            private Stack<NodeOfInt> stack = new Stack<>();
            private NodeOfInt current = root;

            {
                while(current != null){
                    stack.push(current);
                    current = current.left;
                }
            }
            @Override
            public boolean hasNext() {
                return !stack.isEmpty();
            }

            @Override
            public Integer next() {
                if(!hasNext()){
                    throw new NoSuchElementException();
                }
                // get the top node from the stack
                NodeOfInt node = stack.pop();
                int result = node.value;

                // if the node has a right child, add it to the stack
                // the right child's left children will be added to the stack
                current = node.right;
                while(current != null){
                    stack.push(current);
                    current = current.left;
                }
                return result;
            }
        };
    }

    private static class NodeOfInt {
        int value; // could also be key, value pair
        NodeOfInt left, right;
    }

    NodeOfInt root;
    private int nodesCount;

    // throws exception if put attempts to insert value that already exists (a duplicate)
    public void put(int value) throws IllegalArgumentException {
        if (root == null) {
            root = new NodeOfInt();
            root.value = value;
            nodesCount++;
        } else {
            put(value, root);
        }
    }

    // private helper recursive method to implement the above method
    private void put(int value, NodeOfInt node) throws IllegalArgumentException {
        if (value == node.value) {
            throw new IllegalArgumentException("Duplicate value: " + value);
        } else if (value < node.value) {
            if (node.left == null) {
                node.left = new NodeOfInt();
                node.left.value = value;
                nodesCount++;
            } else {
                put(value, node.left);
            }
        } else {
            if (node.right == null) {
                node.right = new NodeOfInt();
                node.right.value = value;
                nodesCount++;
            } else {
                put(value, node.right);
            }
        }
    }

    public int getSize() {
        return nodesCount;
    }

    public boolean hasValue(int val) {
        return hasValue(val, root);
    }

    private boolean hasValue(int val, NodeOfInt node) {
        if (node == null) {
            return false;
        }
        if (val == node.value) {
            return true;
        }
        if (val < node.value) {
            return hasValue(val, node.left);
        }
        return hasValue(val, node.right);
    }

    // uses recursion to compute the sum of all values in the entire tree
    public int getSumOfAllValues() {
        return getSumOfThisAndSubNodes(root);
    }

    // private helper recursive method to implement the above method
    private int getSumOfThisAndSubNodes(NodeOfInt node) {
        if (node == null) {
            return 0;
        }
        return node.value + getSumOfThisAndSubNodes(node.left) + getSumOfThisAndSubNodes(node.right);
    }

    // uses recursion to collect all values from largest to smallest
    public int [] getValuesInOrder() { // from largest to smallest
        return getValuesInOrder(false);
    }
    public int [] getValuesInOrder(boolean isAsc) {
        resultArray = new int[nodesCount];
        resultIndex = 0;
        collectValuesInOrder(root, isAsc);
        return resultArray;
    }

    // private helper recursive method to implement the above method
    private void collectValuesInOrder(NodeOfInt node, boolean isAsc) {
        if (node == null) {
            return;
        }
        if(isAsc){
            collectValuesInOrder(node.left, true);
            resultArray[resultIndex++] = node.value;
            collectValuesInOrder(node.right, true);
        } else {
            collectValuesInOrder(node.right, false);
            resultArray[resultIndex++] = node.value;
            collectValuesInOrder(node.left, false);
        }
    }


    // data structures used to make collecting values in order easier
    private int[] resultArray;
    private int resultIndex;

    public void printTree() {
        printTree(root, 0);
    }

    private void printTree(NodeOfInt node, int level) {
        if (node == null) {
            return;
        }
        printTree(node.right, level + 1);
        for (int i = 0; i < level; i++) {
            System.out.print("   ");
        }
        System.out.println(node.value);
        printTree(node.left, level + 1);
    }
}
