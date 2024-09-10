package org.hdcola.blog.Controllers;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.hdcola.blog.DTOs.UserSettingsDTO;
import org.hdcola.blog.Entities.User;
import org.hdcola.blog.Repositories.ArticleRepository;
import org.hdcola.blog.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Slf4j
@Controller
public class UserController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserController(UserRepository userRepository, PasswordEncoder passwordEncoder, ArticleRepository articleRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/register")
    public String register(Model model) {
        model.addAttribute("user", new User());
        return "register";
    }

    @PostMapping("/register")
    public String create(@Valid User user, Errors errors, Model model) {
        // Check if email is already in use
        if (userRepository.findByEmail(user.getEmail()) != null) {
            errors.rejectValue("email", "email.exists", "Email is already in use.");
        }
        if (errors.hasErrors()) {
            return "register";
        }
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        userRepository.save(user);
        return "redirect:/";
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/logout")
    public String logout() {
        return "logout";
    }

    @GetMapping("/settings")
    public String settings(Authentication authentication, Model model) {
        User user = userRepository.findByEmail(authentication.getName());
        UserSettingsDTO userSettingsDTO = UserSettingsDTO.fromUser(user);
        log.debug(userSettingsDTO.toString());
        model.addAttribute("user", userSettingsDTO);
        return "settings";
    }

    @PostMapping("/settings")
    public String update(Authentication authentication, @Valid @ModelAttribute("user") UserSettingsDTO userDto, Errors errors) {
        log.debug(userDto.toString());
        if (errors.hasErrors()) {
            log.debug(errors.toString());
            return "settings";
        }
        User user = userRepository.findByEmail(authentication.getName());
        if(!userDto.getPassword().trim().isBlank()) {
            user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        }
        user.setName(userDto.getName());
        userRepository.save(user);
        return "redirect:/";
    }
}
