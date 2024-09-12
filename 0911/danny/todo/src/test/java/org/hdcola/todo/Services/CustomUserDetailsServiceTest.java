package org.hdcola.todo.Services;

import org.hdcola.todo.Configs.CustomUserDetails;
import org.hdcola.todo.Entities.User;
import org.hdcola.todo.Repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

public class CustomUserDetailsServiceTest {
    private static final String VALID_USERNAME = "testuser";
    private static final String INVALID_USERNAME = "unknown";
    private static final String PASSWORD = "password";

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private CustomUserDetailsService customUserDetailsService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testLoadUserByUsername_WhenUserExists_ShouldReturnUserDetails() {
        User user = new User(1L,VALID_USERNAME, PASSWORD, PASSWORD, List.of());

        when(userRepository.findByUsername(VALID_USERNAME)).thenReturn(Optional.of(user));

        CustomUserDetails userDetails = (CustomUserDetails) customUserDetailsService.loadUserByUsername(VALID_USERNAME);

        assertThat(userDetails.getUsername()).isEqualTo(VALID_USERNAME);
        assertThat(userDetails.getPassword()).isEqualTo(PASSWORD);

        verify(userRepository).findByUsername(VALID_USERNAME);
    }

    @Test
    public void testLoadUserByUsername_WhenUserNotFound_ShouldThrowException() {
        when(userRepository.findByUsername(INVALID_USERNAME)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> customUserDetailsService.loadUserByUsername(INVALID_USERNAME))
                .isInstanceOf(UsernameNotFoundException.class)
                .hasMessage("User not found");

        verify(userRepository).findByUsername(INVALID_USERNAME);
    }

}
