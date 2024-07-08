package one.hdcola.server.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.extern.log4j.Log4j2;
import one.hdcola.server.entity.Item;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@Builder
@Log4j2
public class ItemResponseDto {
    private Long id;
    private String name;
    private String description;
    private Float price;
    @JsonProperty("image_url")
    private String imageUrl;
    private List<OptionCategoryResponseDto> optionCategories;

    public ItemResponseDto(Item item) {
        this.id = item.getId();
        this.name = item.getName();
        this.description = item.getDescription();
        this.price = item.getPrice();
        this.imageUrl = item.getImageUrl();
        if(item.getOptionCategories() != null) {
            this.optionCategories = OptionCategoryResponseDto.fromOptionCategories(item.getOptionCategories());
        }else {
            this.optionCategories = new ArrayList<>();
        }
    }

    public static List<ItemResponseDto> fromItems(List<Item> items) {
        return items.stream().map(ItemResponseDto::new).toList();
    }
}
