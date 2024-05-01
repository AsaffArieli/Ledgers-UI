import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankingDataFormComponent } from './banking-data-form.component';

describe('BankingDataFormComponent', () => {
  let component: BankingDataFormComponent;
  let fixture: ComponentFixture<BankingDataFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankingDataFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BankingDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
