package one.hdcola.server.service;

import one.hdcola.server.dto.ImageResponseDto;
import one.hdcola.server.dto.ItemResponseDto;
import one.hdcola.server.entity.Image;
import one.hdcola.server.repository.ImageRespository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class ImageService {
    private final ImageRespository imageRespository;

    public ImageService(ImageRespository imageRespository) {
        this.imageRespository = imageRespository;
    }

    public ImageResponseDto uploadItemImage(MultipartFile file) throws IOException{
        Image image = new Image();
        image.setImageType(file.getContentType());
        image.setImageFileName(file.getOriginalFilename());
        image.setImage(file.getBytes());
        Image newImage = imageRespository.save(image);
        return new ImageResponseDto(newImage);
    }

    public Image getImageEntity(Long id) {
        return imageRespository.findById(id).orElseThrow();
    }

    public ImageResponseDto deleteItemImage(Long id) {
        Image image = imageRespository.findById(id).orElseThrow();
        imageRespository.delete(image);
        return new ImageResponseDto(image);
    }
}