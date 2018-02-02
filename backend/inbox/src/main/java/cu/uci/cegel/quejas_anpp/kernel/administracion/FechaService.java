package cu.uci.cegel.quejas_anpp.kernel.administracion;

import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class FechaService {

    public LocalDate obtenerFechaServidor() {
        return LocalDate.now();
    }
}
