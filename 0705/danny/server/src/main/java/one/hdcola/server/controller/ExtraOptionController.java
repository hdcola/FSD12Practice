package one.hdcola.server.controller;

import one.hdcola.server.dto.ExtraOptionResponseDto;
import one.hdcola.server.service.ExtraOptionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/extraOption")
public class ExtraOptionController {
    private final ExtraOptionService extraOptionService;

    public ExtraOptionController(ExtraOptionService extraOptionService) {
        this.extraOptionService = extraOptionService;
    }

    @GetMapping
    public ResponseEntity<List<ExtraOptionResponseDto>> findAll() {
        return ResponseEntity.ok(extraOptionService.findAll());
    }
}
