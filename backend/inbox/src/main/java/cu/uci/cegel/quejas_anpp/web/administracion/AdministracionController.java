package cu.uci.cegel.quejas_anpp.web.administracion;

import cu.uci.cegel.quejas_anpp.kernel.administracion.FechaService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = AdministracionController.ENTITY_API, produces = "application/json")
public class AdministracionController {

    private final
    @NonNull
    FechaService fechaService;

    protected static final String ENTITY_API = "/api/v1.0";
    private static final String URI = "/administracion";

    @RequestMapping(path = URI + "/fechaactual", method = RequestMethod.GET)
    public ResponseEntity<LocalDate> obtenerFechaActual() {
        return ResponseEntity.ok()
                .body(fechaService.obtenerFechaServidor());
    }

}
