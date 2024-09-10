package org.hdcola.blog.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Comment {
    @Id
    @GeneratedValue
    private Long id;

    @CreationTimestamp
    private LocalDateTime creationTime;

    @Lob
    @Basic(fetch = FetchType.EAGER)
    @Column(name = "body")
    private String body;

    @ManyToOne
    @JoinColumn(name = "article_id", nullable = false)
    @ToString.Exclude
    private Article article;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @ToString.Exclude
    private User user;

}
