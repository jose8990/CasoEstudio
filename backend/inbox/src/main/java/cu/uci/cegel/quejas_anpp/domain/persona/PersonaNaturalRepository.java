package cu.uci.cegel.quejas_anpp.domain.persona;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface PersonaNaturalRepository extends JpaRepository<Persona, Long>, JpaSpecificationExecutor<Persona> {

}
