import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogKeyComponent } from './dialog-key.component';

describe('DialogKeyComponent', () => {
  let component: DialogKeyComponent;
  let fixture: ComponentFixture<DialogKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogKeyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
