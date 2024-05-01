import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankingDataComponent } from './banking-data.component';

describe('BankingDataComponent', () => {
  let component: BankingDataComponent;
  let fixture: ComponentFixture<BankingDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankingDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BankingDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
