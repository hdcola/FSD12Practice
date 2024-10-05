package org.hdcola;


public class CustomHashMap<K,V> {

    static class Container<K,V> {
        Container<K,V> next;
        K key;
        V value;
        int hash;
    }


    private static final int INITIAL_SIZE = 5;

    // when totalItems > 3*hashTable.length
    private static final double LOAD_FACTOR = 3L;
    private static final int GROWTH_FACTOR = 2;

    // size must be a prime number always
    private Container<K,V>[] hashTable ;

    private int totalItems;

    private int computeHashValue(K key) { // hashing function
//        int hash = 0;
//        for (int i = 0; i < key.length(); i++) {
//            hash <<= 2;  // same as: hash *= 4
//            char c = key.charAt(i);
//            hash += c;
//        }
        return key.hashCode();
    }

    private int getBucketIndex(int hash) {
        return (hash & 0x7FFFFFFF) % hashTable.length;
    }

    private int getBucketIndex(K key) {
        if(key ==null) throw new IllegalArgumentException("Key cannot be null");
        int hash = computeHashValue(key);
        return getBucketIndex(hash);
    }

    private void resizeHashTable() {
        if (totalItems < LOAD_FACTOR * hashTable.length) return;
        int newSize = hashTable.length * GROWTH_FACTOR;
        @SuppressWarnings("unchecked")
        Container<K,V>[] newHashTable = (Container<K,V>[])new Container[newSize];
        for(Container container : hashTable) {
            if(container != null) {
                Container traversal = container;
                while(traversal != null) {
                    int newBucketIndex = getBucketIndex(traversal.hash);
                    Container newBucket = newHashTable[newBucketIndex];
                    if(newBucket == null) {
                        newHashTable[newBucketIndex]=traversal;
                    } else {
                        Container newTraversal = newBucket;
                        while(newTraversal.next != null) {
                            newTraversal = newTraversal.next;
                        }
                        newTraversal.next = traversal;
                    }
                    traversal = traversal.next;
                }
            }
        }
        hashTable = newHashTable;
    }

    public CustomHashMap() {
        hashTable =(Container<K,V>[]) new Container[INITIAL_SIZE];
    }

    public void putValue(K key, V value) {
        int bucketIndex = getBucketIndex(key);

        Container newContainer = new Container();
        newContainer.key = key;
        newContainer.value = value;
        newContainer.hash = computeHashValue(key);

        resizeHashTable();

        Container bucket = hashTable[bucketIndex];
        if (bucket == null) {
            // hashTable[bucketIndex] = newContainer;
            hashTable[bucketIndex] = newContainer;
        } else {
            Container traversal = bucket;
            while (traversal != null) {
                if (traversal.key.equals(key)) {
                    traversal.value = value;
                    return;
                }
                if (traversal.next == null) {
                    traversal.next = newContainer;
                    return;
                }
                traversal = traversal.next;
            }
        }
        totalItems++;

    }
    // LATER: expand hashTable by about *2 when totalItems > 3*hashTable.length

    public boolean hasKey(K key) {
        int bucketIndex = getBucketIndex(key);
        Container<K, V> bucket = hashTable[bucketIndex];

        if(bucket == null) return false;
        Container<K, V> traversal = bucket;
        while(traversal != null) {
            if(traversal.key.equals(key)) return true;
            traversal = traversal.next;
        }
        return false;
    }



    // throw custom unchecked KeyNotFoundException
    public V getValue(K key) throws KeyNotFoundException {
        int bucketIndex = getBucketIndex(key);

        Container<K, V> traversal = hashTable[bucketIndex];

        while(traversal != null) {
            if(traversal.key.equals(key)) return traversal.value;
            traversal = traversal.next;
        }
        throw new KeyNotFoundException(key);
    }

    // throw custom unchecked KeyNotFoundException
    public void deleteByKey(K key) {
        int bucketIndex = getBucketIndex(key);
        Container bucket = hashTable[bucketIndex];

        // if bucket is null, key does not exist
        if(bucket == null) return;

        // if key is the first element in the bucket
        if(bucket.key.equals(key)) {
            hashTable[bucketIndex] = bucket.next;
            totalItems--;
            return;
        }

        Container traversal = bucket;
        while(traversal.next != null) {
            if(traversal.next.key.equals(key)) {
                traversal.next = traversal.next.next;
                totalItems--;
                return;
            }
            traversal = traversal.next;
        }
    }

    // the keys must be sorted
//    public K[] getAllKeys() {
//        @SuppressWarnings("unchecked")
//        K[] result = (K[]) new Object[totalItems];
//        int index = 0;
//        for(Container container : hashTable) {
//            if(container != null) {
//                Container traversal = container;
//                while(traversal != null) {
//                    result[index++] = traversal.key;
//                    traversal = traversal.next;
//                }
//            }
//        }
//        return result;
//    }
    // Generic version: public K[] getAllKeys(K[] template) { ... }


//    public Pair<K,V>[] getAllKeyValPairs() {
//        @SuppressWarnings("unchecked")
//        Pair<K,V> [] result = (Pair<K, V>[]) new Pair[totalItems];
//        int index = 0;
//        for(Container container : hashTable) {
//            if(container != null) {
//                Container traversal = container;
//                while(traversal != null) {
//                    Pair<K,V> pair = new Pair<>();
//                    pair.key = traversal.key;
//                    pair.val = traversal.value;
//                    result[index++] = pair;
//                    traversal = traversal.next;
//                }
//            }
//        }
//        return result;
//    }


    public int getSize() { return totalItems; }

    public void printDebug() { } // print hashTable content, see example below


    // sort keys and return comma-separated list
    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("[");
        int index = 0;
        for(Container container : hashTable) {
            if(container != null) {
                Container traversal = container;
                while(traversal != null) {
                    sb.append(traversal.key);
                    sb.append("=>");
                    sb.append(traversal.value);
                    if(index < totalItems - 1) {
                        sb.append(", ");
                    }
                    traversal = traversal.next;
                    index++;
                }
            }
        }
        sb.append("]");
        return sb.toString();
    } // comma-separated key->value pair list
    // to be able to use this as validation in Unit tests keys must be sorted
    // e.g. [ Key1 => Val1, Key2 => Val2, ... ]

}

