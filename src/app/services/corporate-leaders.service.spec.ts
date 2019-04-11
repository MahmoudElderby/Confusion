import { TestBed } from '@angular/core/testing';

import { CorporateLeadersService } from './corporate-leaders.service';

describe('CorporateLeadersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CorporateLeadersService = TestBed.get(CorporateLeadersService);
    expect(service).toBeTruthy();
  });
});
