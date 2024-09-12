# Spring Boot Unit Test

### dependency

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
```

It privides the following libraries:

- JUnit
- Spring Test
- Mockito
- AssertJ
- Hamcrest
- JSONassert
- JsonPath

### Unit Testing

Unit testing is a functional testing where individual units of a software are tested. The purpose is to validate that each unit of the software performs as designed.

It's a Unit Test use JUnit and AssertJ that [test StatusConverter class](https://github.com/hdcola/FSD12Practice/blob/ff99e508a334999ef4fc99ead560f5b137d53e4b/0911/danny/todo/src/test/java/org/hdcola/todo/Entities/StatusConverterTest.java).

```java
package org.hdcola.todo.Entities;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class StatusConverterTest {
    private final StatusConverter statusConverter = new StatusConverter();

    @Test
    public void testConvertToDatabaseColumn() {
        assertThat(statusConverter.convertToDatabaseColumn(Status.Done)).isTrue();
        assertThat(statusConverter.convertToDatabaseColumn(Status.Pending)).isFalse();
    }

    @Test
    public void testConvertToEntityAttribute() {
        assertThat(statusConverter.convertToEntityAttribute(true)).isEqualTo(Status.Done);
        assertThat(statusConverter.convertToEntityAttribute(false)).isEqualTo(Status.Pending);
    }
}
```

### Mocking

Mocking is a process used in unit testing when the unit being tested has external dependencies. The purpose of mocking is to isolate and focus on the code being tested and not on the behavior or state of external dependencies.

It's a Test use Mockito that [mock UserRepository for test CustomUserDetailsService class](https://github.com/hdcola/FSD12Practice/blob/main/0911/danny/todo/src/test/java/org/hdcola/todo/Services/CustomUserDetailsServiceTest.java).

```java
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
```

