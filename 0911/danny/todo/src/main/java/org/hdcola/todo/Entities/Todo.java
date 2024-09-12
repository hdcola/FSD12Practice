package org.hdcola.todo.Entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "todos")
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    @NotBlank(message = "Task is required.")
    @Size(min = 1, max = 100, message = "Task must be between 1 and 100 characters.")
    private String task;

    @Future(message = "Due date must be in the future.")
    private LocalDate dueDate=LocalDate.now().plusDays(1);

    @Convert(converter = StatusConverter.class)
    @Column(nullable = false, columnDefinition = "BOOLEAN")
    @NotNull(message = "isDone is required.")
    private Status isDone = Status.Pending;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

}
