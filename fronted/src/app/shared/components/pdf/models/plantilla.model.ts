export class Plantilla {
  idplantilla: number
  nombre: string;
  html: string;
  activo: boolean;
  encabezado: string;
  piedepagina: string;
  numero_plantilla: number;

  constructor() {
    this.nombre = '';
    this.html = '';
    this.activo = true;
    this.encabezado = '';
    this.piedepagina = '';
    this.numero_plantilla = null;
  }
}
