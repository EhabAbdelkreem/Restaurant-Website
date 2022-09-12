import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumptionmodalComponent } from './consumptionmodal.component';

describe('ConsumptionmodalComponent', () => {
  let component: ConsumptionmodalComponent;
  let fixture: ComponentFixture<ConsumptionmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsumptionmodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumptionmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
