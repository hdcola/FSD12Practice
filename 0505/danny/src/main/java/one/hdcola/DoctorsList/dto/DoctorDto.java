package one.hdcola.DoctorsList.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DoctorDto {
    private int id;
    private String name;
    private LocalDate dateOfBirth;
    private String address;
    private String postalCode;
    private String city;
    private String province;
    private String country;
    private String phoneNumber;
    private String specialty;
}
