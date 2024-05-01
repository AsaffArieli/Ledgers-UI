import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateChartComponent } from './template-chart.component';

describe('TemplateChartComponent', () => {
  let component: TemplateChartComponent;
  let fixture: ComponentFixture<TemplateChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemplateChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
