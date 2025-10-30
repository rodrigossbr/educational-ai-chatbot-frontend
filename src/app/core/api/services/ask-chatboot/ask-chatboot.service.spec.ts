import { TestBed } from '@angular/core/testing';

import { AskChatbootService } from './ask-chatboot.service';

describe('AskChatboot', () => {
  let service: AskChatbootService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AskChatbootService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
