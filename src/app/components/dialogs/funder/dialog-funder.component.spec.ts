import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFunderComponent } from './dialog-funder.component';

describe('DialogFunderComponent', () => {
  let component: DialogFunderComponent;
  let fixture: ComponentFixture<DialogFunderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogFunderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogFunderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
