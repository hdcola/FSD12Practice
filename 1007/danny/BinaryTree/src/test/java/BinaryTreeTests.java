import org.hdcola.BinaryTree;
import org.hdcola.Pair;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class BinaryTreeTests {
    private BinaryTree<String, Integer> tree;

    @BeforeEach
    public void setup() {
        tree = new BinaryTree<>();
        tree.put("five", 5);
        tree.put("three", 3);
        tree.put("seven", 7);
        tree.put("two", 2);
        tree.put("four", 4);
        tree.put("six", 6);
        tree.put("eight", 8);
    }

    @AfterEach
    public void teardown() {
        tree = null;
    }

    @Test
    public void testGetValByKey() {
        assertAll(
                () -> assertEquals(5, tree.getValByKey("five")),
                () -> assertEquals(3, tree.getValByKey("three")),
                () -> assertEquals(7, tree.getValByKey("seven")),
                () -> assertEquals(2, tree.getValByKey("two")),
                () -> assertEquals(4, tree.getValByKey("four")),
                () -> assertEquals(6, tree.getValByKey("six")),
                () -> assertEquals(8, tree.getValByKey("eight")),
                () -> assertEquals(7, tree.getSize()),
                () -> assertThrows(RuntimeException.class, () -> tree.getValByKey("one")),
                () -> assertThrows(RuntimeException.class, () -> tree.getValByKey("nine"))
        );
        tree.printTree();
    }

    @Test
    void test_getValByKey_WhenKeyNotFound() {
        Exception exception = assertThrows(RuntimeException.class, () -> tree.getValByKey("one"));
        assertEquals("Key not found: one", exception.getMessage());
    }

    @Test
    void testPut_WhenDuplicateKey() {
        tree.put("five", 55);
        assertAll(
                () -> assertEquals(55, tree.getValByKey("five")),
                () -> assertEquals(7, tree.getSize())
        );
    }

    @Test
    void test_printAllKeyValPairs_WhenIsAscending() {
        tree.printAllKeyValPairs();
    }

    @Test
    void test_printAllKeyValPairs_WhenIsDescending() {
        tree.printAllKeyValPairs(false);
    }

    @Test
    void test_getKeysInOrder_WhenIsAscending() {
        String[] keys = tree.getKeysInOrder(true);
        assertArrayEquals(new String[]{"eight", "five", "four", "seven", "six", "three", "two"}, keys);
    }

    @Test
    void test_getKeysInOrder_WhenIsDescending() {
        String[] keys = tree.getKeysInOrder(false);
        assertArrayEquals(new String[]{"two", "three", "six", "seven", "four", "five", "eight"}, keys);
    }

    @Test
    void test_iterator() {
        Pair<String, Integer>[] pairs = new Pair[]{
                new Pair<>("eight", 8),
                new Pair<>("five", 5),
                new Pair<>("four", 4),
                new Pair<>("seven", 7),
                new Pair<>("six", 6),
                new Pair<>("three", 3),
                new Pair<>("two", 2)
        };
        int i = 0;
        for (Pair<String, Integer> pair : tree) {
            assertEquals(pairs[i].getKey(), pair.getKey());
            assertEquals(pairs[i].getValue(), pair.getValue());
            i++;
        }
    }
}
