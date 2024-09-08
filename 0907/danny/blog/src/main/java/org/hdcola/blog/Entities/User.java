package org.hdcola.blog.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue
    private Long id;
    @Column(nullable = false,unique = true,length = 50)
    private String email;
    @Column(nullable = false,length = 64)
    private String password;
    @Column(nullable = false,length = 50)
    private String name;
}
