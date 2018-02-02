package cu.uci.cegel.quejas_anpp.web.personas.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class PersonaNaturalDTO {

    // comunes
    private String nombre;
    private String apellido;
    private Integer participacion;


}
