package org.hdcola.todo.Entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users", indexes = {
        @Index(name = "idx_username", columnList = "username")
})
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 64)
    @NotBlank(message = "Username is required.")
    @Size(min = 4, max = 64, message = "Username must be between 4 and 64 characters.")
    @Pattern(regexp = "^[a-z]+$", message = "Username must only contain lowercase letters.")
    private String username;

    @Column(nullable = false, length = 256)
    private String password;

    @Transient
    private String password2;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Todo> todos;

}
