import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParserParametersComponent } from './parser-parameters.component';

describe('ParserParametersComponent', () => {
  let component: ParserParametersComponent;
  let fixture: ComponentFixture<ParserParametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParserParametersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParserParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
