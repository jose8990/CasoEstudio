package cu.uci.cegel.quejas_anpp.infrastructure.util;

public class Fonetica {

    public static String encode(String value) {
        return aplicarReglas(eliminarHMuda(eliminarTildes(value.toUpperCase())));
    }

    private static String eliminarTildes(String str) {
        String tmp = str;
        tmp = tmp.replace('Á', 'A');
        tmp = tmp.replace('É', 'E');
        tmp = tmp.replace('Í', 'I');
        tmp = tmp.replace('Ó', 'O');
        tmp = tmp.replace('Ú', 'U');
        tmp = tmp.replace('Ä', 'A');
        tmp = tmp.replace('Ë', 'E');
        tmp = tmp.replace('Ï', 'I');
        tmp = tmp.replace('Ö', 'O');
        tmp = tmp.replace('Ü', 'U');
        tmp = tmp.replace('À', 'A');
        tmp = tmp.replace('È', 'E');
        tmp = tmp.replace('Ì', 'I');
        tmp = tmp.replace('Ò', 'O');
        tmp = tmp.replace('Ù', 'U');
        tmp = tmp.replace('Â', 'A');
        tmp = tmp.replace('Ê', 'E');
        tmp = tmp.replace('Î', 'I');
        tmp = tmp.replace('Ô', 'O');
        tmp = tmp.replace('Û', 'U');
        tmp = tmp.replace('Ñ', '*');
        tmp = tmp.replace('Ç', 'C');
        return tmp;
    }

    private static String eliminarHMuda(String str) {
        int size = str.length();
        StringBuilder stringBuilder = new StringBuilder(str);
        for (int i = 0; i < stringBuilder.length(); i++) {
            char charAt = stringBuilder.charAt(i);
            if (charAt == 'H' && (i > 0 && stringBuilder.charAt(i - 1) != 'C')
                    || (i == 0 && charAt == 'H')) {
                stringBuilder.deleteCharAt(i);
                size--;
                if (i < size)
                    i--;

            }
        }
        return stringBuilder.toString();
    }

    private static String aplicarReglas(String str) {
        int size = str.length();
        StringBuilder stringBuilder = new StringBuilder(str);
        for (int i = 0; i < stringBuilder.length(); i++) {
            char charAt = stringBuilder.charAt(i);
            if (charAt == 'C' && i < stringBuilder.length() - 1 && (stringBuilder.charAt(i + 1) == 'E' || stringBuilder.charAt(i + 1) == 'I')) {
                stringBuilder.replace(i, i + 1, "S");
            } else if (charAt == 'C' && i < stringBuilder.length() - 1 && (stringBuilder.charAt(i + 1) == 'A' || stringBuilder.charAt(i + 1) == 'O' ||
                    stringBuilder.charAt(i + 1) == 'U')) {
                stringBuilder.replace(i, i + 1, "K");
            } else if (charAt == 'Q') {
                if (i < stringBuilder.length() - 2 && stringBuilder.charAt(i + 1) == 'U' && (stringBuilder.charAt(i + 2) == 'E' || stringBuilder.charAt(i + 2) == 'I')) {
                    stringBuilder.replace(i, i + 2, "K");
                }
            } else if (charAt == 'U') {
                if (i == 0 && i < stringBuilder.length() && (stringBuilder.charAt(i + 1) == 'A' || stringBuilder.charAt(i + 1) == 'E')) {
                    stringBuilder.replace(i, i + 1, "W");
                }
            } else if (charAt == 'I') {
                stringBuilder.replace(i, i + 1, "Y");
            } else if (charAt == 'G') {
                if (i < stringBuilder.length() - 1 && (stringBuilder.charAt(i + 1) == 'U') && (stringBuilder.charAt(i + 2) == 'A' || stringBuilder.charAt(i + 2) == 'O')) {
                    stringBuilder.replace(i, i + 2, "W");
                } else if (i < stringBuilder.length() - 1 && (stringBuilder.charAt(i + 1) == 'E' || stringBuilder.charAt(i + 1) == 'I')) {
                    stringBuilder.replace(i, i + 2, "J");
                }
            } else if (charAt == 'R' && i < stringBuilder.length() - 1 && stringBuilder.charAt(i + 1) == 'R') {
                stringBuilder.deleteCharAt(i);
                size--;
                if (i < size)
                    i--;
            } else if (charAt == 'V') {
                stringBuilder.replace(i, i + 1, "B");
            } else if (charAt == 'Z') {
                stringBuilder.replace(i, i + 1, "S");
            } else if (charAt == 'L' && (i < size - 1 && (stringBuilder.charAt(i + 1) == 'L'))) {
                stringBuilder.replace(i, i + 2, "Y");
            }
        }
        return stringBuilder.toString();
    }
}
