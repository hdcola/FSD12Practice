package one.hdcola.server.service;

import one.hdcola.server.dto.ImageResponseDto;
import one.hdcola.server.entity.Image;
import one.hdcola.server.repository.ImageRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class ImageService {
    private final ImageRepository imageRepository;

    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    public ImageResponseDto uploadItemImage(MultipartFile file) throws IOException{
        Image image = new Image();
        image.setImageType(file.getContentType());
        image.setImageFileName(file.getOriginalFilename());
        image.setImage(file.getBytes());
        Image newImage = imageRepository.save(image);
        return new ImageResponseDto(newImage);
    }

    public Image getImageEntity(Long id) {
        return imageRepository.findById(id).orElseThrow();
    }

    public ImageResponseDto deleteItemImage(Long id) {
        Image image = imageRepository.findById(id).orElseThrow();
        imageRepository.delete(image);
        return new ImageResponseDto(image);
    }
}