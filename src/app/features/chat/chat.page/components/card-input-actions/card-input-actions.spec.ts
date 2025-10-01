import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardInputActions } from './card-input-actions';

describe('CardInputActions', () => {
  let component: CardInputActions;
  let fixture: ComponentFixture<CardInputActions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardInputActions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardInputActions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
