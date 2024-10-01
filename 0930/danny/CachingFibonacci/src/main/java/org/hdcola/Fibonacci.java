package org.hdcola;

import java.util.HashMap;

class Fibonacci {

    private boolean isCacheOn;

    Fibonacci(boolean cacheOn) {
        isCacheOn = cacheOn;
        fibsCached.put(0,0L); // #0
        fibsCached.put(1,1L); // #1
    }

    private HashMap<Integer,Long> fibsCached = new HashMap<>();
    private int fibsCompCount = 2; // may not be needed
    // in a correct caching implementation fibsCompCount will end up the same as fibsCached.size();

    // when you implement caching, make this method print out the number of fib values it had to compute (as opposed to take from cache)
    public long getNthFib(int n) {
        if (isCacheOn) {
            if (fibsCached.containsKey(n)) {
                return fibsCached.get(n);
            } else {
                long fib = computeNthFib(n);
                fibsCached.put(n, fib);
                fibsCompCount++;
                return fib;
            }
        } else {
            return computeNthFib(n);
        }
    }

    // You can find implementation online, recursive or non-recursive.
    // For 100% solution you should use values in fibsCached as a starting point
    // instead of always starting from the first two values of 0, 1.
    private long computeNthFib(int n) {
        if (n == 0) return 0;
        if (n == 1) return 1;
        int lastCached = fibsCached.size() - 1;
        long a = fibsCached.get(lastCached - 1);
        long b = fibsCached.get(lastCached);
        long c = 0;
        for (int i = lastCached + 1; i <= n; i++) {
            c = a + b;
            a = b;
            b = c;
            fibsCached.put(i, c);
        }
        return c;
    }

    // You are allowed to add another private method for fibonacci generation
    // if you want to use recursive approach. I recommend non-recursive though.

    // How many fibonacci numbers has your code computed as opposed to returned cached?
    // Use this in your testing to make sure your caching actually works properly.
    public int getCountOfFibsComputed() { return fibsCompCount; }

    @Override
    public String toString() {
        return fibsCached.values().toString().replaceAll("[\\[\\]]", "").replaceAll(", ", ",");
    } // returns all cached Fib values, comma-space-separated on a single line

}
