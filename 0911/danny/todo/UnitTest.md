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

It's a Unit Test use JUnit and asspertJ that [test StatusConverter class](https://github.com/hdcola/FSD12Practice/blob/ff99e508a334999ef4fc99ead560f5b137d53e4b/0911/danny/todo/src/test/java/org/hdcola/todo/Entities/StatusConverterTest.java#L1-L21).

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

