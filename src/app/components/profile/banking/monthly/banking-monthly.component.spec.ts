import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankingMonthlyComponent } from './banking-monthly.component';

describe('BankingMonthlyComponent', () => {
  let component: BankingMonthlyComponent;
  let fixture: ComponentFixture<BankingMonthlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankingMonthlyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BankingMonthlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
