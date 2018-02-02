package cu.uci.cegel.quejas_anpp.infrastructure.personas;

import cu.uci.cegel.quejas_anpp.domain.persona.*;
import cu.uci.cegel.quejas_anpp.infrastructure.util.Fonetica;
import cu.uci.cegel.quejas_anpp.web.personas.dto.PersonaNaturalDTO;
import cu.uci.cegel.quejas_anpp.web.personas.dto.PersonaNaturalForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

import static cu.uci.cegel.quejas_anpp.domain.persona.PersonaNaturalSpecs.listarPersonas;

@Service
public class PersonanaturalServiceImpl implements PersonanaturalService {

    @Autowired
    private PersonaNaturalRepository personaNaturalRepository;
    @Autowired
    private PersonaRepository personaRepository;
    @Autowired
    private PersonaNaturalFactory personaNaturalFactory;

    @Override
    public Persona registrarPersonaNatural(PersonaNaturalDTO personaNaturalDTO) {
        Persona personanatural = personaNaturalFactory.crearFrom(personaNaturalDTO);
        Persona save = personaRepository.save(personanatural);
        return obtenerPersonaNatural(save.getId());
    }

    @Override
    public Persona actualizarPersonaNatural(Long id, PersonaNaturalDTO personaNaturalDTO) {
        Persona save = personaNaturalRepository.save(personaNaturalFactory.updateFrom(personaNaturalDTO, obtenerPersonaNatural(id)));
        return save;
    }

    @Override
    public Persona obtenerPersonaNatural(Long id) {
        return personaNaturalRepository.findOne(id);
    }

    @Override
    public Page<Persona> listarPersonasNaturales(PersonaNaturalForm personaNaturalForm, Pageable pageable) {
        return personaNaturalRepository.findAll(listarPersonas(personaNaturalForm), pageable);
    }

    @Override
    public List<Persona> obtenerPersonasNaturales() {
        return personaNaturalRepository.findAll();
    }



}
