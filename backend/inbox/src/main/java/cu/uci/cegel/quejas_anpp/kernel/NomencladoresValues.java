package cu.uci.cegel.quejas_anpp.kernel;

import lombok.Getter;

@Getter
public enum NomencladoresValues {

    ESTADO_CERRADO("Cerrado"),
    ESTADO_ACTUALIZADO("Actualizado"),
    ESTADO_DISPUESTO("Dispuesto"),
    ESTADO_PENDIENTE_RESPUESTA("Pendiente Respuesta"),
    ESTADO_TRAMITADO("Tramitar"),
    ESTADO_TRASLADADO("Trasladar"),
    TIPO_RESPUESTA_TRAMITADO("Tramitado"),
    TIPO_RESPUESTA_TRASLADADO("Trasladado");

    String descipcion;

    NomencladoresValues(String descipcion) {
        this.descipcion = descipcion;
    }
}
