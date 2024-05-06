package one.hdcola.DoctorsList.service;

import java.util.List;

import one.hdcola.DoctorsList.dto.DoctorDto;

public interface DoctorService {
    DoctorDto createDoctor(DoctorDto doctorDto);

    DoctorDto getDoctorById(Integer id);

    List<DoctorDto> getAllDoctors();

    DoctorDto updateDoctor(Integer id, DoctorDto doctorDto);
}
