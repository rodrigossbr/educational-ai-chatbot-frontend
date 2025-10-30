import { TestBed } from '@angular/core/testing';

import { ChatbootFeedbackService } from './chatboot-feedback.service';

describe('ChatbootFeedbackService', () => {
  let service: ChatbootFeedbackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatbootFeedbackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
