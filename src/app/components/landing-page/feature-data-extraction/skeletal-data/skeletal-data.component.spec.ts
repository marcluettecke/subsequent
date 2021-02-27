import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletalDataComponent } from './skeletal-data.component';

describe('SkeletalDataComponent', () => {
  let component: SkeletalDataComponent;
  let fixture: ComponentFixture<SkeletalDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletalDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkeletalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
