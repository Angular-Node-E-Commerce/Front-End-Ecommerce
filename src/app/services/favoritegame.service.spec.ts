import { TestBed } from '@angular/core/testing';

import { FavoritegameService } from './favoritegame.service';

describe('FavoritegameService', () => {
  let service: FavoritegameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritegameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
