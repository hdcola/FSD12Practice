import org.hdcola.CustomArrayOfInts;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class CustomArrayOfIntsTests {

    @Test
    @DisplayName("Test empty custom array of ints")
    void TestEmptyCustomArrayOfInts() {
        CustomArrayOfInts customArrayOfInts = new CustomArrayOfInts();
        assertAll("Test empty",
                () -> assertEquals(0, customArrayOfInts.size()),
                () -> assertThrows(ArrayIndexOutOfBoundsException.class, () -> customArrayOfInts.get(0)),
                () -> assertThrows(ArrayIndexOutOfBoundsException.class, () -> customArrayOfInts.getSlice(0, 1)),
                () -> assertThrows(ArrayIndexOutOfBoundsException.class, () -> customArrayOfInts.deleteByIndex(0)),
                () -> assertFalse(customArrayOfInts.deleteByValue(0)),
                () -> assertThrows(ArrayIndexOutOfBoundsException.class, () -> customArrayOfInts.insertValueAtIndex(0, 1)),
                () -> customArrayOfInts.insertValueAtIndex(2,0),
                () -> assertEquals(1, customArrayOfInts.size()),
                () -> assertEquals(2, customArrayOfInts.get(0)),
                () -> assertEquals(2, customArrayOfInts.getSlice(0, 1)[0]),
                customArrayOfInts::clear,
                () -> assertEquals(0, customArrayOfInts.size())
        );
    }

    @Test
    @DisplayName("Test adding elements")
    void testAddElements() {
        CustomArrayOfInts customArrayOfInts = new CustomArrayOfInts();
        customArrayOfInts.add(1);
        customArrayOfInts.add(2);
        customArrayOfInts.add(3);
        assertAll("Test add",
                () -> assertEquals(3, customArrayOfInts.size()),
                () -> assertEquals(1, customArrayOfInts.get(0)),
                () -> assertEquals(2, customArrayOfInts.get(1)),
                () -> assertEquals(3, customArrayOfInts.get(2))
        );
    }

    @Test
    @DisplayName("Test deleting by index")
    void testDeleteByIndex() {
        CustomArrayOfInts customArrayOfInts = new CustomArrayOfInts();
        customArrayOfInts.add(1);
        customArrayOfInts.add(2);
        customArrayOfInts.add(3);
        customArrayOfInts.deleteByIndex(1);
        assertAll("Test delete by index",
                () -> assertEquals(2, customArrayOfInts.size()),
                () -> assertEquals(1, customArrayOfInts.get(0)),
                () -> assertEquals(3, customArrayOfInts.get(1))
        );
    }

    @Test
    @DisplayName("Test deleting by value")
    void testDeleteByValue() {
        CustomArrayOfInts customArrayOfInts = new CustomArrayOfInts();
        customArrayOfInts.add(1);
        customArrayOfInts.add(2);
        customArrayOfInts.add(3);
        assertTrue(customArrayOfInts.deleteByValue(2));
        assertAll("Test delete by value",
                () -> assertEquals(2, customArrayOfInts.size()),
                () -> assertEquals(1, customArrayOfInts.get(0)),
                () -> assertEquals(3, customArrayOfInts.get(1))
        );
    }

    @Test
    @DisplayName("Test inserting value at index")
    void testInsertValueAtIndex() {
        CustomArrayOfInts customArrayOfInts = new CustomArrayOfInts();
        customArrayOfInts.add(1);
        customArrayOfInts.add(3);
        customArrayOfInts.insertValueAtIndex(2, 1);
        assertAll("Test insert value at index",
                () -> assertEquals(3, customArrayOfInts.size()),
                () -> assertEquals(1, customArrayOfInts.get(0)),
                () -> assertEquals(2, customArrayOfInts.get(1)),
                () -> assertEquals(3, customArrayOfInts.get(2))
        );
    }

    @Test
    @DisplayName("Test clear")
    void testClear() {
        CustomArrayOfInts customArrayOfInts = new CustomArrayOfInts();
        customArrayOfInts.add(1);
        customArrayOfInts.add(2);
        customArrayOfInts.clear();
        assertEquals(0, customArrayOfInts.size());
    }

    @Test
    @DisplayName("Test get slice")
    void testGetSlice() {
        CustomArrayOfInts customArrayOfInts = new CustomArrayOfInts();
        customArrayOfInts.add(1);
        customArrayOfInts.add(2);
        customArrayOfInts.add(3);
        int[] slice = customArrayOfInts.getSlice(1, 2);
        assertAll("Test get slice",
                () -> assertEquals(2, slice.length),
                () -> assertEquals(2, slice[0]),
                () -> assertEquals(3, slice[1])
        );
    }

    @Test
    @DisplayName("Test toArray")
    void testToArray() {
        CustomArrayOfInts customArrayOfInts = new CustomArrayOfInts();
        customArrayOfInts.add(1);
        customArrayOfInts.add(2);
        customArrayOfInts.add(3);
        int[] array = customArrayOfInts.toArray();
        assertAll("Test toArray",
                () -> assertEquals(3, array.length),
                () -> assertEquals(1, array[0]),
                () -> assertEquals(2, array[1]),
                () -> assertEquals(3, array[2])
        );
    }

    @Test
    @DisplayName("Test toString")
    void testToString() {
        CustomArrayOfInts customArrayOfInts = new CustomArrayOfInts();
        customArrayOfInts.add(1);
        customArrayOfInts.add(2);
        customArrayOfInts.add(3);
        assertEquals("[1, 2, 3]", customArrayOfInts.toString());
    }

    @Test
    @DisplayName("Test array growth")
    void testArrayGrowth() {
        CustomArrayOfInts customArrayOfInts = new CustomArrayOfInts();
        for (int i = 0; i < 10; i++) {
            customArrayOfInts.add(i);
        }
        assertAll("Test array growth",
                () -> assertEquals(10, customArrayOfInts.size()),
                () -> assertEquals(0, customArrayOfInts.get(0)),
                () -> assertEquals(9, customArrayOfInts.get(9))
        );
    }

}
