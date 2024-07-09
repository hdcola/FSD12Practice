package one.hdcola.server.service;

import one.hdcola.server.dto.ExtraOptionResponseDto;
import one.hdcola.server.repository.ExtraOptionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExtraOptionService {
    private final ExtraOptionRepository extraOptionRepository;

    public ExtraOptionService(ExtraOptionRepository extraOptionRepository) {
        this.extraOptionRepository = extraOptionRepository;
    }

    public List<ExtraOptionResponseDto> findAll() {
        return extraOptionRepository.findAll().stream()
                .map(ExtraOptionResponseDto::new)
                .toList();
    }

}
