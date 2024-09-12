package org.hdcola.todo.Controllers;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.hdcola.todo.Entities.User;
import org.hdcola.todo.Repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Slf4j
@Controller
public class UserController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/register")
    public String register(Model model) {
        User user = new User();
        model.addAttribute("user", user);
        return "user/register";
    }

    @PostMapping("/register")
    public String register(@Valid User user, BindingResult result, RedirectAttributes redirectAttributes) {
        // Check username is already in use
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            log.info("Username is already in use:" + user.getUsername());
            result.rejectValue("username", "username.exists", "Username is already in use.");
        }

        // password should match password2
        if (!user.getPassword().equals(user.getPassword2())) {
            result.rejectValue("password", "passwordsDoNotMatch", "Passwords must match");
            result.rejectValue("password2", "passwordsDoNotMatch", "Passwords must match");
        }

        // password should 6-40 characters
        if (user.getPassword().length() < 6 || user.getPassword().length() > 40) {
            result.rejectValue("password", "passwordLength", "Password must be between 6 and 40 characters");
        }

        if(result.hasErrors()) {
            log.info("Validation errors found:"+ result);
            return "user/register";
        }
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        userRepository.save(user);
        redirectAttributes.addFlashAttribute("message", "Registration successful. Please login.");
        return "redirect:/login";
    }

    @GetMapping("/login")
    public String login(Model model) {
        User user = new User();
        model.addAttribute("user", user);
        return "user/login";
    }

    @GetMapping("/logout")
    public String logout() {
        return "user/logout";
    }
}
