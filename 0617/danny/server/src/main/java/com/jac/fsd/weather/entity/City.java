package com.jac.fsd.weather.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "cities")
public class City {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Column(name = "display_name")
    private String displayName;
    private Double lat;
    private Double lon;
    @Column(name = "display_order")
    private Long displayOrder;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true)
    private User user;
}
