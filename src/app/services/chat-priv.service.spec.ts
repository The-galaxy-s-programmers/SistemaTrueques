import { TestBed } from '@angular/core/testing';

import { ChatPrivService } from './chat-priv.service';

describe('ChatPrivService', () => {
  let service: ChatPrivService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatPrivService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
