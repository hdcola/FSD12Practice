package com.jac.fsd.weather.service;

import com.jac.fsd.weather.dto.GeoCodeDto;
import com.jac.fsd.weather.dto.UserDto;
import com.jac.fsd.weather.dto.UserLoginDto;
import com.jac.fsd.weather.entity.User;
import com.jac.fsd.weather.repository.UserRepository;
import com.jac.fsd.weather.util.TokenGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDto login(UserLoginDto user) {
        User loginedUser = userRepository.findByUsernameAndPassword(user.getUsername(), user.getPassword())
                .orElseThrow(() -> new RuntimeException("Invalid username or password"));
        String token = TokenGenerator.generateToken();
        loginedUser.setToken(token);
        userRepository.save(loginedUser);

        List<GeoCodeDto> cities = loginedUser.getCities().stream().map(GeoCodeDto::new).toList();

        UserDto userDto = new UserDto();
        userDto.setToken(token);
        userDto.setCities(cities);

        return userDto;
    }
}
