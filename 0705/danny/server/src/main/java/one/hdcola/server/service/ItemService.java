package one.hdcola.server.service;

import one.hdcola.server.dto.ItemRequestDto;
import one.hdcola.server.dto.ItemResponseDto;
import one.hdcola.server.dto.OptionCategoryRequestDto;
import one.hdcola.server.entity.Item;
import one.hdcola.server.entity.OptionCategory;
import one.hdcola.server.repository.ItemRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {
    private final ItemRespository itemRespository;

    @Autowired
    public ItemService(ItemRespository itemRespository) {
        this.itemRespository = itemRespository;
    }

    public Item findById(Long itemId) {
        return itemRespository.findById(itemId).orElseThrow(() -> new RuntimeException("Item not found"));
    }


    public ItemResponseDto createItem(ItemRequestDto itemRequestDto) {
        Item item = new Item();
        item.setName(itemRequestDto.getName());
        item.setDescription(itemRequestDto.getDescription());
        item.setPrice(itemRequestDto.getPrice());
        item.setImageUrl(itemRequestDto.getImageUrl());
        if ( itemRequestDto.getOptionCategories() != null ) {
            List<OptionCategory> ocs = itemRequestDto.getOptionCategories().stream().map(oc -> {
                OptionCategory optionCategory = oc.toEntity();
//                optionCategory.setItem(item);
                return optionCategory;
            }).toList();
            item.setOptionCategories(ocs);
        }
        Item newItem = itemRespository.save(item);

        return new ItemResponseDto(newItem);
    }

    public ItemResponseDto getItem(Long id) {
        Item item = itemRespository.findById(id).orElseThrow(() -> new RuntimeException("Item not found"));
        return new ItemResponseDto(item);
    }


    public List<ItemResponseDto> getItems() {
        List<Item> items = itemRespository.findAll();
        return ItemResponseDto.fromItems(items);
    }

    public ItemResponseDto updateItem(Long id, ItemRequestDto itemRequestDto) {
        Item item = itemRespository.findById(id).orElseThrow(() -> new RuntimeException("Item not found"));
        item.setName(itemRequestDto.getName());
        item.setDescription(itemRequestDto.getDescription());
        item.setPrice(itemRequestDto.getPrice());
        item.setImageUrl(itemRequestDto.getImageUrl());
        Item newItem = itemRespository.save(item);
        return new ItemResponseDto(newItem);
    }

    public void deleteItem(Long id) {
        itemRespository.deleteById(id);
    }
}
