package one.hdcola.server.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@Builder
public class ItemRequestDto {
    private Long id;
    private String name;
    private String description;
    private Float price;
}
