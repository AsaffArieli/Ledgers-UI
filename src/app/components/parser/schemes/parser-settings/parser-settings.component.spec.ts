import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParserSettingsComponent } from './parser-settings.component';

describe('ParserSettingsComponent', () => {
  let component: ParserSettingsComponent;
  let fixture: ComponentFixture<ParserSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParserSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
