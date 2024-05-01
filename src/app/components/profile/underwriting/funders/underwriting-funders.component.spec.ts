import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderwritingFundersComponent } from './underwriting-funders.component';

describe('UnderwritingFundersComponent', () => {
  let component: UnderwritingFundersComponent;
  let fixture: ComponentFixture<UnderwritingFundersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnderwritingFundersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnderwritingFundersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
