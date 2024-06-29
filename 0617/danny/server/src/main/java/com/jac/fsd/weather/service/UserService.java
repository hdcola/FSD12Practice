package com.jac.fsd.weather.service;

import com.jac.fsd.weather.dto.GeoCodeDto;
import com.jac.fsd.weather.dto.UserDto;
import com.jac.fsd.weather.dto.UserLoginDto;
import com.jac.fsd.weather.dto.UserRegisterDto;
import com.jac.fsd.weather.entity.User;
import com.jac.fsd.weather.exception.WeatherException;
import com.jac.fsd.weather.repository.UserRepository;
import com.jac.fsd.weather.util.TokenGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService{

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }

    public UserDto login(UserLoginDto user) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
        );

        return userRepository.findByUsername(user.getUsername())
                .map(UserDto::new)
                .orElseThrow(() -> new WeatherException(HttpStatus.BAD_REQUEST, "Invalid username or password"));
    }

    public UserDto register(UserRegisterDto user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new WeatherException(HttpStatus.BAD_REQUEST, "Username already exists");
        }
        User newUser = new User();
        newUser.setUsername(user.getUsername());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(newUser);
        return new UserDto(savedUser);
    }

}
