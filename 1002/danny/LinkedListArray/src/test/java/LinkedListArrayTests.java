import org.hdcola.LinkedListArray;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class LinkedListArrayTests {

    LinkedListArray<String> list;

    @BeforeEach
    void setUp() {
        list = new LinkedListArray<>();
    }

    @AfterEach
    void tearDown() {
        list = null;
    }

    @Test
    void TestAdd() {
        list.add("Hello");
        list.add("World");
        list.add("!");
        Assertions.assertAll(
                () -> Assertions.assertEquals("Hello", list.get(0)),
                () -> Assertions.assertEquals("World", list.get(1)),
                () -> Assertions.assertEquals("!", list.get(2)),
                ()-> Assertions.assertEquals(3, list.getSize()),
                ()-> Assertions.assertThrows(IndexOutOfBoundsException.class, ()-> list.get(3)),
                ()-> Assertions.assertThrows(IndexOutOfBoundsException.class, ()-> list.get(-1)),
                () -> Assertions.assertEquals("[Hello,World,!]", list.toString()),
                () -> Assertions.assertArrayEquals(new String[]{"Hello", "World", "!"}, list.toArray())
        );
    }

    @Test
    void TestInsertValueAtIndex() {
        list.add("Hello");
        list.add("World");
        list.add("!");

        list.insertValueAtIndex("Java", 1);
        Assertions.assertAll(
                () -> Assertions.assertEquals("Hello", list.get(0)),
                () -> Assertions.assertEquals("Java", list.get(1)),
                () -> Assertions.assertEquals("World", list.get(2)),
                () -> Assertions.assertEquals("!", list.get(3)),
                ()-> Assertions.assertEquals(4, list.getSize()),
                ()-> Assertions.assertThrows(IndexOutOfBoundsException.class, ()-> list.get(4)),
                ()-> Assertions.assertThrows(IndexOutOfBoundsException.class, ()-> list.get(-1)),
                () -> Assertions.assertEquals("[Hello,Java,World,!]", list.toString())
        );
        // insert at the end
        list.insertValueAtIndex("Python", 4);
        Assertions.assertAll(
                () -> Assertions.assertEquals("Hello", list.get(0)),
                () -> Assertions.assertEquals("Java", list.get(1)),
                () -> Assertions.assertEquals("World", list.get(2)),
                () -> Assertions.assertEquals("!", list.get(3)),
                () -> Assertions.assertEquals("Python", list.get(4)),
                ()-> Assertions.assertEquals(5, list.getSize()),
                ()-> Assertions.assertThrows(IndexOutOfBoundsException.class, ()-> list.get(5)),
                ()-> Assertions.assertThrows(IndexOutOfBoundsException.class, ()-> list.get(-1)),
                () -> Assertions.assertEquals("[Hello,Java,World,!,Python]", list.toString())
        );
        // insert at the beginning
        list.insertValueAtIndex("C++", 0);
        Assertions.assertAll(
                () -> Assertions.assertEquals("C++", list.get(0)),
                () -> Assertions.assertEquals("Hello", list.get(1)),
                () -> Assertions.assertEquals("Java", list.get(2)),
                () -> Assertions.assertEquals("World", list.get(3)),
                () -> Assertions.assertEquals("!", list.get(4)),
                () -> Assertions.assertEquals("Python", list.get(5)),
                ()-> Assertions.assertEquals(6, list.getSize()),
                ()-> Assertions.assertThrows(IndexOutOfBoundsException.class, ()-> list.get(6)),
                ()-> Assertions.assertThrows(IndexOutOfBoundsException.class, ()-> list.get(-1)),
                () -> Assertions.assertEquals("[C++,Hello,Java,World,!,Python]", list.toString())
        );
    }

    @Test
    void TestReplaceValueAtIndex() {
        list.add("Hello");
        list.add("World");
        list.add("!");

        list.replaceValueAtIndex("Java", 1);
        Assertions.assertAll(
                () -> Assertions.assertEquals("Hello", list.get(0)),
                () -> Assertions.assertEquals("Java", list.get(1)),
                () -> Assertions.assertEquals("!", list.get(2)),
                ()-> Assertions.assertEquals(3, list.getSize()),
                ()-> Assertions.assertThrows(IndexOutOfBoundsException.class, ()-> list.get(3)),
                ()-> Assertions.assertThrows(IndexOutOfBoundsException.class, ()-> list.get(-1)),
                () -> Assertions.assertEquals("[Hello,Java,!]", list.toString()),
                () -> Assertions.assertArrayEquals(new String[] {"Hello", "Java", "!"}, list.toArray())
        );
        // replace at the end
        list.replaceValueAtIndex("Python", 2);
        Assertions.assertAll(
                () -> Assertions.assertEquals("Hello", list.get(0)),
                () -> Assertions.assertEquals("Java", list.get(1)),
                () -> Assertions.assertEquals("Python", list.get(2)),
                ()-> Assertions.assertEquals(3, list.getSize()),
                ()-> Assertions.assertThrows(IndexOutOfBoundsException.class, ()-> list.get(3)),
                ()-> Assertions.assertThrows(IndexOutOfBoundsException.class, ()-> list.get(-1)),
                () -> Assertions.assertEquals("[Hello,Java,Python]", list.toString()),
                () -> Assertions.assertArrayEquals(new String[] {"Hello", "Java", "Python"}, list.toArray())
        );
        // replace at the beginning
        list.replaceValueAtIndex("C++", 0);
        Assertions.assertAll(
                () -> Assertions.assertEquals("C++", list.get(0)),
                () -> Assertions.assertEquals("Java", list.get(1)),
                () -> Assertions.assertEquals("Python", list.get(2)),
                ()-> Assertions.assertEquals(3, list.getSize()),
                ()-> Assertions.assertThrows(IndexOutOfBoundsException.class, ()-> list.get(3)),
                ()-> Assertions.assertThrows(IndexOutOfBoundsException.class, ()-> list.get(-1)),
                () -> Assertions.assertEquals("[C++,Java,Python]", list.toString()),
                () -> Assertions.assertArrayEquals(new String[] {"C++", "Java", "Python"}, list.toArray())
        );
    }

    @Test
    void TestDeleteByIndex() {
        list.add("Hello");
        list.add("Java");
        list.add("World");
        list.add("!");

        list.deleteByIndex(1);
        Assertions.assertAll(
                () -> Assertions.assertEquals("Hello", list.get(0)),
                () -> Assertions.assertEquals("World", list.get(1)),
                () -> Assertions.assertEquals("!", list.get(2)),
                ()-> Assertions.assertEquals(3, list.getSize()),
                ()-> Assertions.assertThrows(IndexOutOfBoundsException.class, ()-> list.get(3)),
                ()-> Assertions.assertThrows(IndexOutOfBoundsException.class, ()-> list.get(-1)),
                () -> Assertions.assertEquals("[Hello,World,!]", list.toString())
        );
        // delete at the beginning
        list.deleteByIndex(0);
        Assertions.assertAll(
                () -> Assertions.assertEquals("World", list.get(0)),
                () -> Assertions.assertEquals("!", list.get(1)),
                ()-> Assertions.assertEquals(2, list.getSize()),
                ()-> Assertions.assertThrows(IndexOutOfBoundsException.class, ()-> list.get(2)),
                ()-> Assertions.assertThrows(IndexOutOfBoundsException.class, ()-> list.get(-1)),
                () -> Assertions.assertEquals("[World,!]", list.toString())
        );
        // delete at the end
        list.deleteByIndex(1);
        Assertions.assertAll(
                () -> Assertions.assertEquals("World", list.get(0)),
                ()-> Assertions.assertEquals(1, list.getSize()),
                ()-> Assertions.assertThrows(IndexOutOfBoundsException.class, ()-> list.get(1)),
                ()-> Assertions.assertThrows(IndexOutOfBoundsException.class, ()-> list.get(-1)),
                () -> Assertions.assertEquals("[World]", list.toString())
        );
        // delete the only element
        list.deleteByIndex(0);
        Assertions.assertAll(
                ()-> Assertions.assertEquals(0, list.getSize()),
                ()-> Assertions.assertThrows(IndexOutOfBoundsException.class, ()-> list.get(0)),
                ()-> Assertions.assertThrows(IndexOutOfBoundsException.class, ()-> list.get(-1)),
                ()-> Assertions.assertEquals("[]", list.toString())
        );
    }

    @Test
    void TestDeleteByIndex_WhenOnlyOneElement_ThenAddisWell() {
        list.add("Hello");
        list.deleteByIndex(0);
        Assertions.assertAll(
                ()-> Assertions.assertEquals(0, list.getSize()),
                ()-> Assertions.assertThrows(IndexOutOfBoundsException.class, ()-> list.get(0)),
                ()-> Assertions.assertThrows(IndexOutOfBoundsException.class, ()-> list.get(-1)),
                ()-> Assertions.assertEquals("[]", list.toString())
        );
        list.add("Hello");
        Assertions.assertAll(
                ()-> Assertions.assertEquals(1, list.getSize()),
                ()-> Assertions.assertEquals("Hello", list.get(0)),
                ()-> Assertions.assertEquals("[Hello]", list.toString())
        );
    }

    @Test
    void TestDeleteByIndex_WhenIndexOutOfBounds_ThenThrowsException() {
        list.add("Hello");
        Assertions.assertThrows(IndexOutOfBoundsException.class, ()-> list.deleteByIndex(1));
        Assertions.assertThrows(IndexOutOfBoundsException.class, ()-> list.deleteByIndex(-1));
    }

    @Test
    void TestDeleteByValue(){
        list.add("Hello");
        list.add("Java");
        list.add("World");
        list.add("Java");
        list.add("!");

        list.deleteByValue("Java");
        Assertions.assertAll(
                () -> Assertions.assertEquals("Hello", list.get(0)),
                () -> Assertions.assertEquals("World", list.get(1)),
                () -> Assertions.assertEquals("Java", list.get(2)),
                () -> Assertions.assertEquals("!", list.get(3)),
                ()-> Assertions.assertEquals(4, list.getSize()),
                ()-> Assertions.assertThrows(IndexOutOfBoundsException.class, ()-> list.get(4)),
                ()-> Assertions.assertThrows(IndexOutOfBoundsException.class, ()-> list.get(-1)),
                () -> Assertions.assertEquals("[Hello,World,Java,!]", list.toString())
        );
        // delete at the beginning
        list.deleteByValue("Hello");
        Assertions.assertAll(
                () -> Assertions.assertEquals("World", list.get(0)),
                () -> Assertions.assertEquals("Java", list.get(1)),
                () -> Assertions.assertEquals("!", list.get(2)),
                ()-> Assertions.assertEquals(3, list.getSize()),
                ()-> Assertions.assertThrows(IndexOutOfBoundsException.class, ()-> list.get(3)),
                ()-> Assertions.assertThrows(IndexOutOfBoundsException.class, ()-> list.get(-1)),
                () -> Assertions.assertEquals("[World,Java,!]", list.toString())
        );
        // delete at the end
        list.deleteByValue("!");
        Assertions.assertAll(
                () -> Assertions.assertEquals("World", list.get(0)),
                () -> Assertions.assertEquals("Java", list.get(1)),
                ()-> Assertions.assertEquals(2, list.getSize()),
                ()-> Assertions.assertThrows(IndexOutOfBoundsException.class, ()-> list.get(2)),
                ()-> Assertions.assertThrows(IndexOutOfBoundsException.class, ()-> list.get(-1)),
                () -> Assertions.assertEquals("[World,Java]", list.toString())
        );
        // delete the only element
        list.deleteByValue("Java");
        Assertions.assertAll(
                ()-> Assertions.assertEquals(1, list.getSize()),
                ()-> Assertions.assertEquals("World", list.get(0)),
                ()-> Assertions.assertThrows(IndexOutOfBoundsException.class, ()-> list.get(1)),
                ()-> Assertions.assertThrows(IndexOutOfBoundsException.class, ()-> list.get(-1)),
                ()-> Assertions.assertEquals("[World]", list.toString())
        );
    }

    @Test
    void TestDeleteByValue_WhenOnlyOneElement_ThenAddisWell() {
        list.add("Hello");
        list.deleteByValue("Hello");
        Assertions.assertAll(
                ()-> Assertions.assertEquals(0, list.getSize()),
                ()-> Assertions.assertThrows(IndexOutOfBoundsException.class, ()-> list.get(0)),
                ()-> Assertions.assertThrows(IndexOutOfBoundsException.class, ()-> list.get(-1)),
                ()-> Assertions.assertEquals("[]", list.toString())
        );
        list.add("Hello");
        Assertions.assertAll(
                ()-> Assertions.assertEquals(1, list.getSize()),
                ()-> Assertions.assertEquals("Hello", list.get(0)),
                ()-> Assertions.assertEquals("[Hello]", list.toString())
        );
    }

    @Test
    void TestDeleteByValue_WhenValueNotFound_ThenReturnFalse() {
        list.add("Hello");
        list.add("Java");
        list.add("World");
        list.add("Java");
        list.add("!");

        Assertions.assertFalse(list.deleteByValue("C++"));
    }

    @Test
    void TestToString_WhenListIsEmpty_ThenReturnEmptyString() {
        Assertions.assertEquals("[]", list.toString());
    }

    @Test
    void testToArray_WhenListIsEmpty_ThenReturnEmptyArray() {
        Assertions.assertArrayEquals(new String[]{}, list.toArray());
    }
}
