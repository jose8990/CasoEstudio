package cu.uci.cegel.quejas_anpp.infrastructure.personas;

import cu.uci.cegel.quejas_anpp.domain.persona.Persona;
import cu.uci.cegel.quejas_anpp.domain.persona.PersonaRepository;
import cu.uci.cegel.quejas_anpp.domain.persona.PersonaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PersonaServiceImpl implements PersonaService {

    @Autowired
    private PersonaRepository personaRepository;

    @Override
    public Persona obtenerPromovente(Long id) {
        return personaRepository.findOne(id);
    }
}
