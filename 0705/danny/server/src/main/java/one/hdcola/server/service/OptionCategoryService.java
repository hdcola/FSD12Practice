package one.hdcola.server.service;

import one.hdcola.server.dto.OptionCategoryResponseDto;
import one.hdcola.server.entity.OptionCategory;
import one.hdcola.server.repository.OptionCategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OptionCategoryService {
    private final OptionCategoryRepository optionCategoryRepository;

    public OptionCategoryService(OptionCategoryRepository optionCategoryRepository) {
        this.optionCategoryRepository = optionCategoryRepository;
    }

    public List<OptionCategoryResponseDto> findAll() {
        return optionCategoryRepository.findAll().stream()
                .map(OptionCategoryResponseDto::new)
                .toList();
    }

    public OptionCategoryResponseDto findById(Long id) {
        OptionCategory optionCategory = optionCategoryRepository.findById(id).orElseThrow(() -> new RuntimeException("OptionCategory not found"));
        return new OptionCategoryResponseDto(optionCategory);
    }
}
