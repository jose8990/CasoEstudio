package cu.uci.cegel.quejas_anpp.web.personas;

import cu.uci.cegel.quejas_anpp.domain.persona.Persona;
import cu.uci.cegel.quejas_anpp.domain.persona.PersonaNaturalFactory;
import cu.uci.cegel.quejas_anpp.domain.persona.PersonanaturalService;
import cu.uci.cegel.quejas_anpp.infrastructure.util.HeaderUtil;
import cu.uci.cegel.quejas_anpp.infrastructure.util.UtilValidacion;
import cu.uci.cegel.quejas_anpp.web.personas.dto.PersonaNaturalDTO;
import cu.uci.cegel.quejas_anpp.web.personas.dto.PersonaNaturalForm;
import cu.uci.cegel.quejas_anpp.web.personas.dto.PersonaNaturalResource;
import cu.uci.cegel.quejas_anpp.web.personas.dto.PersonaNaturalResourceAssembler;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedResources;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/v1.0", produces = "application/json")
public class PersonaNaturalController {

    private final @NonNull
    PersonanaturalService personanaturalService;
    private final @NonNull
    PersonaNaturalResourceAssembler personaNaturalResourceAssembler;
    private final @NonNull
    PersonaNaturalFactory personaNaturalFactory;
    private final
    @NonNull
    PagedResourcesAssembler pagedResourcesAssembler;

    protected static final String ENTITY_API = "/api/v1.0";
    private static final String ENTITY_URI = "/personanatural";
    private static final String ENTITY_NAME = "promovente";


    /**
     * Obtener persona natural por id.
     *
     * @param id
     * @return
     */
    @RequestMapping(value = ENTITY_URI + "/{id}", method = RequestMethod.GET)
    public ResponseEntity<PersonaNaturalResource> obtenerPersonaNatural(@PathVariable Long id) {
        try {
            if (!UtilValidacion.isAValidIdentification(id)) {
                return ResponseEntity.badRequest()
                        .headers(HeaderUtil.badRequestrAlert("El " + ENTITY_NAME + " no puede tener un id con valor " + id)).build();
            }
            Persona personaNatural = personanaturalService.obtenerPersonaNatural(id);
            if (personaNatural == null) {
                return ResponseEntity.ok()
                        .headers(HeaderUtil.errorAlert("El " + ENTITY_NAME + " con identificador " + id + " no se encuentra en el servidor")).build();
            }
            return ResponseEntity.ok()
                    .body(personaNaturalResourceAssembler.toResource(personaNatural));
        } catch (Exception ex) {
            return ResponseEntity.badRequest()
                    .headers(HeaderUtil.badRequestrAlert("El " + ENTITY_NAME + " no se puede obtener: " + ex.getMessage())).build();
        }
    }


    /**
     * Registrar persona natural.
     *
     * @param personaNaturalDTO
     * @return
     */
    @RequestMapping(path = ENTITY_URI, method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity<PersonaNaturalResource> registrarPersonaNatural(@RequestBody PersonaNaturalDTO personaNaturalDTO) throws URISyntaxException {
        try {
            Persona personaNatural = personanaturalService.registrarPersonaNatural(personaNaturalDTO);
            return ResponseEntity.created(new URI(ENTITY_API + ENTITY_URI + "/" + personaNatural.getId()))
                    .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, personaNatural.getId().toString()))
                    .body(personaNaturalResourceAssembler.toResource(personaNatural));
        } catch (Exception ex) {
            return ResponseEntity.badRequest()
                    .headers(HeaderUtil.badRequestrAlert("El " + ENTITY_NAME + " no se puede registrar: " + ex.getMessage())).build();
        }
    }

    /**
     * Actualizar persona natural por id.
     *
     * @param id
     * @param personaNaturalDTO
     * @return
     */
    @RequestMapping(path = ENTITY_URI + "/{id}", method = RequestMethod.PUT, consumes = "application/json")
    public ResponseEntity<PersonaNaturalResource> actualizarPersonaNatural(@PathVariable Long id, @RequestBody PersonaNaturalDTO personaNaturalDTO) throws URISyntaxException {
        try {
            if (!UtilValidacion.isAValidIdentification(id)) {
                return ResponseEntity.badRequest()
                        .headers(HeaderUtil.badRequestrAlert("El " + ENTITY_NAME + " no puede tener un id con valor " + id)).build();
            }
            Persona personanatural = personanaturalService.actualizarPersonaNatural(id, personaNaturalDTO);
            return ResponseEntity.ok()
                    .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, personanatural.getId().toString()))
                    .body(personaNaturalResourceAssembler.toResource(personanatural));
        } catch (Exception ex) {
            return ResponseEntity.badRequest()
                    .headers(HeaderUtil.badRequestrAlert("El " + ENTITY_NAME + " no se puede actualizar" + ex.getMessage())).build();
        }
    }

    /**
     * Listar personas naturales. Filtra y pagina las personas naturales en el servidor.
     *
     * @param pageable
     * @param personaNaturalForm
     * @return
     */
    @RequestMapping(path = ENTITY_URI + "/list", method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity<PagedResources<Persona>> listarPersonasNaturales(Pageable pageable, @RequestBody PersonaNaturalForm personaNaturalForm) {
        try {
            Page<Persona> personanaturalPage = personanaturalService.listarPersonasNaturales(personaNaturalForm, pageable);
            return ResponseEntity.ok().body(pagedResourcesAssembler.toResource(personanaturalPage, personaNaturalResourceAssembler));
        } catch (Exception ex) {
            return ResponseEntity.badRequest()
                    .headers(HeaderUtil.badRequestrAlert("Error obteniendo los " + ENTITY_NAME + "s en el servidor")).build();
        }
    }


    @RequestMapping(path = ENTITY_URI + "/todas", method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity<List<PersonaNaturalResource>> obtenerTodasPersonas() {
        try {
            return ResponseEntity.ok()
                    //.headers(HeaderUtil.infoAlert("Obteniendo los tipos de nomencladores"))
                    .body(personaNaturalResourceAssembler.toResources(personanaturalService.obtenerPersonasNaturales()));
        } catch (Exception ex) {
            return ResponseEntity.badRequest()
                    .headers(HeaderUtil.badRequestrAlert("Error obteniendo los Tipos de nomencladores en el servidor")).build();
        }
    }


}
