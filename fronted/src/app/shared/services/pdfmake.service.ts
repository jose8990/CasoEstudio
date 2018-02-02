import {Injectable} from "@angular/core";

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";

@Injectable()
export class PdfMakeService {
  private _pageSize: string = 'LETTER';
  private _pageOrientation: string = 'landscape';

  private _docDefinition: any = {
    pageSize: 'LETTER',
    pageMargins: [40, 170, 40, 0],
    pageOrientation: 'landscape',
    header: {
      margin: [40, 10, 10, 40],
      columns: []
    },
    footer: {
      columns: [],
      margin: [10, 0]
    },
    content: [],
  };

  public footerNumPageDefinition: any = function (page: number, pages: number,
                                                  alignment: string = 'right', margin: number[] = [10, 10, 10, 0],
                                                  pageStyle: any = {
                                                    text: page.toString(),
                                                    italics: true,
                                                    color: "#9a0000"
                                                  },
                                                  textStyle: any = {text: ' of ', color: "#9a0000"},
                                                  pagesStyle: any = {
                                                    text: pages.toString(),
                                                    italics: true,
                                                    color: "#9a0000"
                                                  }) {

    return {
      alignment: alignment,
      margin: margin,
      text: [
        pageStyle,
        textStyle,
        pagesStyle
      ]
    };
  };

