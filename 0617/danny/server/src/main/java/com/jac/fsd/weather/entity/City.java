package com.jac.fsd.weather.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;

@Entity
@Data
@Table(name = "cities")
public class City {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE , generator = "city_seq")
    @SequenceGenerator(name = "city_seq" , sequenceName = "cities_seq" , allocationSize = 1)
    private Long id;
    private String name;
    private String displayName;
    private Double lat;
    private Double lon;
    private Long displayOrder;
}
