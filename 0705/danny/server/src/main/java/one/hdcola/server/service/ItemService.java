package one.hdcola.server.service;

import one.hdcola.server.dto.ItemRequestDto;
import one.hdcola.server.dto.ItemResponseDto;
import one.hdcola.server.entity.Item;
import one.hdcola.server.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {
    private final ItemRepository itemRepository;

    @Autowired
    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public Item findById(Long itemId) {
        return itemRepository.findById(itemId).orElseThrow(() -> new RuntimeException("Item not found"));
    }


    public ItemResponseDto createItem(ItemRequestDto itemRequestDto) {
        Item newItem = itemRepository.save(itemRequestDto.toEntity());
        return new ItemResponseDto(newItem);
    }

    public ItemResponseDto getItem(Long id) {
        Item item = itemRepository.findById(id).orElseThrow(() -> new RuntimeException("Item not found"));
        return new ItemResponseDto(item);
    }


    public List<ItemResponseDto> getItems() {
        List<Item> items = itemRepository.findAll();
        return ItemResponseDto.fromItems(items);
    }

    public ItemResponseDto updateItem(Long id, ItemRequestDto itemRequestDto) {
        Item item = itemRepository.findById(id).orElseThrow(() -> new RuntimeException("Item not found"));
        item.setName(itemRequestDto.getName());
        item.setDescription(itemRequestDto.getDescription());
        item.setPrice(itemRequestDto.getPrice());
        item.setImageUrl(itemRequestDto.getImageUrl());
        Item newItem = itemRepository.save(item);
        return new ItemResponseDto(newItem);
    }

    public void deleteItem(Long id) {
        itemRepository.deleteById(id);
    }
}
