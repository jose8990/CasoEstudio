package cu.uci.cegel.quejas_anpp.domain.persona;

import cu.uci.cegel.quejas_anpp.domain.persona.vauleObject.CorreoElectronico;
import cu.uci.cegel.quejas_anpp.domain.persona.vauleObject.DireccionPostal;
import cu.uci.cegel.quejas_anpp.domain.persona.vauleObject.Telefono;
import cu.uci.cegel.quejas_anpp.web.personas.dto.PersonaNaturalDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PersonaNaturalFactory {

    public Persona crearFrom(PersonaNaturalDTO personaNaturalDTO) {
        return Persona.builder()
                .nombre(personaNaturalDTO.getNombre())
                .apellido(personaNaturalDTO.getApellido())
                .participacion(personaNaturalDTO.getParticipacion())
                .build();
    }




    public Persona updateFrom(PersonaNaturalDTO personaNaturalDTO, Persona personanatural) {
        personanatural.setApellido(personaNaturalDTO.getApellido());
        personanatural.setNombre(personaNaturalDTO.getNombre());
        personanatural.setParticipacion(personaNaturalDTO.getParticipacion());


        return personanatural.reassemble(
                personaNaturalDTO.getNombre(),
                personaNaturalDTO.getApellido(),
                personaNaturalDTO.getParticipacion()
        );
    }
}
