package one.hdcola.todolist.service;

import one.hdcola.todolist.dto.CreateToDoDto;
import one.hdcola.todolist.dto.ToDoDto;
import one.hdcola.todolist.dto.UpdateToDoDto;
import one.hdcola.todolist.exception.ToDoException;
import one.hdcola.todolist.model.ToDo;
import one.hdcola.todolist.repository.ToDoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class ToDoService {
    private ToDoRepository toDoRepository;

    public ToDoService(ToDoRepository toDoRepository) {
        this.toDoRepository = toDoRepository;
    }

    public ToDoDto createTodo(CreateToDoDto createToDoDto) {
        if (createToDoDto.getName() == null || createToDoDto.getName().isEmpty()) {
            throw new ToDoException(400, "createTodo: Name is required");
        }
        ToDo newToDo = new ToDo();
        newToDo.setName(createToDoDto.getName());
        newToDo.setCompleted(createToDoDto.getCompleted());
        ToDo savedToDo = toDoRepository.save(newToDo);
        return new ToDoDto(savedToDo);
    }

    public List<ToDoDto> getTodos() {
        List<ToDo> todos = toDoRepository.findAll();
        return todos.stream().map(ToDoDto::new).toList();
    }

    public List<ToDoDto> getTodosByCompleted(boolean completed) {
        List<ToDo> todos = toDoRepository.findByCompleted(completed);
        return todos.stream().map(ToDoDto::new).toList();
    }

    public ToDoDto getTodoById(Long id) {
        Optional<ToDo> todo = toDoRepository.findById(id);
        if(todo.isPresent()){
            return new ToDoDto(todo.get());
        }else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "getTodoById: ToDo not found");
        }
    }

    public ToDoDto updateToDo(Long id, UpdateToDoDto updateToDoDto) {
        Optional<ToDo> todo = toDoRepository.findById(id);
        if(todo.isPresent()){
            ToDo toDo = todo.get();
            toDo.setName(updateToDoDto.getName());
            toDo.setCompleted(updateToDoDto.getCompleted());
            ToDo updatedToDo = toDoRepository.save(toDo);
            return new ToDoDto(updatedToDo);
        }else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "updateToDo: ToDo not found");
        }
    }

    public void deleteToDo(Long id) {
        Optional<ToDo> todo = toDoRepository.findById(id);
        if(todo.isPresent()){
            toDoRepository.delete(todo.get());
        }else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "deleteToDo: ToDo not found");
        }
    }
}
