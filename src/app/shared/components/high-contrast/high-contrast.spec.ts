import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighContrast } from './high-contrast';

describe('HighContrast', () => {
  let component: HighContrast;
  let fixture: ComponentFixture<HighContrast>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighContrast]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HighContrast);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
