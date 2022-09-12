import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderesmodalComponent } from './orderesmodal.component';

describe('OrderesmodalComponent', () => {
  let component: OrderesmodalComponent;
  let fixture: ComponentFixture<OrderesmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderesmodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderesmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
