package cu.uci.cegel.quejas.util;

import cu.uci.cegel.quejas_anpp.infrastructure.util.UtilToString;
import org.junit.Test;

public class UtilToStringTest {

    @Test
    public void debeDevolverStringValido() {
        Long[] list = new Long[5];
        list[0] = 1L;
        list[1] = 2L;
        list[2] = 3L;
        list[3] = 4L;
        list[4] = 5L;
        String result = UtilToString.toString(list);
        System.out.println(result);
    }
}
