package one.hdcola.todolist.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AppController {
    Logger logger = LoggerFactory.getLogger(AppController.class);

    @Value("${spring.application.name}")
    private String appName;

    @GetMapping("/info")
    public String getAppInfo() {
        return appName;
    }

}
