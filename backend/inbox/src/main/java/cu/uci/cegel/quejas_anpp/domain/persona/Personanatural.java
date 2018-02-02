/*package cu.uci.cegel.quejas_anpp.domain.persona;

import cu.uci.cegel.quejas_anpp.domain.nomenclador.Nomencladorbase;
import cu.uci.cegel.quejas_anpp.domain.persona.vauleObject.CorreoElectronico;
import cu.uci.cegel.quejas_anpp.domain.persona.vauleObject.DireccionPostal;
import cu.uci.cegel.quejas_anpp.domain.persona.vauleObject.Telefono;
import lombok.*;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * @author cegel
 */
/*@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@DiscriminatorValue("dpersonanatural")
@Table(name = "dpersonanatural")
@XmlRootElement
public class Personanatural extends Persona implements Serializable {

    @Basic(optional = false)
    @Column(name = "primernombre")
    private String primernombre;
    @Column(name = "segundonombre")
    private String segundonombre;
    @Basic(optional = false)
    @Column(name = "primerapellido")
    private String primerapellido;
    @Column(name = "segundoapellido")
    private String segundoapellido;
    @Column(name = "numeroidentidad")
    private String numeroidentidad;
    @OneToMany(mappedBy = "idpersonanatural", fetch = FetchType.EAGER)
    private Set<Personanaturalfonetica> personanaturalfonetica;
    @JoinColumn(name = "idnraza", referencedColumnName = "id", foreignKey = @ForeignKey(name = "fk_idnraza_dpersonanatural"))
    @ManyToOne
    @Setter
    private Nomencladorbase raza;
    @JoinColumn(name = "idnsexo", referencedColumnName = "id", foreignKey = @ForeignKey(name = "fk_idnsexo_dpersonanatural"))
    @ManyToOne
    @Setter
    private Nomencladorbase sexo;
    /*@JoinColumn(name = "idnestadocivil", referencedColumnName = "id", foreignKey = @ForeignKey(name = "fk_idnestadocivil_dpersonanatural"))
    @ManyToOne
    @Setter
    private Nomencladorbase estadocivil;*/

/*

    public String getNombreCompleto() {
        return primernombre + (segundonombre != null ? " " + segundonombre : "")
                + " " + primerapellido + (segundoapellido != null ? " " + segundoapellido : "");

    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof Personanatural)) {
            return false;
        }
        Personanatural other = (Personanatural) object;
        return (this.id != null || other.id == null) && (this.id == null || this.id.equals(other.id));
    }

    @Override
    public String toString() {
        return "cu.uci.cegel.quejas_anpp.domain.persona.Personanatural[ id=" + primernombre + " " + primerapellido + " ]";
    }

    public Personanatural reassemble(String primernombre, String segundonombre, String primerapellido, String segundoapellido, String numeroidentidad) {
        this.primernombre = primernombre;
        this.segundonombre = segundonombre;
        this.primerapellido = primerapellido;
        this.segundoapellido = segundoapellido;
        this.numeroidentidad = numeroidentidad;
        return this;
    }
}
*/