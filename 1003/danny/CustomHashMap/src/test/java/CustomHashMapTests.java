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
    void testPutValue_WhenHashMapHasKey() throws KeyNotFoundException {
        customHashMap.putValue("key1", "value1");
        customHashMap.putValue("key1", "value2");
        assertEquals("value2", customHashMap.getValue("key1"));
        assertEquals(customHashMap.toString(), "[key1=>value2]");
    }

//    @Test
//    void testPutValue_WhenHashMapHasFourKeys() throws KeyNotFoundException {
//        customHashMap.putValue("key1", "value1");
//        customHashMap.putValue("key2", "value2");
//        customHashMap.putValue("key3", "value3");
//        customHashMap.putValue("key4", "value4");
//
//        assertEquals("value1", customHashMap.getValue("key1"));
//        assertEquals("[key1=>value1, key2=>value2, key3=>value3, key4=>value4]", customHashMap.toString());
//    }
}
