import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankingFormComponent } from './banking-form.component';

describe('BankingFormComponent', () => {
  let component: BankingFormComponent;
  let fixture: ComponentFixture<BankingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankingFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BankingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
