package com.jac.fsd.weather.dto;

import com.jac.fsd.weather.entity.User;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class UserDto {
    private String token;
    private List<GeoCodeDto> cities;

    public UserDto(User user) {
        if (user.getCities() != null){
            this.cities = user.getCities().stream().map(GeoCodeDto::new).toList();
        }
    }
}
