package one.hdcola.server.dto;

import lombok.Data;
import one.hdcola.server.entity.ExtraOption;

import java.util.List;

@Data
public class ExtraOptionResponseDto {
    private Long id;
    private String name;
    private Float price;

    public ExtraOptionResponseDto(ExtraOption extraOption) {
        this.id = extraOption.getId();
        this.name = extraOption.getName();
        this.price = extraOption.getPrice();
    }

    public static List<ExtraOptionResponseDto> fromExtraOptions(List<ExtraOption> extraOptions) {
        return extraOptions.stream().map(ExtraOptionResponseDto::new).toList();
    }
}
