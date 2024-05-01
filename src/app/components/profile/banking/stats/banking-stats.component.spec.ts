import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankingStatsComponent } from './banking-stats.component';

describe('BankingStatsComponent', () => {
  let component: BankingStatsComponent;
  let fixture: ComponentFixture<BankingStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankingStatsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BankingStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
