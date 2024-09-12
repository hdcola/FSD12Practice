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
