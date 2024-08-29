import { TestBed } from '@angular/core/testing';

import { GamesRequestService } from './games-request.service';

describe('GamesRequestService', () => {
  let service: GamesRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamesRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
