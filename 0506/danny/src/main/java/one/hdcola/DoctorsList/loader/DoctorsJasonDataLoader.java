package one.hdcola.DoctorsList.loader;

import java.io.IOException;
import java.io.InputStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.AllArgsConstructor;
import one.hdcola.DoctorsList.dto.Doctors;
import one.hdcola.DoctorsList.maapper.DoctorMapper;
import one.hdcola.DoctorsList.respository.DoctorRespository;

@Component
@AllArgsConstructor
public class DoctorsJasonDataLoader implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DoctorsJasonDataLoader.class);
    private final DoctorRespository doctorRepository;
    private final ObjectMapper objectMapper;

    @Override
    public void run(String... args) throws Exception {
        if (doctorRepository.count() == 0) {
            logger.info("Loading data from JSON file");
            try (InputStream in = TypeReference.class.getResourceAsStream("/data/doctors.json")) {
                var doctors = objectMapper.readValue(in, Doctors.class);
                logger.info("Loaded {} doctors from JSON file", doctors.doctors().size());
                doctors.doctors().forEach(doctor -> doctorRepository.save(DoctorMapper.mapToEntity(doctor)));
            } catch (IOException e) {
                throw new RuntimeException("Failed to read JSON file", e);
            }
        } else {
            logger.info("Data already loaded, skipping JSON file load.");
        }
    }

}
