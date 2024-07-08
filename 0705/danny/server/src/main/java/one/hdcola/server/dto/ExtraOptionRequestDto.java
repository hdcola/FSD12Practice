package one.hdcola.server.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import one.hdcola.server.entity.ExtraOption;

@Data
@AllArgsConstructor
@Builder
public class ExtraOptionRequestDto {
    private Long id;
    private String name;
    private Float price;

    public ExtraOption toEntity() {
        return ExtraOption.builder()
                .id(id)
                .name(name)
                .price(price)
                .build();
    }
}
