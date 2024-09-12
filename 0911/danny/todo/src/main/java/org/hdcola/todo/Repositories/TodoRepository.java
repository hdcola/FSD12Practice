package org.hdcola.todo.Repositories;

import org.hdcola.todo.Entities.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo,Long> {

}
