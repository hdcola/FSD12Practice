package one.hdcola.server.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import one.hdcola.server.entity.OptionCategory;

import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@Builder
public class OptionCategoryResponseDto {
    private Long id;
    private String name;
    @JsonProperty("max_selection")
    private Integer maxSelection;
    @JsonProperty("min_selection")
    private Integer minSelection;
    private Boolean required;
    private Boolean multiple;
    @JsonProperty("allow_custom")
    private Boolean allowCustom;
    @JsonProperty("allow_quantity")
    private Boolean allowQuantity;
    @JsonProperty("item_id")
    private Long itemId;

    public OptionCategoryResponseDto(OptionCategory optionCategory){
        this.id = optionCategory.getId();
        this.name = optionCategory.getName();
        this.maxSelection = optionCategory.getMaxSelection();
        this.minSelection = optionCategory.getMinSelection();
        this.required = optionCategory.getRequired();
        this.multiple = optionCategory.getMultiple();
        this.allowCustom = optionCategory.getAllowCustom();
        this.allowQuantity = optionCategory.getAllowQuantity();
        this.itemId = optionCategory.getItem().getId();
    }

    public static List<OptionCategoryResponseDto> fromOptionCategories(Set<OptionCategory> optionCategories) {
        return optionCategories.stream().map(OptionCategoryResponseDto::new).toList();
    }
}
