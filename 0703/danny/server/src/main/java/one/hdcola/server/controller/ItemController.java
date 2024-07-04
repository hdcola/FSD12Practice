package one.hdcola.server.controller;

import one.hdcola.server.dto.ItemRequestDto;
import one.hdcola.server.dto.ItemResponseDto;
import one.hdcola.server.entity.Item;
import one.hdcola.server.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/items")
public class ItemController {
    private final ItemService itemService;

    @Autowired
    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @PostMapping
    public ResponseEntity<ItemResponseDto> createItem(@RequestBody ItemRequestDto itemRequestDto) {
        return ResponseEntity.ok(itemService.createItem(itemRequestDto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemResponseDto> getItem(@PathVariable Long id) {
        return ResponseEntity.ok(itemService.getItem(id));
    }

    @GetMapping
    public ResponseEntity<List<ItemResponseDto>> getItems() {
        return ResponseEntity.ok(itemService.getItems());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ItemResponseDto> updateItem(@PathVariable Long id, @RequestBody ItemRequestDto itemRequestDto) {
        return ResponseEntity.ok(itemService.updateItem(id, itemRequestDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        itemService.deleteItem(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/upload/{id}")
    public ResponseEntity<ItemResponseDto> uploadItemImage(@PathVariable Long id, @RequestParam("file")MultipartFile file) throws IOException {
        return ResponseEntity.ok(itemService.uploadItemImage(id, file));
    }

    @GetMapping("/image/{id}")
    public ResponseEntity<byte[]> getItemImage(@PathVariable Long id) {
        Item item = itemService.getItemEntity(id);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(item.getImageType()))
                .header("Content-Disposition", "attachment; filename=\"" + item.getImageFileName() + "\"")
                .body(item.getImage());
    }
}
