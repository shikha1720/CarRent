import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAgreementComponent } from './my-agreement.component';

describe('MyAgreementComponent', () => {
  let component: MyAgreementComponent;
  let fixture: ComponentFixture<MyAgreementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyAgreementComponent]
    });
    fixture = TestBed.createComponent(MyAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
