package cu.uci.cegel.quejas_anpp.domain.persona;

import cu.uci.cegel.quejas_anpp.infrastructure.util.Fonetica;
import cu.uci.cegel.quejas_anpp.web.personas.dto.PersonaNaturalForm;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import javax.persistence.criteria.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class PersonaNaturalSpecs {

    public static Specification<Persona> listarPersonas(PersonaNaturalForm personaNaturalForm) {
        return (Root<Persona> root, CriteriaQuery<?> query, CriteriaBuilder builder) -> {

            List<Predicate> predicates = new ArrayList<>();
            if (personaNaturalForm.getNombre() != null && !personaNaturalForm.getNombre().isEmpty()) {
                predicates.add(builder.like(root.get("nombre"), "%" + personaNaturalForm.getNombre() + "%"));
            }
            if (personaNaturalForm.getApellido() != null && !personaNaturalForm.getApellido().isEmpty()) {
                predicates.add(builder.like(root.get("apellido"), "%" + personaNaturalForm.getApellido() + "%"));
            }
            if (personaNaturalForm.getParticipacion() != null) {
                predicates.add(builder.equal(root.get("participacion"), personaNaturalForm.getParticipacion()));
            }

            Optional<Predicate> finalPredicate = predicates.stream().reduce(builder::and);
            return finalPredicate.orElse(null);
        };
    }
}
