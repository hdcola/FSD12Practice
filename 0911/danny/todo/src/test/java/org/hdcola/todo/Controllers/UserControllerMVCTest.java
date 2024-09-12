package org.hdcola.todo.Controllers;

import org.hdcola.todo.Configs.WebSecurityConfig;
import org.hdcola.todo.Entities.User;
import org.hdcola.todo.Repositories.UserRepository;
import org.hdcola.todo.Services.CustomUserDetailsService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = UserController.class)
@Import(WebSecurityConfig.class)
public class UserControllerMVCTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private CustomUserDetailsService userDetailsService;

    @Test
    public void testRegister_Success() throws Exception {
        when(userRepository.findByUsername(anyString())).thenReturn(Optional.empty());

        mockMvc.perform(post("/register")
                        .with(SecurityMockMvcRequestPostProcessors.csrf())
                        .param("username", "newuser")
                        .param("password", "password123")
                        .param("password2", "password123"))
                .andExpect(status().is3xxRedirection())
                .andExpect(redirectedUrl("/login"))
                .andExpect(flash().attribute("message", "Registration successful. Please login."));

        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void testRegister_UsernameExists() throws Exception {
        when(userRepository.findByUsername(anyString())).thenReturn(Optional.of(new User()));

        mockMvc.perform(post("/register")
                        .with(SecurityMockMvcRequestPostProcessors.csrf())
                        .param("username", "existinguser")
                        .param("password", "password123")
                        .param("password2", "password123"))
                .andExpect(status().isOk())
                .andExpect(view().name("user/register"))
                .andExpect(model().attributeHasFieldErrors("user", "username"));

        verify(userRepository, times(0)).save(any(User.class));
    }

    @Test
    void testRegister_PasswordsDoNotMatch() throws Exception {
        mockMvc.perform(post("/register")
                        .with(SecurityMockMvcRequestPostProcessors.csrf())
                        .param("username", "newuser")
                        .param("password", "password123")
                        .param("password2", "password321"))
                .andExpect(status().isOk())
                .andExpect(view().name("user/register"))
                .andExpect(model().attributeHasFieldErrors("user", "password", "password2"));

        verify(userRepository, times(0)).save(any(User.class));
    }

    @Test
    void testRegister_PasswordTooShort() throws Exception {
        mockMvc.perform(post("/register")
                        .with(SecurityMockMvcRequestPostProcessors.csrf())
                        .param("username", "newuser")
                        .param("password", "pass")
                        .param("password2", "pass"))
                .andExpect(status().isOk())
                .andExpect(view().name("user/register"))
                .andExpect(model().attributeHasFieldErrors("user", "password"));

        verify(userRepository, times(0)).save(any(User.class));
    }

    @Test
    void testRegister_PasswordTooLong() throws Exception {
        String longPassword = "a".repeat(41);
        mockMvc.perform(post("/register")
                        .with(SecurityMockMvcRequestPostProcessors.csrf())
                        .param("username", "newuser")
                        .param("password", longPassword)
                        .param("password2", longPassword))
                .andExpect(status().isOk())
                .andExpect(view().name("user/register"))
                .andExpect(model().attributeHasFieldErrors("user", "password"));

        verify(userRepository, times(0)).save(any(User.class));
    }
}
