package one.hdcola.server.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class OptionCategoryRequestDto {
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
}
