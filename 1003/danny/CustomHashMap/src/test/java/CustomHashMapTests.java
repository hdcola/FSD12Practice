import org.hdcola.CustomHashMap;
import org.hdcola.KeyNotFoundException;
import org.hdcola.Pair;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class CustomHashMapTests {
    private CustomHashMap<String, String> customHashMap;

    @BeforeEach
    public void setUp() {
        customHashMap = new CustomHashMap<>();
    }

    @AfterEach
    public void tearDown() {
        customHashMap = null;
    }

    @Test
    public void testPutValue() throws KeyNotFoundException {
        // Test inserting a new key-value pair
        customHashMap.putValue("key1", "value1");
        assertEquals("value1", customHashMap.getValue("key1"));
        assertEquals(customHashMap.toString(), "[key1=>value1]");

        // Test inserting a new key-value pair
        customHashMap.putValue("key2", "value2");
        assertEquals("value2", customHashMap.getValue("key2"));
        assertEquals(customHashMap.toString(), "[key1=>value1, key2=>value2]");

        // test getting a value for a key that does not exist
        assertThrows(KeyNotFoundException.class, () -> customHashMap.getValue("key3"));
        assertEquals("value2", customHashMap.getValue("key2"));

        assertTrue(customHashMap.hasKey("key1"));
        assertTrue(customHashMap.hasKey("key2"));
        assertFalse(customHashMap.hasKey("key3"));

        customHashMap.deleteByKey("key1");
        assertFalse(customHashMap.hasKey("key1"));
        assertTrue(customHashMap.hasKey("key2"));
        assertEquals(customHashMap.toString(), "[key2=>value2]");
    }

    @Test
    void testPutValue_WhenPutFiveItems() throws KeyNotFoundException {
        customHashMap.putValue("key1", "value1");
        customHashMap.putValue("key2", "value2");
        customHashMap.putValue("key3", "value3");
        customHashMap.putValue("key4", "value4");
        customHashMap.putValue("key5", "value5");
        assertAll(
                () -> assertEquals("value1", customHashMap.getValue("key1")),
                () -> assertEquals("value2", customHashMap.getValue("key2")),
                () -> assertEquals("value3", customHashMap.getValue("key3")),
                () -> assertEquals("value4", customHashMap.getValue("key4")),
                () -> assertEquals("value5", customHashMap.getValue("key5")),
                ()-> assertArrayEquals(new String[]{"key1", "key2", "key3", "key4", "key5"}, customHashMap.getAllKeys()),
                () -> assertEquals("[key1=>value1, key2=>value2, key3=>value3, key4=>value4, key5=>value5]", customHashMap.toString())
        );
    }

    @Test
    void testPutValue_WhenHashMapHasKey() throws KeyNotFoundException {
        customHashMap.putValue("key1", "value1");
        customHashMap.putValue("key1", "value2");
        assertEquals("value2", customHashMap.getValue("key1"));
        assertEquals(customHashMap.toString(), "[key1=>value2]");
    }

    @Test
    void testGetAllKeys() {
        customHashMap.putValue("key1", "value1");
        customHashMap.putValue("key2", "value2");
        customHashMap.putValue("key3", "value3");
        customHashMap.putValue("key4", "value4");
        customHashMap.putValue("key01", "value5");
        assertArrayEquals(new String[]{"key01", "key1", "key2", "key3", "key4"}, customHashMap.getAllKeys());
    }

    @Test
    void testGetAllKeys_WhenHashMapIsEmpty() {
        assertArrayEquals(new String[]{}, customHashMap.getAllKeys());
    }

    @Test
    void testToString(){
        customHashMap.putValue("key1", "value1");
        customHashMap.putValue("key2", "value2");
        customHashMap.putValue("key3", "value3");
        customHashMap.putValue("key4", "value4");
        customHashMap.putValue("key5", "value5");
        assertEquals("[key1=>value1, key2=>value2, key3=>value3, key4=>value4, key5=>value5]", customHashMap.toString());
    }

    @Test
    void testGetAllKeyValPairs(){
        customHashMap.putValue("key1", "value1");
        customHashMap.putValue("key2", "value2");
        Pair<String,String>[] pairs = customHashMap.getAllKeyValPairs();
        assertAll(
                () -> assertEquals("key1", pairs[0].getKey()),
                () -> assertEquals("value1", pairs[0].getValue()),
                () -> assertEquals("key2", pairs[1].getKey()),
                () -> assertEquals("value2", pairs[1].getValue())
        );

    }
}
