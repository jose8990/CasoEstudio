import {Injectable} from "@angular/core";
import {Table} from "./table";
// declare const pdfMake;
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";

@Injectable()
export class PdfmakeService {

  pageSize = 'LETTER';
  pageOrientation = 'portrait';

  private base64textString = '';
  private height = 24;
  private width = 35;

  docDefinition: any = {
    pageSize: this.pageSize,
    pageOrientation: this.pageOrientation,
    content: [],
    header: {
      styles: {},
      columns: []
    },
    styles: {}
  };

  constructor() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  open() {
    pdfMake.createPdf(this.docDefinition).open();
  }

  print() {
    pdfMake.createPdf(this.docDefinition).print();
  }

  download(name?: string) {
    pdfMake.createPdf(this.docDefinition).download(name);
  }

  getDocumentPdf(docDefinition: any) {
    return pdfMake.createPdf(docDefinition);
  }

  configureStyles(styles) {
    this.docDefinition.styles = styles;
  }

  // configureHeader(styles,title){
  //     this.docDefinition.header="Este es mi encabezado";
  //     // this.docDefinition.styles = styles;
  //     this.docDefinition.styles = { header: { fontSize: 18, bold: true, background: '#ff44' } };
  // }
  configureHeader() {
    const imageUrl = 'http://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png';
    // var convertFunction = this.getBase64FromImageUrl(imageUrl);
    // console.log("Entro bien"+"--"+convertFunction);
  }

  // d.footer = [ { columns: [ { image: "views/images/Logo_Grau_mit_Schriftzug_15mm_300_dpi.png",
  // width: 50*7.2/2.54, //alignment: "right", }, { text: "Stand: "+moment().format("D.M.YYYY") }, ],
  // margin: mm([20,0,10,10]), } ]
  addText(text: string, style?: string) {
    if (style) {
      this.docDefinition.content.push({text: text, style: style});
      return;
    }
    this.docDefinition.content.push(text);
  }

  addColumns(columnsText: string[]) {
    const columns = [];
    for (const column of columnsText) {
      columns.push({text: column});
    }

    this.docDefinition.content.push({columns: columns});
  }

  addTable(table: Table) {
    const body = [];
    let row = [];

    if (table) {


      for (const header of table.headers.cells) {
        row.push(header.content);
      }

      body.push(row);

      for (const rowObj of table.rows) {
        row = [];
        for (const cell of rowObj.cells) {
          row.push(cell.content);
        }
        body.push(row);
      }

      let tableDictionary;

      if (table.widths) {
        tableDictionary = {
          table: {
            widths: table.widths,
            body: body
          }
        };
      } else {
        tableDictionary = {table: {body: body}};
      }

      this.docDefinition.content.push(tableDictionary);
    }
  }

  addImage(url: string, width?: number, height?: number) {
    let data;
    const image = new Image();

    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;

    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      canvas.getContext('2d').drawImage(image, 0, 0);

      data = canvas.toDataURL('image/png');
      let dict;
      if (width) {
        if (height) {
          dict = {image: data, width: width, height: height};
        } else {
          dict = {image: data, width: width};
        }
      } else {
        dict = {image: data};
      }

      this.docDefinition.content.push(dict);
    };
  }

  getImage(url: string, width?: number, height?: number) {
    let data;
    const image = new Image();

    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;

    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      canvas.getContext('2d').drawImage(image, 0, 0);

      data = canvas.toDataURL('image/png');
      // let dict;
      // if (width) {
      //     if (height) {
      //         dict = {image: data, width: width, height: height};
      //     } else {
      //         dict = {image: data, width: width};
      //     }
      // } else {
      //     dict = {image: data};
      // }
      //
      // this.docDefinition.content.push(dict);
      return data;
    };
  }

  addImageHeaderFooter(title: string, fechaCreacion: string, nombreAutor: string, width?: number, height?: number) {
    let urlUci = 'assets/sgquo/img/UCI.png';
    let urlLinea = 'assets/sgquo/img/Xabal-SGQUO.png';
    // let urlLinea = 'assets/sgquo/img/linea.png';
    // let urlXabal = 'assets/sgquo/img/Xabal-SGQUO.png';
    let data;
    let data2;
    const image = new Image();
    const image2 = new Image();
    image2.setAttribute('crossOrigin', 'anonymous');
    image.setAttribute('crossOrigin', 'anonymous');

    image2.src = urlLinea;
    image.src = urlUci;
    let dict;

    this.docDefinition = {
      pageSize: 'LETTER',
      pageMargins: [40, 140, 40, 40],
      pageOrientation: 'landscape',
      header: {
        margin: [40, 10, 10, 40],
        // width: 60,
        // height: 60,
        columns: []
      },
      footer: {
        columns: [],
        margin: [20, 0]
      },
      content: [
        this.docDefinition.content
      ],
    };

    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      canvas.getContext('2d').drawImage(image, 0, 0);

      data = canvas.toDataURL('image/png');

      this.docDefinition.header.columns.push({
        image: data,
        width: 90,
        height: 65
      });
      this.docDefinition.header.columns.push({
        margin: [10, 10, 0, 0],
        stack: [

          {
            fontSize: 25,
            margin: [10, 0, 0, 0],
            decoration: 'underline',
            italics: true,
            color: "#9a0000",
            bold: true,
            text: 'SGQO'
          },
          {fontSize: 23, margin: [10, 0, 0, 0], color: "#9a0000", text: title},
        ]
      });

    };

    image2.onload = () => {
      const canvas2 = document.createElement('canvas');
      canvas2.width = image2.naturalWidth;
      canvas2.height = image2.naturalHeight;

      canvas2.getContext('2d').drawImage(image2, 0, 0);

      data2 = canvas2.toDataURL('image/png');

      this.docDefinition.footer = function (page, pages) {
        return {
          columns: [
            {
              margin: [30, 0, 0, 0],
              stack: [
                {
                  margin: [10, 0, 0, 0], color: "#9a0000", text: [
                  {text: 'Fecha de impresión: ', color: "#9a0000"},
                  {text: fechaCreacion, bold: true, color: "#9a0000"}
                ]
                },
                {
                  margin: [10, 0, 0, 0], color: "#9a0000", text: [
                  {text: 'Impreso por: ', color: "#9a0000"},
                  {text: 'aaaaa', bold: true, color: "#9a0000"}
                ]
                },
              ]
            },
            {
              alignment: 'right',
              margin: [0, 20, 10, 0],
              text: [

                {text: page.toString(), italics: true, color: "#9a0000"},
                {text: ' of ', color: "#9a0000"},
                {text: pages.toString(), italics: true, color: "#9a0000"}
              ],
            },
            {
              image: data2,

              width: 180,
              height: 30,
              margin: [0, 0, 0, 10]
            },

          ],
          margin: [10, 0]
        };
      };
    };


  }

  addUnorderedlist(items: any[]) {
    this.docDefinition.content.push({ul: items});
  }

  addOrderedList(items: any[], reversed?: boolean, start?: number) {
    if (reversed) {
      this.docDefinition.content.push({reversed: reversed, ol: items});
    } else if (reversed && start) {
      this.docDefinition.content.push({reversed: reversed, start: start, ol: items});
    } else if (start) {
      this.docDefinition.content.push({start: start, ol: items});
    } else {
      this.docDefinition.content.push({ol: items});
    }
  }
}
