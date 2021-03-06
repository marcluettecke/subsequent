import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RotatingBodyComponent } from './rotating-body.component';

describe('RotatingBodyComponent', () => {
  let component: RotatingBodyComponent;
  let fixture: ComponentFixture<RotatingBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RotatingBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RotatingBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
