import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatUserMsg } from './chat-user-msg';

describe('ChatUserMsg', () => {
  let component: ChatUserMsg;
  let fixture: ComponentFixture<ChatUserMsg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatUserMsg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatUserMsg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
