package one.hdcola.server.repository;

import one.hdcola.server.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRespository extends JpaRepository<Item, Long>{
}
