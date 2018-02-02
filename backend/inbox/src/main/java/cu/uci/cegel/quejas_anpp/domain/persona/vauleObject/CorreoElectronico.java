package cu.uci.cegel.quejas_anpp.domain.persona.vauleObject;

import lombok.Builder;
import lombok.Value;
import org.springframework.util.Assert;

import javax.persistence.Embeddable;
import java.util.regex.Pattern;

@Value
@Builder
@Embeddable
public class CorreoElectronico {

    private String correoelectronico;

    public CorreoElectronico() {
        correoelectronico = "";
    }

    public CorreoElectronico(String correoelectronico) {
        Assert.notNull(correoelectronico, "debe proveer un correo electrónico");
        Assert.isTrue(Pattern.matches("\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*", correoelectronico), "el formato del correo es incorrecto");
        this.correoelectronico = correoelectronico;
    }

}
