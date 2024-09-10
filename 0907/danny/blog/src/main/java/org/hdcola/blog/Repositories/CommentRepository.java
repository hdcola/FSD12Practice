package org.hdcola.blog.Repositories;

import org.hdcola.blog.Entities.Comment;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CommentRepository extends JpaRepository<Comment,Long> {
}
