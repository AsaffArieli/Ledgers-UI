import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankingSummaryComponent } from './banking-summary.component';

describe('BankingSummaryComponent', () => {
  let component: BankingSummaryComponent;
  let fixture: ComponentFixture<BankingSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankingSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BankingSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
