import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankingStatementsComponent } from './banking-statements.component';

describe('BankingStatementsComponent', () => {
  let component: BankingStatementsComponent;
  let fixture: ComponentFixture<BankingStatementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankingStatementsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BankingStatementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
