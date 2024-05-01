import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMerchantComponent } from './dialog-merchant.component';

describe('DialogMerchantComponent', () => {
  let component: DialogMerchantComponent;
  let fixture: ComponentFixture<DialogMerchantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogMerchantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
