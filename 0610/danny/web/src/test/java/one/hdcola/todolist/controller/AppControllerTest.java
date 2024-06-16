package one.hdcola.todolist.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
public class AppControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Value("${spring.application.name}")
    private String appName;

    @Test
    public void getInfo() throws Exception {
        mockMvc.perform(get("/api/info"))
            .andExpect(status().isOk())
            .andExpect(content().string(appName));
    }
}


