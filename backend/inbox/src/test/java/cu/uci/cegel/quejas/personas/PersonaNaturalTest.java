/*package cu.uci.cegel.quejas.personas;

import com.fasterxml.jackson.databind.ObjectMapper;
import cu.uci.cegel.quejas.kernel.UtilObject;
import cu.uci.cegel.quejas_anpp.domain.persona.PersonaNaturalRepository;
import cu.uci.cegel.quejas_anpp.domain.persona.Personanatural;
import cu.uci.cegel.quejas_anpp.domain.persona.PersonanaturalService;
import cu.uci.cegel.quejas_anpp.web.personas.dto.PersonaNaturalDTO;
import cu.uci.cegel.quejas_anpp.web.personas.dto.PersonaNaturalForm;
import cu.uci.cegel.quejas_anpp.web.personas.dto.PersonaNaturalResource;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.hateoas.hal.Jackson2HalModule;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class PersonaNaturalTest {

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    private PersonanaturalService personanaturalService;
    @Autowired
    private PersonaNaturalRepository personaNaturalRepository;

    @Autowired
    private UtilObject utilObject;

    private MockMvc mockMvc;
    private ObjectMapper objectMapper;

    @Before
    public void setUp() {
        this.mockMvc = MockMvcBuilders
                .webAppContextSetup(this.webApplicationContext)
                .build();
        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new Jackson2HalModule());
    }

    @Test
    public void registrarPersonaNaturalBasicaTest() throws Exception {
        String url = "/api/v1.0/personanatural";

        PersonaNaturalDTO personaNaturalDTO = PersonaNaturalDTO.builder()
                .primernombre("pnombre")
                .primerapellido("apelido")
                .build();

        String jsonInString = objectMapper.writeValueAsString(personaNaturalDTO);
        MvcResult result = this.mockMvc.perform(
                MockMvcRequestBuilders.post(url)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonInString))
                .andExpect(status().isCreated())
                .andReturn();
        PersonaNaturalResource personaNaturalResource = objectMapper.readValue(result.getResponse().getContentAsString(), PersonaNaturalResource.class);
        assertThat(personaNaturalResource.getPrimernombre()).isEqualToIgnoringCase(personaNaturalDTO.getPrimernombre());
    }

    @Test
    public void registrarPersonaNaturalTest() throws Exception {
        String url = "/api/v1.0/personanatural";

        PersonaNaturalDTO personaNaturalDTO = utilObject.crearPersonaNaturalDTO();

        String jsonInString = objectMapper.writeValueAsString(personaNaturalDTO);
        MvcResult result = this.mockMvc.perform(
                MockMvcRequestBuilders.post(url)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonInString))
                .andExpect(status().isCreated())
                .andReturn();
        PersonaNaturalResource personaNaturalResource = objectMapper.readValue(result.getResponse().getContentAsString(), PersonaNaturalResource.class);
        assertThat(personaNaturalResource.getNumeroidentidad()).isEqualToIgnoringCase(personaNaturalDTO.getNumeroidentidad());
    }

    @Test
    public void actualizarPersonaNaturalTest() throws Exception {
        Personanatural personanatural = personanaturalService.registrarPersonaNatural(utilObject.crearPersonaNaturalDTO());
        PersonaNaturalDTO personaNaturalDTO = utilObject.crearPersonaNaturalDTO();
        personaNaturalDTO.setPrimernombre("pnombre update");
        personaNaturalDTO.setPrimerapellido("papellido update");
        if (personanatural.getRaza() != null)
            personaNaturalDTO.setIdnraza(personanatural.getRaza().getId());
        if (personanatural.getSexo() != null)
            personaNaturalDTO.setIdnsexo(personanatural.getSexo().getId());
        if (personanatural.getEstadocivil() != null)
            personaNaturalDTO.setIdnestadocivil(personanatural.getEstadocivil().getId());
        if (personanatural.getPaisorigen() != null)
            personaNaturalDTO.setIdpaisorigen(personanatural.getPaisorigen().getId());
        if (personanatural.getPaisresidencia() != null)
            personaNaturalDTO.setIdpaisresidencia(personanatural.getPaisresidencia().getId());
        String jsonInString = objectMapper.writeValueAsString(personaNaturalDTO);
        String url = "/api/v1.0/personanatural/" + personanatural.getId();
        MvcResult result = this.mockMvc.perform(
                MockMvcRequestBuilders.put(url)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonInString))
                .andExpect(status().isOk())
                .andReturn();
        PersonaNaturalResource personaNaturalResource = objectMapper.readValue(result.getResponse().getContentAsString(), PersonaNaturalResource.class);
        assertThat(personaNaturalResource.getIdpersonanatural()).isEqualTo(personanatural.getId());
    }

    @Test
    public void debeBuscarPersonasPorCriterios() {
        PersonaNaturalDTO naturalDTO1 = utilObject.crearPersonaNaturalDTO();
        naturalDTO1.setNumeroidentidad("11111111111");
        naturalDTO1.setPrimernombre("Juan");

        Personanatural personanatural1 = personanaturalService.registrarPersonaNatural(naturalDTO1);
        PersonaNaturalDTO naturalDTO2 = utilObject.crearPersonaNaturalDTO();
        naturalDTO2.setNumeroidentidad("11111111111");
        naturalDTO2.setPrimernombre("Gomez");
        Personanatural personanatural2 = personanaturalService.registrarPersonaNatural(naturalDTO2);

        PersonaNaturalForm naturalForm = PersonaNaturalForm.builder()
                .build();

        Page<Personanatural> personasNaturales = personanaturalService.listarPersonasNaturales(naturalForm, new PageRequest(0, 20));
        System.out.println(personasNaturales.getTotalElements());
        assertThat(personasNaturales.getTotalElements()).isEqualTo(personaNaturalRepository.findAll().size());
    }


}
*/