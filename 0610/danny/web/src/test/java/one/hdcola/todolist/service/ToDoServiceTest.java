package one.hdcola.todolist.service;

import one.hdcola.todolist.dto.ToDoDto;
import one.hdcola.todolist.repository.ToDoRepository;
import one.hdcola.todolist.model.ToDo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.when;

@SpringBootTest
@AutoConfigureMockMvc
public class ToDoServiceTest {

    @Autowired
    private ToDoService toDoService;

    @MockBean
    private ToDoRepository toDoRepository;

    @Test
    public void getToDosShouldReturnToDos() throws Exception {
        List<ToDo> toDos = new ArrayList<>();
        ToDo toDo = new ToDo();
        toDo.setId(1L);
        toDo.setName("unit test");
        toDo.setCompleted(false);
        toDos.add(toDo);
        when(toDoRepository.findAll()).thenReturn(toDos);
        List<ToDoDto> toDoDtoList = toDoService.getTodos();
        assert toDoDtoList.size() > 1;

    }
}
