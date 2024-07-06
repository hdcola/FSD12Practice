package one.hdcola.server.service;

import one.hdcola.server.dto.OptionCategoryRequestDto;
import one.hdcola.server.dto.OptionCategoryResponseDto;
import one.hdcola.server.entity.OptionCategory;
import one.hdcola.server.repository.OptionCategoryRespository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OptionCategoryService {
    private final OptionCategoryRespository optionCategoryRepository;
    private final ItemService itemService;

    public OptionCategoryService(OptionCategoryRespository optionCategoryRepository, ItemService itemService) {
        this.optionCategoryRepository = optionCategoryRepository;
        this.itemService = itemService;
    }

    public List<OptionCategoryResponseDto> findAll() {
        return optionCategoryRepository.findAll().stream()
                .map(OptionCategoryResponseDto::new)
                .toList();
    }

    public OptionCategoryResponseDto create(OptionCategoryRequestDto optionCategoryRequestDto) {
        OptionCategory optionCategory = OptionCategory.builder()
                .name(optionCategoryRequestDto.getName())
                .maxSelection(optionCategoryRequestDto.getMaxSelection())
                .minSelection(optionCategoryRequestDto.getMinSelection())
                .required(optionCategoryRequestDto.getRequired())
                .multiple(optionCategoryRequestDto.getMultiple())
                .allowCustom(optionCategoryRequestDto.getAllowCustom())
                .allowQuantity(optionCategoryRequestDto.getAllowQuantity())
                .build();
        optionCategory.setItem(itemService.findById(optionCategoryRequestDto.getItemId()));
        return new OptionCategoryResponseDto(optionCategoryRepository.save(optionCategory));
    }

    public OptionCategoryResponseDto update(Long id, OptionCategoryRequestDto optionCategoryRequestDto) {
        OptionCategory optionCategory = optionCategoryRepository.findById(id).orElseThrow(() -> new RuntimeException("OptionCategory not found"));
        optionCategory.setName(optionCategoryRequestDto.getName());
        optionCategory.setMaxSelection(optionCategoryRequestDto.getMaxSelection());
        optionCategory.setMinSelection(optionCategoryRequestDto.getMinSelection());
        optionCategory.setRequired(optionCategoryRequestDto.getRequired());
        optionCategory.setMultiple(optionCategoryRequestDto.getMultiple());
        optionCategory.setAllowCustom(optionCategoryRequestDto.getAllowCustom());
        optionCategory.setAllowQuantity(optionCategoryRequestDto.getAllowQuantity());
        optionCategory.setItem(itemService.findById(optionCategoryRequestDto.getItemId()));
        return new OptionCategoryResponseDto(optionCategoryRepository.save(optionCategory));
    }

    public void delete(Long id) {
        optionCategoryRepository.deleteById(id);
    }

    public OptionCategoryResponseDto findById(Long id) {
        OptionCategory optionCategory = optionCategoryRepository.findById(id).orElseThrow(() -> new RuntimeException("OptionCategory not found"));
        return new OptionCategoryResponseDto(optionCategory);
    }
}
