package cu.uci.cegel.quejas_anpp.web.personas.dto;


import cu.uci.cegel.quejas_anpp.domain.persona.Persona;
import cu.uci.cegel.quejas_anpp.infrastructure.util.UtilFecha;
import cu.uci.cegel.quejas_anpp.web.personas.PersonaNaturalController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.mvc.ResourceAssemblerSupport;
import org.springframework.stereotype.Component;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

@Component
public class PersonaNaturalResourceAssembler extends ResourceAssemblerSupport<Persona, PersonaNaturalResource> {

    public PersonaNaturalResourceAssembler() {
        super(PersonaNaturalController.class, PersonaNaturalResource.class);
    }

    @Override
    public PersonaNaturalResource toResource(Persona personanatural) {
        PersonaNaturalResource resource = new PersonaNaturalResource();
        Link selfLink = linkTo(methodOn(PersonaNaturalController.class).obtenerPersonaNatural(personanatural.getId())).withSelfRel();
        resource.add(selfLink);
        resource.setIdpersonanatural(personanatural.getId());
        resource.setNombre(personanatural.getNombre());
        resource.setApellido(personanatural.getApellido());
        resource.setParticipacion(personanatural.getParticipacion());

        return resource;
    }

    public List<PersonaNaturalResource> toResources(List<Persona> daccionmedidas) {
        return daccionmedidas.stream().map(this::toResource).collect(Collectors.toList());
    }


}
