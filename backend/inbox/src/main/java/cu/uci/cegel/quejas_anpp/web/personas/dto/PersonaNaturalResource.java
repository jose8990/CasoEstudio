package cu.uci.cegel.quejas_anpp.web.personas.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.hateoas.ResourceSupport;

import javax.xml.bind.annotation.XmlRootElement;

@Data
@EqualsAndHashCode(callSuper = true)
@XmlRootElement(name = "personaNatural")
public class PersonaNaturalResource extends ResourceSupport {

    private Long idpersonanatural;
    private String nombre;
    private String apellido;
    private Integer participacion;

}
