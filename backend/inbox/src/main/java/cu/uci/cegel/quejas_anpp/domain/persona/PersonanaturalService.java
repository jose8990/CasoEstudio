package cu.uci.cegel.quejas_anpp.domain.persona;

import cu.uci.cegel.quejas_anpp.web.personas.dto.PersonaNaturalDTO;
import cu.uci.cegel.quejas_anpp.web.personas.dto.PersonaNaturalForm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PersonanaturalService {

    Persona registrarPersonaNatural(PersonaNaturalDTO personaNaturalDTO);

    Persona actualizarPersonaNatural(Long id, PersonaNaturalDTO personaNaturalDTO);

    Persona obtenerPersonaNatural(Long id);

    Page<Persona> listarPersonasNaturales(PersonaNaturalForm personaNaturalForm, Pageable pageable);

    List<Persona> obtenerPersonasNaturales();


}
