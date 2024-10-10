import org.hdcola.RoundFIFOQueue;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class RoundFIFOQueueTests {
    private RoundFIFOQueue<String> queue;

    @BeforeEach
    void setUp() {
        queue = new RoundFIFOQueue<>(3);
    }

    @AfterEach
    void tearDown() {
        queue = null;
    }

    @Test
    void test_constructor() {
        queue = new RoundFIFOQueue<>(3);
        queue.printQueue();
    }

    @Test
    void test_enque() {
        queue.enque("Joe",false);
        queue.printQueue();
        assertEquals(1, queue.size());
        queue.enque("Jane",false);
        queue.enque("Jack",false);
        queue.printQueue();
        assertEquals(3, queue.size());
    }

    @Test
    void test_enque_grow() {
        queue.enque("Joe",false);
        queue.enque("Jane",false);
        queue.enque("Jack",false);
        queue.enque("Jill",true);
        queue.printQueue();
        assertEquals(4, queue.size());
    }

    @Test
    void test_eque_full() {
        queue.enque("Joe",false);
        queue.enque("Jane",false);
        queue.enque("Jack",false);
        queue.printQueue();
        assertEquals(3, queue.size());
        assertThrows(RuntimeException.class, () -> queue.enque("John",false));
    }

    @Test
    void test_deque() {
        queue.enque("Joe",false);
        queue.enque("Jane",false);
        queue.enque("Jack",false);
        assertEquals("Joe", queue.deque());
        assertEquals(2, queue.size());
        queue.printQueue();
        assertEquals("Jane", queue.deque());
        assertEquals(1, queue.size());
        queue.printQueue();
        assertEquals("Jack", queue.deque());
        assertEquals(0, queue.size());
        queue.printQueue();
        assertThrows(RuntimeException.class, () -> queue.deque());
    }

    @Test
    void test_toArray() {
        queue.enque("Jane",false);
        queue.enque("Joe",false);
        queue.printQueue();
        assertArrayEquals(new String[]{"Joe", "Jane"}, queue.toArray());
        queue.enque("Jack",false);
        assertArrayEquals(new String[]{"Jack", "Joe", "Jane"}, queue.toArray());
        queue.deque();
        assertArrayEquals(new String[]{"Jack", "Joe"}, queue.toArray());
    }

    @Test
    void test_toArray_WhenEmpty() {
        String[] array = new String[]{};
        assertArrayEquals(array, queue.toArray());
    }

    @Test
    void test_countValues(){
        queue.enque("Joe",false);
        queue.enque("Joe",false);
        queue.enque("Jack",false);
        assertEquals(2, queue.countValues("Joe"));
        assertEquals(0, queue.countValues("Danny"));
        queue.enque("Joe",true);
        assertEquals(3, queue.countValues("Joe"));
        queue.deque();
        assertEquals(2, queue.countValues("Joe"));
    }

    @Test
    void test_roundFIFOQueue() {
        queue.enque("Joe", false);
        queue.enque("Jane", false);
        queue.enque("Jack", false);
        assertAll(
                () -> assertEquals(3, queue.size()),
                () -> assertArrayEquals(new String[]{"Jack", "Jane", "Joe"}, queue.toArray()),
                () -> assertEquals(1, queue.countValues("Jack")),
                () -> assertEquals(1, queue.countValues("Jane")),
                () -> assertEquals(1, queue.countValues("Joe"))
        );
        queue.deque();
        assertAll(
                () -> assertEquals(2, queue.size()),
                () -> assertArrayEquals(new String[]{"Jack", "Jane"}, queue.toArray()),
                () -> assertEquals(1, queue.countValues("Jack")),
                () -> assertEquals(1, queue.countValues("Jane")),
                () -> assertEquals(0, queue.countValues("Joe"))
        );
        queue.enque("Jill", false);
        assertAll(
                () -> assertEquals(3, queue.size()),
                () -> assertArrayEquals(new String[]{"Jill", "Jack", "Jane"}, queue.toArray()),
                () -> assertEquals(0, queue.countValues("Joe")),
                () -> assertEquals(1, queue.countValues("Jack")),
                () -> assertEquals(1, queue.countValues("Jane")),
                () -> assertEquals(1, queue.countValues("Jill"))
        );
        queue.deque();
        queue.deque();
        assertAll(
                () -> assertEquals(1, queue.size()),
                () -> assertArrayEquals(new String[]{"Jill"}, queue.toArray()),
                () -> assertEquals(0, queue.countValues("Joe")),
                () -> assertEquals(0, queue.countValues("Jack")),
                () -> assertEquals(0, queue.countValues("Jane")),
                () -> assertEquals(1, queue.countValues("Jill"))
        );
        queue.enque("Joe", false);
        queue.enque("Jane", false);
        assertAll(
                () -> assertEquals(3, queue.size()),
                () -> assertArrayEquals(new String[]{"Jane", "Joe", "Jill"}, queue.toArray()),
                () -> assertEquals(0, queue.countValues("Jack")),
                () -> assertEquals(1, queue.countValues("Jane")),
                () -> assertEquals(1, queue.countValues("Joe")),
                () -> assertEquals(1, queue.countValues("Jill"))
        );
        queue.deque();
        queue.deque();
        assertAll(
                () -> assertEquals(1, queue.size()),
                () -> assertArrayEquals(new String[]{"Jane"}, queue.toArray()),
                () -> assertEquals(0, queue.countValues("Jack")),
                () -> assertEquals(1, queue.countValues("Jane")),
                () -> assertEquals(0, queue.countValues("Joe")),
                () -> assertEquals(0, queue.countValues("Jill"))
        );
        queue.printQueue();
    }
}
