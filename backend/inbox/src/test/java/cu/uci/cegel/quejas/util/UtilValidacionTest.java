package cu.uci.cegel.quejas.util;

import cu.uci.cegel.quejas_anpp.infrastructure.util.UtilValidacion;
import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class UtilValidacionTest {

    @Test
    public void testUtilvalidation1() {
        assertThat(UtilValidacion.isAValidIdentification(1l)).isTrue();
    }

    @Test
    public void testUtilvalidation2() {
        assertThat(UtilValidacion.isAValidIdentification(0L)).isFalse();
    }

    @Test
    public void testUtilvalidation3() {
        assertThat(UtilValidacion.isAValidIdentification(-1l)).isFalse();
    }

    @Test
    public void testUtilvalidation4() {
        assertThat(UtilValidacion.isAValidIdentification(null)).isFalse();
    }

}
