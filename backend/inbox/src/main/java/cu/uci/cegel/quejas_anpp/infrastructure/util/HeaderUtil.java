package cu.uci.cegel.quejas_anpp.infrastructure.util;

import lombok.NoArgsConstructor;
import org.springframework.http.HttpHeaders;

/**
 * Utility class for HTTP headers creation.
 */

@NoArgsConstructor
public final class HeaderUtil {

    private static String SUCCESS_HEADER = "X-sigquoApp-success";
    private static String INFO_HEADER = "X-sigquoApp-info";
    private static String ERROR_HEADER = "X-sigquoApp-error";
    private static String BAD_REQUEST_HEADER = "X-sigquoApp-badrequest";

    public static HttpHeaders entityActionAlert(String actionMessage) {
        return createHeaders(SUCCESS_HEADER, actionMessage);
    }

    public static HttpHeaders createEntityCreationAlert(String entityName, String identificador) {
        return createHeaders(SUCCESS_HEADER, "Se ha creado un(a) " + entityName + " con identificador " + identificador);
    }

    public static HttpHeaders createEntityUpdateAlert(String entityName, String identificador) {
        return createHeaders(SUCCESS_HEADER, "Se ha actualizado un(a) " + entityName + " con identificador " + identificador);
    }

    public static HttpHeaders createEntityDeleteAlert(String entityName, String identificador) {
        return createHeaders(SUCCESS_HEADER, "Se ha eliminado un(a) " + entityName + " con identificador " + identificador);
    }

    public static HttpHeaders infoAlert(String mensaje) {
        return createHeaders(INFO_HEADER, mensaje);
    }

    public static HttpHeaders errorAlert(String mensaje) {
        return createHeaders(ERROR_HEADER, mensaje);
    }

    public static HttpHeaders badRequestrAlert(String mensaje) {
        return createHeaders(BAD_REQUEST_HEADER, mensaje);
    }

    private static HttpHeaders createHeaders(String header, String message) {
        HttpHeaders headers = new HttpHeaders();
        headers.add(header, message);
        return headers;
    }

}
