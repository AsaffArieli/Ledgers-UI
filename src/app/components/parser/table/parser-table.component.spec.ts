import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParserTableComponent } from './parser-table.component';

describe('ParserTableComponent', () => {
  let component: ParserTableComponent;
  let fixture: ComponentFixture<ParserTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParserTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParserTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
