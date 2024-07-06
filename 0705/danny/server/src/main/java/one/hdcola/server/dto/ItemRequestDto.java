package one.hdcola.server.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

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
    private List<OptionCategoryRequestDto> optionCategories;
}
