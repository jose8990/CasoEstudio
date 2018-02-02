import {Component, OnInit} from "@angular/core";
import {UploadService} from "../../../shared/services/upload.service";
import {TranslateService} from "@ngx-translate/core";
import {IDatasourceRequest, IDatasourceRequestLocal} from "../../../shared/components/table/table.interfaces";
import {Plantilla} from "../../../shared/components/pdf/models/plantilla.model";
import {CasoPruebaService} from "./services/caso-prueba.service";
import {Persona} from "./model/persona.model";
import {Buscar} from "./model/buscar";
import {ApiService} from "../../../core/services/api.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public AllowParentSelection = true;
  public ShowFilter = true;
  public Disabled = false;
  public FilterPlaceholder = 'Filtro';
  public MaxDisplayed = 5;
  public data = [];
  totalPersonas: any[];

  persona: Persona = {idpersona: null, nombre: '', apellido: '', participacion: null};
  buscar: Buscar = {idestado: null, idespecialista: null, idtipoescrito: null, idclasificacion: null, fecharadicacion: null, fechaescrito: null, numeroexpediente: ''};


  constructor(public uploadService: UploadService,
              public casoService: CasoPruebaService,
              public apiService: ApiService,
              private router: Router,
              private route: ActivatedRoute,
              private translate: TranslateService) {
    this.uploadService.setConfig();
  }

  public datasource: any = (request: any): IDatasourceRequest | IDatasourceRequestLocal => {
    if (this.casoService.search(request)) {
      return <IDatasourceRequestLocal> {data: [], identifierResource: 'idpersona'};

    } else {
      return this.casoService.search(request);
    }
  }

  public idsRowSelected: Array<number> = [];
  public options: any = {
    orderMulti: true,
    className: ['table-striped'],
    language: this.translate.getDefaultLang(),
    checked: false
  };
  public paging: any = {
    itemsPerPage: 5,
    itemsPerPageOptions: [5, 10, 25, 50, 100],
    maxSize: 5
  };
  public columns: Array<any> = [
    {
      title: '',
      name: 'idpersonanatural',
      sort: false,
      //defaultSortOrder: 'asc'
    },
    {
      title: 'Nombre',
      name: 'nombre',
      sort: false,
      //defaultSortOrder: 'asc'
    },
    {
      title: 'Apellido',
      name: 'apellido',
      sort: false
    },
    {
      title: 'Participación',
      name: 'especialistaDescripcion',
      render: (data: any, row): string => {
        var especialista = row.participacion;
        if(especialista == null)
          return `
          <p></p>
        `;
        else return `
          <p class="text-center">
            ` + especialista  + `
          </p>
        `;
      },
      sort: false
    },
  ];

  public chartType:string = 'doughnut';//'pie';

  public chartData:Array<any> = [300, 50, 100, 120];

  public label:Array<any> = [];//['Red', 'Green', 'Yellow', 'Grey'];

  public chartColors:Array<any> = [{
    hoverBorderColor: ['rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)'],
    hoverBorderWidth: 0,
    backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1"],
    hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5"]
  }];

  public chartOptions:any = {
    responsive: true
  };

  public chartClicked(e: any): void {

  }

  public chartHovered(e: any): void {

  }

  ngOnInit() {

    this.route.data.subscribe(
      (data: { personas: any[]}) => {

        var datosAux:Array<any> = [];// [300, 50, 100, 40, 120];
        var labelsAux:Array<any> = [];
        var hoverBorderColor:Array<any> = [];
        var backgroundColor:Array<any> = [];
        var hoverBorderWidth:number = 0;

        for(var i=0;i<data.personas.length;i++){
          datosAux.push(data.personas[i].participacion);
          labelsAux.push(data.personas[i].nombre);
          hoverBorderColor.push('rgba(0, 0, 0, 0.1)');
          backgroundColor.push(this.dame_color_aleatorio());
        }

        var chartColores:Array<any> = [{hoverBorderColor: hoverBorderColor, hoverBorderWidth:hoverBorderWidth, backgroundColor:backgroundColor}];
        //console.log(labelsAux);
        this.chartData = datosAux;
        this.label = labelsAux;//['Red', 'Green', 'Yellow', 'Grey'];//labelsAux;
        this.chartColors = chartColores;
      }
    );

    this.datasource = (request: any): IDatasourceRequest => {
      console.log(this.casoService.search(this.buscar).resource);
      return this.casoService.search(this.buscar);
    };

    this.idsRowSelected = [];

  }

  public llenarGrafica(personas:any[]):void{

    var datosAux:Array<any> = [];// [300, 50, 100, 40, 120];
    var labelsAux:Array<any> = [];
    var hoverBorderColor:Array<any> = [];
    var backgroundColor:Array<any> = [];
    var hoverBorderWidth:number = 0;

    for(var i=0;i<personas.length;i++){
      datosAux.push(personas[i].participacion);
      labelsAux.push(personas[i].nombre);
      hoverBorderColor.push('rgba(0, 0, 0, 0.1)');
      backgroundColor.push(this.dame_color_aleatorio());
    }

    var chartColores:Array<any> = [{hoverBorderColor: hoverBorderColor, hoverBorderWidth:hoverBorderWidth, backgroundColor:backgroundColor}];
    //console.log(labelsAux);
    this.chartData = datosAux;
    this.label = labelsAux;//['Red', 'Green', 'Yellow', 'Grey'];//labelsAux;
    this.chartColors = chartColores;

  }

  public dame_color_aleatorio(){
    var hexadecimal = new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F");
    var color_aleatorio = "#";
    for (var i=0;i<6;i++){
      var posarray = this.aleatorio(0,hexadecimal.length)
      color_aleatorio += hexadecimal[posarray];
    }
    return color_aleatorio;
  }

  public aleatorio(inferior,superior){
    var numPosibilidades = superior - inferior
    var aleat = Math.random() * numPosibilidades
    var aleat = Math.floor(aleat)
    return parseInt(inferior) + aleat;
  }

  public addPersona() {
    this.casoService.save(this.persona).subscribe(
      success => {

        this.router.navigateByUrl('/personanatural');

      }, error => {
      });
  }

}
