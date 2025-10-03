import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatLoading } from './chat-loading';

describe('ChatLoading', () => {
  let component: ChatLoading;
  let fixture: ComponentFixture<ChatLoading>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatLoading]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatLoading);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
