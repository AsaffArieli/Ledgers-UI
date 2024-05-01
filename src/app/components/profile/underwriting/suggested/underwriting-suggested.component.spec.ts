import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderwritingSuggestedComponent } from './underwriting-suggested.component';

describe('UnderwritingSuggestedComponent', () => {
  let component: UnderwritingSuggestedComponent;
  let fixture: ComponentFixture<UnderwritingSuggestedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnderwritingSuggestedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnderwritingSuggestedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
