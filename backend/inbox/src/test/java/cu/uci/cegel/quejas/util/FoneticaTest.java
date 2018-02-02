package cu.uci.cegel.quejas.util;

import cu.uci.cegel.quejas_anpp.infrastructure.util.Fonetica;
import org.junit.Test;

public class FoneticaTest {

    @Test
    public void prueba() {
        Fonetica fonetica = new Fonetica();
//        System.out.println(fonetica.encode("abll"));
        for (int i = 0; i < 5000000; i++) {
            fonetica.encode("HurrutiaGomez").equals(fonetica.encode("HurrutiaGomez"));
        }
    }

}
