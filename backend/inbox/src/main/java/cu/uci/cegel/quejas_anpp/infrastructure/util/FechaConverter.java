package cu.uci.cegel.quejas_anpp.infrastructure.util;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.time.LocalDate;
import java.util.Date;

@Converter(autoApply = true)
public class FechaConverter implements AttributeConverter<LocalDate, Date> {

    @Override
    public Date convertToDatabaseColumn(LocalDate localDateTime) {
        return localDateTime != null ? UtilFecha.convertir(localDateTime) : null;
    }

    @Override
    public LocalDate convertToEntityAttribute(Date date) {
        return date != null ? UtilFecha.convertirToLocalDate(date) : null;
    }
}
