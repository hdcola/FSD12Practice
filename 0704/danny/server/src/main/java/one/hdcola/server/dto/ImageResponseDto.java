package one.hdcola.server.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import one.hdcola.server.entity.Image;

@Data
@AllArgsConstructor
@Builder
public class ImageResponseDto {
    private Long id;
    @JsonProperty("image_type")
    private String imageType;
    @JsonProperty("image_file_name")
    private String imageFileName;
    @JsonProperty("image_url")
    private String imageUrl;

    public ImageResponseDto(Image image){
        this.id = image.getId();
        this.imageType = image.getImageType();
        this.imageFileName = image.getImageFileName();
        this.imageUrl = "/api/image/" + image.getId();
    }
}
