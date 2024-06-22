package com.jac.fsd.weather.controller;

import com.jac.fsd.weather.dto.UserDto;
import com.jac.fsd.weather.dto.UserLoginDto;
import com.jac.fsd.weather.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@RequestBody UserLoginDto user) {
        return new ResponseEntity<>(userService.login(user),HttpStatus.OK);
    }
}
