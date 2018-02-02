import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {AppFixed} from "./fixed.component";

describe('AppToolbarComponent', () => {
  let component: AppFixed;
  let fixture: ComponentFixture<AppFixed>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppFixed]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppFixed);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
