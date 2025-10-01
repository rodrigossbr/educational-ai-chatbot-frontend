import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardModeActions } from './card-mode-actions';

describe('CardModeActions', () => {
  let component: CardModeActions;
  let fixture: ComponentFixture<CardModeActions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardModeActions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardModeActions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
