package cu.uci.cegel.quejas.util;

import cu.uci.cegel.quejas_anpp.infrastructure.util.UtilFecha;
import org.junit.Test;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import static org.assertj.core.api.Assertions.assertThat;

public class UtilFechaTest {

    @Test
    public void debeDevolverFechaValida() {
        assertThat(UtilFecha.isValid("2017-11-08T05:00:00.000Z", DateTimeFormatter.ISO_DATE_TIME)).isTrue();
    }

    @Test
    public void debeDevolverFechaInvalida() {
        assertThat(UtilFecha.isValid("X2017-11-08T05:00:00.000Z", DateTimeFormatter.ISO_DATE_TIME)).isFalse();
    }

    @Test
    public void debeDevolverFecha() {
        LocalDate localDate = UtilFecha.convertir("2018-01-10T05:00:00.000Z", DateTimeFormatter.ISO_DATE_TIME);
        System.out.println(localDate.toString());
        assertThat(localDate).isNotNull();
    }

}
