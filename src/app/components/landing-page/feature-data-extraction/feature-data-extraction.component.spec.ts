import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureDataExtractionComponent } from './feature-data-extraction.component';

describe('FeatureDataExtractionComponent', () => {
  let component: FeatureDataExtractionComponent;
  let fixture: ComponentFixture<FeatureDataExtractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatureDataExtractionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureDataExtractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
