package cu.uci.cegel.quejas_anpp.domain.persona;

//import cu.uci.cegel.quejas_anpp.domain.nomenclador.Nomencladorbase;
import cu.uci.cegel.quejas_anpp.domain.persona.vauleObject.CorreoElectronico;
import cu.uci.cegel.quejas_anpp.domain.persona.vauleObject.DireccionPostal;
import cu.uci.cegel.quejas_anpp.domain.persona.vauleObject.Telefono;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;

/**
 * @author cegel
 */
@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
//@DiscriminatorColumn(name = "discriminante")
//@DiscriminatorValue("dpersona")
@Table(name = "dpersona")
@XmlRootElement
public class Persona implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "dpersona_seq")
    @SequenceGenerator(name = "dpersona_seq", sequenceName = "dpersona_id_seq", initialValue = 1, allocationSize = 1)
    @Basic(optional = false)
    @Column(name = "id")
    protected Long id;
    @Basic(optional = false)
    @Column(name = "nombre")
    private String nombre;
    @Column(name = "apellido")
    private String apellido;
    @Column(name = "participacion")
    private Integer participacion;


    @Builder
    public Persona(String nombre, String apellido, Integer participacion) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.participacion = participacion;
    }

    public Persona reassemble(String nombre, String apellido, Integer participacion){
        this.nombre = nombre;
        this.apellido = apellido;
        this.participacion = participacion;

        return this;
    }

}
