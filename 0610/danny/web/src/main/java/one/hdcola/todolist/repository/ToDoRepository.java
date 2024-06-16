package one.hdcola.todolist.repository;


import one.hdcola.todolist.model.ToDo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ToDoRepository extends JpaRepository<ToDo, Long> {
    List<ToDo> findByCompleted(Boolean completed);
}
