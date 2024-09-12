package org.hdcola.todo.Entities;

import jakarta.persistence.AttributeConverter;

public class StatusConverter implements AttributeConverter<Status, Boolean> {

    @Override
    public Boolean convertToDatabaseColumn(Status attribute) {
        return attribute == Status.Done;
    }

    @Override
    public Status convertToEntityAttribute(Boolean dbData) {
        return dbData ? Status.Done : Status.Pending;
    }
}
