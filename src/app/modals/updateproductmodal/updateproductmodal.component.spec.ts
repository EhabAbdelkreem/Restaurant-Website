import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateproductmodalComponent } from './updateproductmodal.component';

describe('UpdateproductmodalComponent', () => {
  let component: UpdateproductmodalComponent;
  let fixture: ComponentFixture<UpdateproductmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateproductmodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateproductmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
