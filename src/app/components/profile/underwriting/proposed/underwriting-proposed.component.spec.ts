import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderwritingProposedComponent } from './underwriting-proposed.component';

describe('UnderwritingProposedComponent', () => {
  let component: UnderwritingProposedComponent;
  let fixture: ComponentFixture<UnderwritingProposedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnderwritingProposedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnderwritingProposedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
