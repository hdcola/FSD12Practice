package org.hdcola.todo.Controllers;

import org.hdcola.todo.Entities.User;
import org.hdcola.todo.Repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

public class UserControllerTest {
    private static final String EXISTING_USERNAME = "existingUser";
    private static final String NEW_USERNAME = "newUser";
    private static final String VALID_PASSWORD = "validPassword";
    private static final String INVALID_PASSWORD = "short";
    private static final String ERROR_USERNAME_EXISTS = "username.exists";
    private static final String ERROR_PASSWORDS_DO_NOT_MATCH = "passwordsDoNotMatch";
    private static final String ERROR_PASSWORD_LENGTH = "passwordLength";
    private static final String REGISTER_VIEW = "user/register";
    private static final String LOGIN_REDIRECT = "redirect:/login";

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private BindingResult bindingResult;

    @Mock
    private RedirectAttributes redirectAttributes;

    @Mock
    private Model model;

    @InjectMocks
    private UserController userController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testRegister_WhenUserAlreadyExists_ShouldReturnRegistrationPageWithError() {
        User user = new User();
        user.setUsername(EXISTING_USERNAME);
        user.setPassword(VALID_PASSWORD);
        user.setPassword2(VALID_PASSWORD);
        when(userRepository.findByUsername(EXISTING_USERNAME)).thenReturn(Optional.of(user));
        when(bindingResult.hasErrors()).thenReturn(true);

        String view = userController.register(user, bindingResult, redirectAttributes);

        verify(bindingResult).rejectValue("username", ERROR_USERNAME_EXISTS, "Username is already in use.");
        assertThat(view).isEqualTo(REGISTER_VIEW);
    }

    @Test
    public void testRegister_WhenPasswordsDoNotMatch_ShouldReturnRegistrationPageWithError() {
        User user = new User();
        user.setPassword("password");
        user.setPassword2("differentPassword");
        when(bindingResult.hasErrors()).thenReturn(true);

        String view = userController.register(user, bindingResult, redirectAttributes);

        verify(bindingResult).rejectValue("password", ERROR_PASSWORDS_DO_NOT_MATCH, "Passwords must match");
        verify(bindingResult).rejectValue("password2", ERROR_PASSWORDS_DO_NOT_MATCH, "Passwords must match");
        assertThat(view).isEqualTo(REGISTER_VIEW);
    }

    @Test
    public void testRegister_WhenPasswordLengthIsInvalid_ShouldReturnRegistrationPageWithError() {
        User user = new User();
        user.setPassword(INVALID_PASSWORD);
        user.setPassword2(INVALID_PASSWORD);
        when(bindingResult.hasErrors()).thenReturn(true);

        String view = userController.register(user, bindingResult, redirectAttributes);

        verify(bindingResult).rejectValue("password", ERROR_PASSWORD_LENGTH, "Password must be between 6 and 40 characters");
        assertThat(view).isEqualTo(REGISTER_VIEW);
    }

    @Test
    public void testRegister_WhenRegistrationSuccessful_ShouldRedirectToLogin() {
        User user = new User();
        user.setUsername(NEW_USERNAME);
        user.setPassword(VALID_PASSWORD);
        user.setPassword2(VALID_PASSWORD);

        when(userRepository.findByUsername(NEW_USERNAME)).thenReturn(Optional.empty());
        when(passwordEncoder.encode(VALID_PASSWORD)).thenReturn("encodedPassword");

        String view = userController.register(user, bindingResult, redirectAttributes);

        verify(userRepository).save(user);
        verify(redirectAttributes).addFlashAttribute("message", "Registration successful. Please login.");
        assertThat(view).isEqualTo(LOGIN_REDIRECT);
    }
}
