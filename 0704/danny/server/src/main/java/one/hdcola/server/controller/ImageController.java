package one.hdcola.server.controller;

import one.hdcola.server.dto.ImageResponseDto;
import one.hdcola.server.dto.ItemResponseDto;
import one.hdcola.server.entity.Image;
import one.hdcola.server.service.ImageService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/images")
public class ImageController {

    private final ImageService imageService;

    public ImageController( ImageService imageService) {
        this.imageService = imageService;
    }

    @PostMapping
    public ResponseEntity<ImageResponseDto> uploadItemImage(@RequestParam("file") MultipartFile file) throws IOException {
        return ResponseEntity.ok(imageService.uploadItemImage(file));
    }

    @GetMapping("/{id}")
    public ResponseEntity<byte[]> getItemImage(@PathVariable Long id) {
        Image image = imageService.getImageEntity(id);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(image.getImageType()))
                .header("Content-Disposition", "attachment; filename=\"" + image.getImageFileName() + "\"")
                .body(image.getImage());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ImageResponseDto> deleteItemImage(@PathVariable Long id) {
        return ResponseEntity.ok(imageService.deleteItemImage(id));
    }
}
