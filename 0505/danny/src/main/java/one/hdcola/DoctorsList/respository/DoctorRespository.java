package one.hdcola.DoctorsList.respository;

import org.springframework.data.jpa.repository.JpaRepository;

import one.hdcola.DoctorsList.enitty.Doctor;

public interface DoctorRespository extends JpaRepository<Doctor, Integer> {
}
