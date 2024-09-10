package org.hdcola.blog.Repositories;

import org.hdcola.blog.Entities.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ArticleRepository extends JpaRepository<Article,Long> {
    @Query("SELECT a FROM Article a WHERE a.user.id = ?1")
    public List<Article> findByUserId(Long id);
}
