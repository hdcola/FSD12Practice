package one.hdcola.DoctorsList.controller;

import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import lombok.AllArgsConstructor;
import one.hdcola.DoctorsList.dto.DoctorDto;
import one.hdcola.DoctorsList.service.DoctorService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

@AllArgsConstructor
@RestController
@RequestMapping("/api/doctors")
public class DoctorController {
    private DoctorService doctorService;

    // create
    @PostMapping("")
    public ResponseEntity<DoctorDto> createDoctor(@RequestBody DoctorDto doctorDto) {
        DoctorDto createdDoctor = doctorService.createDoctor(doctorDto);
        return ResponseEntity.ok(createdDoctor);
    }

    // get by id
    @GetMapping("{id}")
    public ResponseEntity<DoctorDto> getDoctorById(@PathVariable Integer id) {
        DoctorDto doctor = doctorService.getDoctorById(id);
        return ResponseEntity.ok(doctor);
    }

    // get all
    @GetMapping("")
    public ResponseEntity<List<DoctorDto>> getAllDoctors() {
        List<DoctorDto> doctors = doctorService.getAllDoctors();
        return ResponseEntity.ok(doctors);
    }

    // update
    @PutMapping("{id}")
    public ResponseEntity<DoctorDto> updateDoctor(@PathVariable Integer id, @RequestBody DoctorDto doctorDto) {
        DoctorDto updatedDoctor = doctorService.updateDoctor(id, doctorDto);
        return ResponseEntity.ok(updatedDoctor);
    }

    // delete
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteDoctor(@PathVariable Integer id) {
        doctorService.deleteDoctor(id);
        return ResponseEntity.ok("Doctor deleted successfully.");
    }
}
