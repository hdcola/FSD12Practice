package org.hdcola.blog.Controllers;

import lombok.extern.slf4j.Slf4j;
import org.hdcola.blog.Entities.Article;
import org.hdcola.blog.Entities.Comment;
import org.hdcola.blog.Repositories.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Slf4j
@Controller
public class ShowController {
    private final ArticleRepository articleRepository;

    @Autowired
    public ShowController(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("articles", articleRepository.findAll().reversed());
        return "index";
    }

    @GetMapping("/show/{id}")
    @Transactional(readOnly = true)
    public String show(@PathVariable Long id, Model model) {
        Article article = articleRepository.findById(id).get();
        model.addAttribute("article", article);
        Comment comment = new Comment();
        comment.setArticle(article);
        model.addAttribute("comment", comment);
        return "show/blog";
    }
}
