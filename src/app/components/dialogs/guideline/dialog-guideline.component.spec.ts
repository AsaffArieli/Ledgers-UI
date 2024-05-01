import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGuidelineComponent } from './dialog-guideline.component';

describe('DialogGuidelineComponent', () => {
  let component: DialogGuidelineComponent;
  let fixture: ComponentFixture<DialogGuidelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogGuidelineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogGuidelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
