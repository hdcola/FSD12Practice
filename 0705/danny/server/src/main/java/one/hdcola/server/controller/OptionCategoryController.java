package one.hdcola.server.controller;

import one.hdcola.server.dto.OptionCategoryRequestDto;
import one.hdcola.server.dto.OptionCategoryResponseDto;
import one.hdcola.server.service.OptionCategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/optionCategories")
public class OptionCategoryController {
    private final OptionCategoryService optionCategoryService;

    public OptionCategoryController(OptionCategoryService optionCategoryService) {
        this.optionCategoryService = optionCategoryService;
    }

    @GetMapping
    public ResponseEntity<List<OptionCategoryResponseDto>> findAll() {
        return ResponseEntity.ok(optionCategoryService.findAll());
    }
}
