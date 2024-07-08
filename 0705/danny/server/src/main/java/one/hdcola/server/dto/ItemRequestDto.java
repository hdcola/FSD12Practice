package one.hdcola.server.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import one.hdcola.server.entity.Item;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@Builder
public class ItemRequestDto {
    private Long id;
    private String name;
    private String description;
    private Float price;
    @JsonProperty("image_url")
    private String imageUrl;
    @JsonProperty("option_categories")
    private List<OptionCategoryRequestDto> optionCategories;

    public Item toEntity() {
        return Item.builder()
                .id(id)
                .name(name)
                .description(description)
                .price(price)
                .imageUrl(imageUrl)
                .optionCategories(
                        optionCategories == null ? new ArrayList<>() :  optionCategories.stream().map(OptionCategoryRequestDto::toEntity).toList())
                .build();
    }

    public Item toNewEntity() {
        return Item.builder()
                .id(id)
                .name(name)
                .description(description)
                .price(price)
                .imageUrl(imageUrl)
                .optionCategories(
                        optionCategories == null ? new ArrayList<>() :  optionCategories.stream().map(OptionCategoryRequestDto::toNewEntity).toList())
                .build();
    }
}
