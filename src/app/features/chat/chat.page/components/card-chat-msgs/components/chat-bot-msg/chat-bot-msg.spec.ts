import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBotMsg } from './chat-bot-msg';

describe('ChatMsg', () => {
  let component: ChatBotMsg;
  let fixture: ComponentFixture<ChatBotMsg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatBotMsg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatBotMsg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
