/*package cu.uci.cegel.quejas_anpp.domain.persona;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;

/**
 * @author cegel
 */
/*@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "dpersonanaturalfonetica")
@XmlRootElement
public class Personanaturalfonetica implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "dpersonanaturalfonetica_seq")
    @SequenceGenerator(name = "dpersonanaturalfonetica_seq", sequenceName = "dpersonanaturalfonetica_id_seq", initialValue = 1, allocationSize = 1)
    @Basic(optional = false)
    @Column(name = "id")
    private Long id;
    @Basic(optional = false)
    @Column(name = "foneticaprimernombre")
    private String foneticaPrimerNombre;
    @Column(name = "foneticasegundonombre")
    private String foneticaSegundoNombre;
    @Basic(optional = false)
    @Column(name = "foneticaprimerapellido")
    private String foneticaPrimerApellido;
    @Column(name = "foneticasegundoapellido")
    private String foneticaSegundoApellido;
    @JoinColumn(name = "idpersonanatural", referencedColumnName = "id")
    @ManyToOne
    private Personanatural idpersonanatural;

    public Personanaturalfonetica reassemble(String primernombre, String segundonombre, String primerapellido, String segundoapellido) {
        this.foneticaPrimerNombre = primernombre;
        this.foneticaSegundoNombre = segundonombre;
        this.foneticaPrimerApellido = primerapellido;
        this.foneticaSegundoApellido = segundoapellido;
        return this;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof Personanaturalfonetica)) {
            return false;
        }
        Personanaturalfonetica other = (Personanaturalfonetica) object;
        return (this.id != null || other.id == null) && (this.id == null || this.id.equals(other.id));
    }

    @Override
    public String toString() {
        return "Personanaturalfonetica[ id=" + id + " ]";
    }


}
*/