/*package cu.uci.cegel.quejas_anpp.kernel.config;

//import com.mongodb.Mongo;
//import com.mongodb.MongoClient;
import org.springframework.context.annotation.Bean;
//import org.springframework.data.mongodb.config.AbstractMongoConfiguration;
//import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.data.web.config.EnableSpringDataWebSupport;
import org.springframework.stereotype.Component;

@Component
@EnableSpringDataWebSupport
public class AppConfig extends AbstractMongoConfiguration {

    @Bean
    public GridFsTemplate gridFsTemplate() throws Exception {
        return new GridFsTemplate(mongoDbFactory(), mappingMongoConverter());
    }

    @Override
    protected String getDatabaseName() {
        return "adjuntos";
    }

    @Override
    public Mongo mongo() throws Exception {
        return new MongoClient("10.58.12.228");
    }
}
*/