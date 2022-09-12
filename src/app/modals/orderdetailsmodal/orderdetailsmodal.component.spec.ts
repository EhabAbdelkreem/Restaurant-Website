import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderdetailsmodalComponent } from './orderdetailsmodal.component';

describe('OrderdetailsmodalComponent', () => {
  let component: OrderdetailsmodalComponent;
  let fixture: ComponentFixture<OrderdetailsmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderdetailsmodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderdetailsmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
