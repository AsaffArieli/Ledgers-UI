import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParserSchemesComponent } from './parser-schemes.component';

describe('ParserSchemesComponent', () => {
  let component: ParserSchemesComponent;
  let fixture: ComponentFixture<ParserSchemesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParserSchemesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParserSchemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
