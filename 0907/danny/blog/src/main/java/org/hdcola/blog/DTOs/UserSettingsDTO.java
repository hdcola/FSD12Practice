package org.hdcola.blog.DTOs;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hdcola.blog.Entities.User;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserSettingsDTO {

    Long id;
    String password;
    @NotBlank(message = "Name is required")
    @Size(min = 3, max = 64, message = "Name must be between 3 and 64 characters long")
    String name;

    public static UserSettingsDTO fromUser(User user) {
        UserSettingsDTO userSettingsDTO = new UserSettingsDTO();
        userSettingsDTO.setId(user.getId());
        userSettingsDTO.setName(user.getName());
        return userSettingsDTO;
    }
}
