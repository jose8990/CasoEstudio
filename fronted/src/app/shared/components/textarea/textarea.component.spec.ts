import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {AppTextareaComponent} from "./textarea.component";

describe('AppTextareaComponent', () => {
  let component: AppTextareaComponent;
  let fixture: ComponentFixture<AppTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppTextareaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
