package one.hdcola.DoctorsList.maapper;

import one.hdcola.DoctorsList.dto.DoctorDto;
import one.hdcola.DoctorsList.enitty.Doctor;

public class DoctorMapper {
    public static DoctorDto mapToDto(Doctor doctor) {
        DoctorDto dto = new DoctorDto();
        dto.setId(doctor.getId());
        dto.setName(doctor.getName());
        dto.setDateOfBirth(doctor.getDateOfBirth());
        dto.setAddress(doctor.getAddress());
        dto.setPostalCode(doctor.getPostalCode());
        dto.setCity(doctor.getCity());
        dto.setProvince(doctor.getProvince());
        dto.setCountry(doctor.getCountry());
        dto.setPhoneNumber(doctor.getPhoneNumber());
        dto.setSpecialty(doctor.getSpecialty());
        return dto;
    }

    public static Doctor mapToEntity(DoctorDto dto) {
        Doctor doctor = new Doctor();
        doctor.setId(dto.getId());
        doctor.setName(dto.getName());
        doctor.setDateOfBirth(dto.getDateOfBirth());
        doctor.setAddress(dto.getAddress());
        doctor.setPostalCode(dto.getPostalCode());
        doctor.setCity(dto.getCity());
        doctor.setProvince(dto.getProvince());
        doctor.setCountry(dto.getCountry());
        doctor.setPhoneNumber(dto.getPhoneNumber());
        doctor.setSpecialty(dto.getSpecialty());
        return doctor;
    }
}
