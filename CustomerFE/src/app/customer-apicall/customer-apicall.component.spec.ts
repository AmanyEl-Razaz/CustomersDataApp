import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerApicallComponent } from './customer-apicall.component';

describe('CustomerApicallComponent', () => {
  let component: CustomerApicallComponent;
  let fixture: ComponentFixture<CustomerApicallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerApicallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerApicallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
