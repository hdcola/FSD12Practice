package org.hdcola.todo.Controllers;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.hdcola.todo.Entities.Todo;
import org.hdcola.todo.Entities.User;
import org.hdcola.todo.Exceptions.TodoNotFoundException;
import org.hdcola.todo.Repositories.TodoRepository;
import org.hdcola.todo.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;
import java.util.Optional;

@Slf4j
@Controller
public class TodoController {
    private final TodoRepository todoRepository;
    private final UserRepository userRepository;

    @Autowired
    public TodoController(TodoRepository todoRepository, UserRepository userRepository) {
        this.todoRepository = todoRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/")
    public String index(Authentication authentication, Model model) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username).get();
        List<Todo> todos = user.getTodos() != null ? user.getTodos() : List.of();
        model.addAttribute("todos", todos);
        return "todo/index";
    }

    @GetMapping("/add")
    public String add(Model model) {
        model.addAttribute("todo", new Todo());
        return "todo/add";
    }

    @PostMapping("/add")
    public String add(Authentication authentication, @Valid Todo todo, BindingResult result, RedirectAttributes ra) {
        if (result.hasErrors()) {
            log.debug(String.valueOf(result));
            return "todo/add";
        }
        String username = authentication.getName();
        log.debug("Username: " + username);
        todo.setUser(userRepository.findByUsername(username).get());
        todoRepository.save(todo);
        ra.addFlashAttribute("message", "Todo added successfully.");
        return "redirect:/";
    }

    @GetMapping("/edit/{id}")
    public String edit(@PathVariable Long id, Model model) {
        Optional<Todo> todo = todoRepository.findById(id);
        if (todo.isEmpty()) {
            throw new TodoNotFoundException("Todo not found with id " + id);
        }

        model.addAttribute("todo", todo.get());
        return "todo/add";
    }

    @PostMapping("/edit/{id}")
    public String edit(@PathVariable Long id, @Valid Todo todo, BindingResult result, RedirectAttributes ra) {
        if (result.hasErrors()) {
            log.debug(String.valueOf(result));
            return "todo/add";
        }
        todoRepository.save(todo);
        ra.addFlashAttribute("message", "Todo updated successfully.");
        return "redirect:/";
    }

    @GetMapping("/delete/{id}")
    public String delete(@PathVariable Long id, RedirectAttributes ra) {
        Optional<Todo> todo = todoRepository.findById(id);
        if (todo.isEmpty()) {
            throw new TodoNotFoundException("Todo not found with id " + id);
        }
        todoRepository.deleteById(id);
        ra.addFlashAttribute("message", "Todo deleted successfully.");
        return "redirect:/";
    }
}
