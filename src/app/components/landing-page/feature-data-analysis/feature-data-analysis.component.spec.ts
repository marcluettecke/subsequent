import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureDataAnalysisComponent } from './feature-data-analysis.component';

describe('FeatureDataAnalysisComponent', () => {
  let component: FeatureDataAnalysisComponent;
  let fixture: ComponentFixture<FeatureDataAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatureDataAnalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureDataAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
