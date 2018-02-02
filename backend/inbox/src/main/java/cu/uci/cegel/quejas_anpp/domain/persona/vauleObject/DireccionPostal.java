package cu.uci.cegel.quejas_anpp.domain.persona.vauleObject;

import lombok.Builder;
import lombok.Value;

import javax.persistence.Embeddable;

@Value
@Builder
@Embeddable
public class DireccionPostal {

    private String direccion;
    private Long idprovincia;
    private Long idmunicipio;

    public DireccionPostal() {
        direccion = "";
        idprovincia = -1L;
        idmunicipio = -1L;
    }

    public DireccionPostal(String direccion, Long idprovincia, Long idmunicipio) {
        this.direccion = direccion;
        this.idprovincia = idprovincia;
        this.idmunicipio = idmunicipio;
    }

}
