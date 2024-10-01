package org.hdcola;

import java.math.BigInteger;
import java.util.HashMap;

public class BigFibonacci {

    private boolean isCacheOn;

    BigFibonacci(boolean cacheOn) {
        isCacheOn = cacheOn;
        fibsCached.put(0,BigInteger.valueOf(0)); // #0
        fibsCached.put(1,BigInteger.valueOf(1)); // #1
    }

    private HashMap<Integer,BigInteger> fibsCached = new HashMap<>();
    private int fibsCompCount = 2; // may not be needed
    // in a correct caching implementation fibsCompCount will end up the same as fibsCached.size();

    // when you implement caching, make this method print out the number of fib values it had to compute (as opposed to take from cache)
    public BigInteger getNthFib(int n) {
        if (isCacheOn) {
            if (fibsCached.containsKey(n)) {
                return fibsCached.get(n);
            } else {
                return computeNthFib(n);
            }
        } else {
            return computeNthFib(n);
        }
    }

    // You can find implementation online, recursive or non-recursive.
    // For 100% solution you should use values in fibsCached as a starting point
    // instead of always starting from the first two values of 0, 1.
    private BigInteger computeNthFib(int n) {
        if (n == 0) return BigInteger.valueOf(0);
        if (n == 1) return BigInteger.valueOf(1);
        int lastCached = fibsCached.size() - 1;
        BigInteger a = fibsCached.get(lastCached - 1);
        BigInteger b = fibsCached.get(lastCached);
        BigInteger c = BigInteger.valueOf(0);
        for (int i = lastCached + 1; i <= n; i++) {
            c = a.add(b);
            a = b;
            b = c;
            fibsCached.put(i, c);
            fibsCompCount++;
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
