package cu.uci.cegel.quejas_anpp.infrastructure.util;

import java.util.List;

public abstract class UtilToString {

    public static String toString(Long[] list) {
        String result = "";
        for (int i = 0; i < list.length; i++)
            if (i == 0) result += String.valueOf(list[i]);
            else result += (", ").concat(String.valueOf(list[i]));
        return result;
    }

    public static String toString(List<String> list) {
        String result = "";
        for (int i = 0; i < list.size(); i++)
            if (i == 0) result += String.valueOf(list.get(i));
            else result += (", ").concat(String.valueOf(list.get(i)));
        return result;
    }
}
