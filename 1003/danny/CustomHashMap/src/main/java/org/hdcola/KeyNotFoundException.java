package org.hdcola;

public class KeyNotFoundException extends Throwable {
    public KeyNotFoundException(Object key) {
        super("Key not found: " + key);
    }
}
