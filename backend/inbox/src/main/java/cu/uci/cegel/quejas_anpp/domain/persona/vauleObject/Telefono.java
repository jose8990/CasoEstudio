package cu.uci.cegel.quejas_anpp.domain.persona.vauleObject;

import lombok.Builder;
import lombok.Value;
import org.springframework.util.Assert;

import javax.persistence.Embeddable;

@Value
@Builder
@Embeddable
public class Telefono {

    private String telefono;

    public Telefono() {
        telefono = "";
    }

    public Telefono(String telefono) {
        Assert.notNull(telefono, "debe proveer un teléfono");
        //Assert.isTrue(Pattern.matches("^\\d{3}-\\d{8}$", license), String.format("Bad format for license number [000-00000000] having: %s", license));
        this.telefono = telefono;
    }
}
