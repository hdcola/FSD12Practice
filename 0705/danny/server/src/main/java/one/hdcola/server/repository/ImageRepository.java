package one.hdcola.server.repository;

import one.hdcola.server.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long>{
}
