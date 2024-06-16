package one.hdcola.todolist.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import one.hdcola.todolist.model.ToDo;

@Data
@AllArgsConstructor
public class ToDoDto {
    private Long id;
    private String name;
    private Boolean completed;

    public ToDoDto(ToDo entity) {
        this.id = entity.getId();
        this.name = entity.getName();
        this.completed = entity.getCompleted();
    }
}
