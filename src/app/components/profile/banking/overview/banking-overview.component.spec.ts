import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankingOverviewComponent } from './banking-overview.component';

describe('BankingOverviewComponent', () => {
  let component: BankingOverviewComponent;
  let fixture: ComponentFixture<BankingOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankingOverviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BankingOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
