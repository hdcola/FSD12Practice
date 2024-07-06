package one.hdcola.server.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "option_category")
public class OptionCategory {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private Integer maxSelection;
    private Integer minSelection;
    private Boolean required;
    private Boolean multiple;
    private Boolean allowCustom;
    private Boolean allowQuantity;
    @ManyToOne
    @JoinColumn(name = "item_id",nullable = false)
    private Item item;
}
