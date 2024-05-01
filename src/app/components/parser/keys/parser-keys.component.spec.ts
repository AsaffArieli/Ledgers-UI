import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParserKeysComponent } from './parser-keys.component';

describe('ParserKeysComponent', () => {
  let component: ParserKeysComponent;
  let fixture: ComponentFixture<ParserKeysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParserKeysComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParserKeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
