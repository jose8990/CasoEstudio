import {
  ChangeDetectorRef,
  Compiler,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef
} from "@angular/core";

@Component({
  selector: 'app-dynamic-wrapper',
  template: `
    <div #target></div>`
})
export class DynamicWrapperComponent implements OnInit {
  @ViewChild('target', {read: ViewContainerRef}) target;
  @Input() public componentData: IDynamicComponentData;

  private cmpRef: ComponentRef<any>;
  private componentInstance: IDynamicComponent;
  private isViewInitialized: boolean = false;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private compiler: Compiler,
              private cdRef: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  updateComponent() {
    if (!this.isViewInitialized) {
      return;
    }
    if (this.cmpRef) {
      this.cmpRef.destroy();
    }

    let factory = this.componentFactoryResolver.resolveComponentFactory(this.componentData.component);
    this.cmpRef = this.target.createComponent(factory)
    // to access the created instance use
    this.componentInstance = this.cmpRef.instance as IDynamicComponent;

    this.componentInstance.Context = this.componentData.context;

    // this.compRef.instance.someProperty = 'someValue';
    // this.compRef.instance.someOutput.subscribe(val => doSomething());
    this.cdRef.detectChanges();
  }

  ngOnChanges() {
    this.updateComponent();
  }

  ngAfterViewInit() {
    this.isViewInitialized = true;
    this.updateComponent();
  }

  ngOnDestroy() {
    if (this.cmpRef) {
      this.cmpRef.destroy();
    }
  }
}

// all dynamically loaded components should implement this guy
export interface IDynamicComponent { Context: object;
}

// data from parent to dynLoadedComponent
export interface IDynamicComponentData {
  component: any;
  context?: object;
  caller?: any;
}
