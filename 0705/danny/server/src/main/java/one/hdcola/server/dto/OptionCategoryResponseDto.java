package one.hdcola.server.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import one.hdcola.server.entity.OptionCategory;

import java.util.ArrayList;
import java.util.List;

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
    @JsonProperty("extra_options")
    private List<ExtraOptionResponseDto> extraOptions;

    public OptionCategoryResponseDto(OptionCategory optionCategory){
        this.id = optionCategory.getId();
        this.name = optionCategory.getName();
        this.maxSelection = optionCategory.getMaxSelection();
        this.minSelection = optionCategory.getMinSelection();
        this.required = optionCategory.getRequired();
        this.multiple = optionCategory.getMultiple();
        this.allowCustom = optionCategory.getAllowCustom();
        this.allowQuantity = optionCategory.getAllowQuantity();
        if(optionCategory.getExtraOptions() != null) {
            this.extraOptions = ExtraOptionResponseDto.fromExtraOptions(optionCategory.getExtraOptions());
        }else {
            this.extraOptions = new ArrayList<>();
        }
    }

    public static List<OptionCategoryResponseDto> fromOptionCategories(List<OptionCategory> optionCategories) {
        return optionCategories.stream().map(OptionCategoryResponseDto::new).toList();
    }
}
