package org.hdcola;

import java.lang.reflect.Array;
import java.util.Iterator;
import java.util.Stack;

public class BinaryTree <K extends Comparable, V> implements Iterable<Pair<K, V>> {

    @Override
    public Iterator<Pair<K, V>> iterator() {
        return new Iterator<Pair<K, V>>() {
            private Stack<Node> stack = new Stack<>();
            private Node current = root;

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
            public Pair<K, V> next() {
                if(!hasNext()){
                    throw new RuntimeException("No such element");
                }
                // get the top node from the stack
                Node node = stack.pop();
                Pair<K, V> result = new Pair<>(node.key, node.value);

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

    private class Node {
        K key;
        V value; // could also be key, value pair
        Node left, right;
    }

    Node root;
    private int nodesCount;

    public void put(K key, V value) {
        if (root == null) {
            root = new Node();
            root.key = key;
            root.value = value;
            nodesCount++;
        } else {
            put(key, value, root);
        }
    }

    @SuppressWarnings("unchecked")
    private void put(K key, V value, Node node)  {
        if (key.compareTo(node.key) == 0) {
            node.value = value;
        } else if (key.compareTo(node.key) < 0) {
            if (node.left == null) {
                node.left = new Node();
                node.left.key = key;
                node.left.value = value;
                nodesCount++;
            } else {
                put(key, value, node.left);
            }
        } else {
            if (node.right == null) {
                node.right = new Node();
                node.right.key = key;
                node.right.value = value;
                nodesCount++;
            } else {
                put(key, value, node.right);
            }
        }
    }

    public V getValByKey(K key) throws RuntimeException{
        return getValByKey(key, root);
    }

    @SuppressWarnings("unchecked")
    private V getValByKey(K key, Node node) throws RuntimeException{
        if (node == null) {
            throw new RuntimeException("Key not found: " + key);
        }
        if (key.compareTo(node.key) == 0) {
            return node.value;
        }
        if (key.compareTo(node.key) < 0) {
            return getValByKey(key, node.left);
        }
        return getValByKey(key, node.right);
    }

    @SuppressWarnings("unchecked")
    public K[] getKeysInOrder(boolean isAscending) {
        if(root == null) {
            return (K[]) Array.newInstance(Object.class, 0);
        }
        K[] keys = (K[]) Array.newInstance(root.key.getClass(), nodesCount);
        return getKeysInOrder(root, isAscending, keys);
    }

    private int index = 0;

    private K[] getKeysInOrder(Node node, boolean isAscending, K[] keys) {
        if (node == null) {
            return keys;
        }
        if (isAscending) {
            getKeysInOrder(node.left, true, keys);
            keys[index++] = node.key;
            getKeysInOrder(node.right, true, keys);
        } else {
            getKeysInOrder(node.right, false, keys);
            keys[index++] = node.key;
            getKeysInOrder(node.left, false, keys);
        }
        return keys;
    }

    // print out all key-value pairs (one per line) from the smallest key to the largest
    public void printAllKeyValPairs() {
        printAllKeyValPairs(true);
    }

    public void printAllKeyValPairs(boolean isAscending) {
        printAllKeyValPairs(root, isAscending);
    }

    private void printAllKeyValPairs(Node node,boolean isAscending) {
        if (node == null) {
            return;
        }
        if (isAscending) {
            printAllKeyValPairs(node.left, true);
            System.out.println(node.key + ":" + node.value);
            printAllKeyValPairs(node.right, true);
        } else {
            printAllKeyValPairs(node.right, false);
            System.out.println(node.key + ":" + node.value);
            printAllKeyValPairs(node.left, false);
        }
    }

    public int getSize() {
        return nodesCount;
    }

    public void printTree() {
        printTree(root, 0);
    }

    private void printTree(Node node, int level) {
        if (node == null) {
            return;
        }
        printTree(node.right, level + 1);
        for (int i = 0; i < level; i++) {
            System.out.print("   ");
        }
        System.out.println(node.key + ":" + node.value);
        printTree(node.left, level + 1);
    }
}
