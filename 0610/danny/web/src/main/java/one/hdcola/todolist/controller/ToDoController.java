package one.hdcola.todolist.controller;

import one.hdcola.todolist.dto.CreateToDoDto;
import one.hdcola.todolist.dto.ToDoDto;
import one.hdcola.todolist.dto.UpdateToDoDto;
import one.hdcola.todolist.service.ToDoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/todos")
public class ToDoController {
    private  ToDoService toDoService;

    public ToDoController(ToDoService toDoService) {
        this.toDoService = toDoService;
    }

    @PostMapping("")
    public ResponseEntity<ToDoDto> createToDo(@RequestBody CreateToDoDto newToDo) {
        ToDoDto createdToDo = toDoService.createTodo(newToDo);
        return new ResponseEntity<>(createdToDo, HttpStatus.CREATED);
    }

    @GetMapping("")
    public List<ToDoDto> getToDos(@RequestParam Optional<Boolean> completed) {
        if(completed.isPresent()){
            return toDoService.getTodosByCompleted(completed.get());
        }else{
            return toDoService.getTodos();
        }
    }

    @GetMapping("/{id}")
    public ToDoDto getToDoById(@PathVariable Long id) {
        return toDoService.getTodoById(id);
    }

    @PutMapping("/{id}")
    public ToDoDto updateToDo(@PathVariable Long id, @RequestBody UpdateToDoDto updateToDo) {
        return toDoService.updateToDo(id, updateToDo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteToDoById(@PathVariable Long id) {
        toDoService.deleteToDo(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
