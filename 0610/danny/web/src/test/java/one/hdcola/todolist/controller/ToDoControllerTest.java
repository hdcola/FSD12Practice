package one.hdcola.todolist.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import one.hdcola.todolist.dto.ToDoDto;
import one.hdcola.todolist.service.ToDoService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.when;

@SpringBootTest
@AutoConfigureMockMvc
public class ToDoControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ToDoService toDoService;

    @Test
    public void getToDosShouldReturnToDos()  throws Exception {
        List<ToDoDto> toDos = new ArrayList<>();
        ToDoDto toDoDto = new ToDoDto(1L, "unit test", false);
        toDos.add(toDoDto);
        when(toDoService.getTodos()).thenReturn(toDos);
        mockMvc.perform(get("/api/todos"))
            .andExpect(status().isOk());
    }
}
