import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOwnerComponent } from './dialog-owner.component';

describe('DialogOwnerComponent', () => {
  let component: DialogOwnerComponent;
  let fixture: ComponentFixture<DialogOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogOwnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
