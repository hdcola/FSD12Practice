package org.hdcola.blog.Controllers;

import org.hdcola.blog.Entities.Comment;
import org.hdcola.blog.Entities.User;
import org.hdcola.blog.Repositories.ArticleRepository;
import org.hdcola.blog.Repositories.CommentRepository;
import org.hdcola.blog.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class CommentController {
    private final CommentRepository commentRepository;
    private final  UserRepository userRepository;
    private final ArticleRepository articleRepository;

    @Autowired
    public CommentController(CommentRepository commentRepository, UserRepository userRepository, ArticleRepository articleRepository) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.articleRepository = articleRepository;
    }

    @PostMapping("/comment/new/{articleId}")
    public String newComment(Authentication authentication, @PathVariable Long articleId, Comment comment) {
        User user = userRepository.findByEmail(authentication.getName());
        comment.setUser(user);
        comment.setArticle(articleRepository.findById(articleId).get());
        commentRepository.save(comment);
        return "redirect:/show/" + articleId;
    }
}
