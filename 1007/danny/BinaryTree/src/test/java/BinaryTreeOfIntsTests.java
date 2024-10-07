import org.hdcola.BinaryTreeOfInts;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class BinaryTreeOfIntsTests {

    private BinaryTreeOfInts tree;

    @BeforeEach
    public void setup() {
        tree = new BinaryTreeOfInts();
    }

    @AfterEach
    public void teardown() {
        tree = null;
    }

    @Test
    public void testPut() {
        tree.put(5);
        tree.put(3);
        tree.put(7);
        tree.put(2);
        tree.put(4);
        tree.put(6);
        tree.put(8);
        assertAll(
            () -> assertEquals(7, tree.getSize()),
            () -> assertTrue(tree.hasValue(5)),
            () -> assertTrue(tree.hasValue(3)),
            () -> assertTrue(tree.hasValue(7)),
            () -> assertTrue(tree.hasValue(2)),
            () -> assertTrue(tree.hasValue(4)),
            () -> assertTrue(tree.hasValue(6)),
            () -> assertTrue(tree.hasValue(8)),
            () -> assertFalse(tree.hasValue(1)),
            () -> assertFalse(tree.hasValue(9))
        );
    }

    @Test
    void testPut_WhenDuplicateValue() {
        tree.put(5);
        assertThrows(IllegalArgumentException.class, () -> tree.put(5));
    }

    @Test
    void testGetSumOfAllValues() {
        tree.put(5);
        tree.put(3);
        tree.put(7);
        tree.put(2);
        tree.put(4);
        tree.put(6);
        tree.put(8);
        assertEquals(35, tree.getSumOfAllValues());
        tree.put(-1);
        assertEquals(34, tree.getSumOfAllValues());
    }

    @Test
    void testGetValuesInOrder() {
        tree.put(5);
        tree.put(3);
        tree.put(7);
        tree.put(2);
        tree.put(4);
        tree.put(6);
        tree.put(8);
        assertAll(
            () -> assertArrayEquals(new int[] {2, 3, 4, 5, 6, 7, 8}, tree.getValuesInOrder(true)),
            () -> assertArrayEquals(new int[] {8, 7, 6, 5, 4, 3, 2}, tree.getValuesInOrder(false))
        );
    }

    @Test
    void testGetValuesInOrder_WhenEmpty() {
        assertArrayEquals(new int[0], tree.getValuesInOrder(true));
        assertArrayEquals(new int[0], tree.getValuesInOrder(false));
    }

    @Test
    void testPrintTree() {
        tree.put(5);
        tree.put(3);
        tree.put(7);
        tree.put(2);
        tree.put(4);
        tree.put(6);
        tree.put(8);
        tree.printTree();
    }
}
