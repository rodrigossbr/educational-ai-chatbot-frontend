import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardChatMsgs } from './card-chat-msgs';

describe('CardChatMsgs', () => {
  let component: CardChatMsgs;
  let fixture: ComponentFixture<CardChatMsgs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardChatMsgs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardChatMsgs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
