package one.hdcola.server.entity;

import jakarta.persistence.*;
import lombok.Data;

import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name = "item")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;
    private String description;
    private Float price;
    private String imageUrl;
    private Boolean available;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<OptionCategory> optionCategories=new ArrayList<>();
}
