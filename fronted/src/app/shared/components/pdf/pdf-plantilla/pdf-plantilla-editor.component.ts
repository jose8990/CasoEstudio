import {
  Component,
  ViewChild, ViewContainerRef, ComponentRef,
  Compiler, ComponentFactory, NgModule, ModuleWithComponentFactories, ComponentFactoryResolver, Input, OnInit,
  ElementRef, TemplateRef
} from '@angular/core';

import {TranslateService} from "@ngx-translate/core";

import {PdfMakeService} from "../../../services/pdfmake.service";

import * as html2canvas from "html2canvas";

import {Plantilla} from "../models";


declare var CKEDITOR: any;

@Component({
  selector: 'app-pdf-plantilla-editor',
  template: `
    <div>
      <div id="htmlContainer" #htmlContainer></div>
      <button (click)="compileTemplate()">Compile</button>
    </div>

    <pre>{{ ds | json }}</pre>

    <div #container></div>
  `,
})
export class PdfPlantillaEditorComponent implements OnInit {

  @Input() ds: any;
  @Input() plantilla: Plantilla;

  @ViewChild('htmlContainer') htmlContainer: ElementRef;

  @ViewChild('container', {read: ViewContainerRef})
  container: ViewContainerRef;

  componentRef: ComponentRef<IHaveDynamicData>;

  @ViewChild('html')
  html: ElementRef;

  constructor(private compiler: Compiler,
              private translateService: TranslateService,) {
  }

  ngOnInit() {
    CKEDITOR.disableAutoInline = true;
    let html = ``;

    html += `<div id="encabezado" #encabezado>` + this.plantilla.encabezado + `</div>`;
    html += `<div contenteditable="true" id="html" #html style="height: 400px;width: 895px;margin-bottom: 10px">` + this.plantilla.html + `</div>`;
    html += `<div id="piedepagina" #piedepagina>` + this.plantilla.piedepagina + `</div>`;

    this.htmlContainer.nativeElement.innerHTML = html;
    CKEDITOR.inline('html');
    CKEDITOR.config.language = this.translateService.getDefaultLang();

    const comp = this.addComponent(
      `<h4 (click)="increaseCounter()">
         Click to increase: {{counter}}
         <button (click)="compileTemplate()">Compile</button>
       </h4>`,
      {
        counter: 1,
        increaseCounter: function () {
          this.counter++;
        },
        compileTemplate: function () {

          html2canvas(this.templateRef.nativeElement).then(canvas => {
            const imgData = canvas.toDataURL();
            this.pdfMakeService.docDefinitionContent.push({
              image: imgData,
              width: 500
            });

            this.pdfMakeService.docDefinitionFooter.columns.push({
              image: imgData,
              width: 500
            });

            this.pdfMakeService.download('Prueba.pdf');
          });
          console.log(this.templateRef.nativeElement);
        }
      }
    );
    console.log();
  }

  compileTemplate() {
    this.preCompileTemplate().then(data => {
      console.log(data);
    });
  }

  private addComponent(template: string, properties: any = {}) {
    @Component({template})
    class TemplateComponent implements OnInit {
      templateRef: ElementRef;

      ngOnInit() {
      }

      constructor(templateRef: ElementRef, private pdfMakeService: PdfMakeService) {
        this.templateRef = templateRef;
      }
    }

    @NgModule({declarations: [TemplateComponent]})
    class TemplateModule {
    }

    const mod = this.compiler.compileModuleAndAllComponentsSync(TemplateModule);
    const factory = mod.componentFactories.find((comp) =>
      comp.componentType === TemplateComponent
    );
    const component = this.container.createComponent(factory);
    Object.assign(component.instance, properties);
    // If properties are changed at a later stage, the change detection
    // may need to be triggered manually:
    component.changeDetectorRef.detectChanges();
    return component;
  }

  preCompileTemplate(): Promise<String> {
    if (this.componentRef) {
      this.componentRef.destroy();
    }

    const template = this.htmlContainer.nativeElement.innerHTML;

    return new Promise((resolve) => {
      this.createComponentFactory('component-plantilla', template)
        .then((factory: ComponentFactory<IHaveDynamicData>) => {
          this.componentRef = this.container.createComponent(factory);
          const component = this.componentRef.instance;
          component.ds = this.ds;
          resolve(this.htmlContainer.nativeElement.innerHTML);
        });
    });

    // let metadata = {
    //   selector: this.selectorName,
    //   template: this.htmlContainer.nativeElement.innerHTML
    // };
    //
    // let factory = this.createComponentFactorySync(this.compiler, metadata, null);
    // this.container.createComponent(factory, 0);


  }

  // private createComponentFactorySync(compiler: Compiler, metadata: Component, componentClass: any): ComponentFactory<any> {
  //   const _this = this;
  //   const cmpClass = componentClass || class RuntimeComponent {
  //       ds: any = _this.ds;
  //     };
  //   const decoratedCmp = Component(metadata)(cmpClass);
  //
  //   @NgModule({imports: [CommonModule], declarations: [decoratedCmp]})
  //   class RuntimeComponentModule {
  //   }
  //
  //   let module: ModuleWithComponentFactories<any> = compiler.compileModuleAndAllComponentsAsync(RuntimeComponentModule);
  //   return module.componentFactories.find(f => f.componentType === decoratedCmp);
  // }


  private createComponentFactory(selector: string, template: string): Promise<ComponentFactory<IHaveDynamicData>> {
    const type = this.createNewComponent(selector, template);
    const module = this.createComponentModule(type);

    return new Promise((resolve) => {
      this.compiler.compileModuleAndAllComponentsAsync(module).then((moduleWithFactories) => {
        const factory = moduleWithFactories.componentFactories.find(f => f.componentType === type);
        resolve(factory);
      });
    });
  }

  private createNewComponent(selector: string, template: string) {
    @Component({
      selector: selector,
      template: template
    })
    class CustomDynamicComponent {
      @Input() ds: any;
    }
    return CustomDynamicComponent;
  }

  private createComponentModule(componentType: any) {
    @NgModule({
      declarations: [
        componentType
      ],
    })
    class RuntimeComponentModule {
    }

    return RuntimeComponentModule;
  }
}

export interface IHaveDynamicData {
  ds: any;
}
