import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderwritingStatsComponent } from './underwriting-stats.component';

describe('UnderwritingStatsComponent', () => {
  let component: UnderwritingStatsComponent;
  let fixture: ComponentFixture<UnderwritingStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnderwritingStatsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnderwritingStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