  constructor() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }


  get pageSize(): string {
    return this._pageSize;
  }

  set pageSize(value: string) {
    this._pageSize = value;
  }

  get pageOrientation(): string {
    return this._pageOrientation;
  }

  set pageOrientation(value: string) {
    this._pageOrientation = value;
  }

  //<editor-fold defaultstate="collapsed" desc="Funciones para manipular el objeto docDefinition">
  get docDefinition(): any {
    return this._docDefinition;
  }

  get docDefinitionContent(): any[] {
    return this._docDefinition.content;
  }

  get docDefinitionHeader(): { styles: {}, columns: any[] } {
    return this._docDefinition.header;
  }

  get docDefinitionFooter(): { styles: {}, columns: any[] } {
    return this._docDefinition.footer;
  }

  get docDefinitionStyles(): {} {
    return this._docDefinition.styles;
  }

  set docDefinition(value: any) {
    this._docDefinition = value;
  }

  set docDefinitionContent(value: any[]) {
    this._docDefinition.content = value;
  }

  set docDefinitionHeader(value: { styles: {}, columns: any[] }) {
    this._docDefinition.header = value;
  }

  set docDefinitionFooter(value: { styles: {}, columns: any[] }) {
    this._docDefinition.footer = value;
  }

  set docDefinitionStyles(value: {}) {
    this._docDefinition.styles = value;
  }

  //</editor-fold>
  public open() {
    pdfMake.createPdf(this.docDefinition).open();
  }

  public print() {
    pdfMake.createPdf(this.docDefinition).print();
  }

  public download(name?: string) {
    pdfMake.createPdf(this.docDefinition).download(name);
  }

  public getDocumentPdf(docDefinition: any) {
    return pdfMake.createPdf(docDefinition);
  }

  public addText(text: string, style?: string) {
    if (style) {
      this.docDefinition.content.push({text: text, style: style});
      return;
    }
    this.docDefinition.content.push(text);
  }

  private ParseContainer(cnt, e, p, styles) {
    const elements = [];
    const children = e.childNodes;
    if (children.length !== 0) {
      for (let i = 0; i < children.length; i++) {
        p = this.ParseElement(elements, children[i], p, styles);
      }
    }
    if (elements.length !== 0) {
      for (let i = 0; i < elements.length; i++) {
        cnt.push(elements[i]);
      }
    }
    return p;
  }

  private ComputeStyle(o, styles) {
    for (let i = 0; i < styles.length; i++) {
      const st = styles[i].trim().toLowerCase().split(':');
      if (st.length === 2) {
        st[0] = st[0].trim();
        st[1] = st[1].trim();
        switch (st[0]) {
          case 'padding-left':
            o.margin = [parseInt(st[1]), 0, 0, 0];
            break;
          case 'font-size':
            if (st[1] === 'medium') {
              st[1] = 12;
            }
            o.fontSize = parseInt(st[1]);
            break;
          case 'text-align':
            switch (st[1]) {
              case 'right':
              case 'center':
              case 'justify':
                o.alignment = st[1];
                break;
            }
            break;
          case 'font-weight':
            switch (st[1]) {
              case 'bold':
                o.bold = true;
                break;
            }
            break;
          case 'text-decoration':
            switch (st[1]) {
              case 'underline':
                o.decoration = 'underline';
                break;
              case 'line-through':
                o.decoration = 'lineThrough';
                break;
            }
            break;
          case 'font-style':
            switch (st[1]) {
              case 'italic':
                o.italics = true;
                break;
            }
            break;
          case 'color':
            o.color = this.parseColor(st[1]);
            break;
          case 'background-color':
            o.background = this.parseColor(st[1]);
            break;
        }
      }
    }
  }

  private parseColor = function (color) {
    const hexRegex = new RegExp('^#([0-9a-f]{3}|[0-9a-f]{6})$');
    // e.g. #fff or #ff0048
    const rgbRegex = new RegExp('^rgb\\((\\d+),\\s*(\\d+),\\s*(\\d+)\\)$');
    // e.g. rgb(0,255,34) or rgb(22, 0, 0)
    const nameRegex = new RegExp('^[a-z]+$');
    // matches just text like 'red', 'black', 'green'

    if (hexRegex.test(color)) {
      return color;
    } else if (rgbRegex.test(color)) {
      const decimalColors = rgbRegex.exec(color).slice(1);
      for (let i = 0; i < 3; i++) {
        let decimalValue = parseInt(decimalColors[i]);
        if (decimalValue > 255) {
          decimalValue = 255;
        }
        let hexString = '0' + decimalValue.toString(16);
        hexString = hexString.slice(-2);
        decimalColors[i] = hexString;
      }
      return '#' + decimalColors.join('');
    } else if (nameRegex.test(color)) {
      return color;
    } else {
      console.error('Could not parse color "' + color + '"');
      return color;
    }
  }

  private ParseElement(cnt, e, p, styles) {
    styles = styles || [];
    if (e.getAttribute) {
      const nodeStyle = e.getAttribute('style');
      if (nodeStyle) {
        const ns = nodeStyle.split(';');
        for (let k = 0; k < ns.length; k++) {
          styles.push(ns[k]);
        }
      }
    }

    switch (e.nodeName.toLowerCase()) {
      case '#text':
        const t1 = {text: e.textContent.replace(/\n/g, '')};
        if (styles) {
          this.ComputeStyle(t1, styles);
        }
        p.text.push(t1);
        break;
      case 'b':
      case 'img':
        const maxResolution = {
          width: 435,
          height: 830
        };

        let width = parseInt(e.getAttribute("width"));
        let height = parseInt(e.getAttribute("height"));

        const nodeStyle = e.getAttribute('style');

        let heightStyle = null;
        let widthStyle = null;
        if (nodeStyle) {
          const ns = nodeStyle.split(';');
          for (let k = 0; k < ns.length; k++) {
            console.log(ns[k].split(':')[0]);
            console.log(ns[k].split(':')[1]);
            if (ns[k].split(':')[0] && ns[k].split(':')[0].replace(' ', '') === 'height') {
              heightStyle = parseInt(ns[k].split(':')[1]);
            }
            if (ns[k].split(':')[0] && ns[k].split(':')[0].replace(' ', '') === 'width') {
              widthStyle = parseInt(ns[k].split(':')[1]);
            }
          }
        }

        if (isNaN(width)) {
          width = widthStyle;
        }
        if (isNaN(height)) {
          height = heightStyle;
        }

        if (width > maxResolution.width) {
          const scaleByWidth = maxResolution.width / width;
          width *= scaleByWidth;
          height *= scaleByWidth;
        }
        if (height > maxResolution.height) {
          const scaleByHeight = maxResolution.height / height;
          width *= scaleByHeight;
          height *= scaleByHeight;
        }
        cnt.push({
          image: e.getAttribute("src"),
          width: width,
          alignment: e.getAttribute("alignment")
        });
        break;
      case 'em':
        this.ParseContainer(cnt, e, p, styles);
        break;
      case 'strong':
        this.ParseContainer(cnt, e, p, styles.concat(['font-weight:bold']));
        break;
      case 'u':
        this.ParseContainer(cnt, e, p, styles.concat(['text-decoration:underline']));
        break;
      case 'i':
        this.ParseContainer(cnt, e, p, styles.concat(['font-style:italic']));
        break;
      case 'span':
        this.ParseContainer(cnt, e, p, styles);
        break;
      case 'br':
        p = this.CreateParagraph();
        cnt.push(p);
        break;
      case 'table':
        const t2: any = {
          table: {
            widths: [],
            body: []
          }
        };
        const border = e.getAttribute('pdf-border');
        const layouts = ['noBorders', 'headerLineOnly', 'lightHorizontalLines'];
        if (layouts.indexOf(border) > -1) {
          t2.layout = border;
        }
        this.ParseContainer(t2.table.body, e, p, styles);

        const widths = e.getAttribute('pdf-widths');
        if (!widths) {
          if (t2.table.body.length !== 0) {
            if (t2.table.body[0].length !== 0) {
              for (let k = 0; k < t2.table.body[0].length; k++) {
                t2.table.widths.push('*');
              }
            }
          }
        } else {
          const w = widths.split(/[\s,]+/);
          for (let k = 0; k < w.length; k++) {
            t2.table.widths.push(w[k]);
          }
        }
        cnt.push(t2);
        break;
      case 'tbody':
        this.ParseContainer(cnt, e, p, styles);
        break;
      case 'tr':
        const row = [];
        this.ParseContainer(row, e, p, styles);
        cnt.push(row);
        break;
      case 'td':
        p = this.CreateParagraph();
        const st1: any = {stack: []};
        st1.stack.push(p);

        const rspan = e.getAttribute('rowspan');
        if (rspan) {
          st1.rowSpan = parseInt(rspan);
        }
        const cspan = e.getAttribute('colspan');
        if (cspan) {
          st1.colSpan = parseInt(cspan);
        }

        this.ParseContainer(st1.stack, e, p, styles);
        cnt.push(st1);
        break;
      case 'div':
      case 'li':
      case 'p':
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
        p = this.CreateParagraph();
        const st2 = {stack: []};
        st2.stack.push(p);
        this.ComputeStyle(st2, styles);
        this.ParseContainer(st2.stack, e, p, []);

        cnt.push(st2);
        break;
      case 'ul':
        const ul1 = {ul: []};
        this.ParseContainer(ul1.ul, e, p, styles);
        cnt.push(ul1);
        break;
      case 'ol':
        const ul2 = {ol: []};
        this.ParseContainer(ul2.ol, e, p, styles);
        cnt.push(ul2);
        break;
      default:
        console.log('#html2pdfmake', 'Parsing for node ' + e.nodeName + ' not found');
        break;
    }
    return p;
  }

  private ParseHtml(cnt, htmlText: HTMLElement) {
    const p = this.CreateParagraph();
    for (let i = 0; i < htmlText.children.length; i++) {
      const element = htmlText.children.item(i);
      this.ParseElement(cnt, element, p, []);
    }
  }

  private CreateParagraph() {
    const p: any = {text: []};
    return p;
  }

  public parseHtml(html) {
    const content = [];
    this.ParseHtml(content, html);
    return content;
  }
}
