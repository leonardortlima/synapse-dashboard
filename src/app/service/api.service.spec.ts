import { TestBed } from '@angular/core/testing';

import { SpreadSheetService } from './api.service';

describe('SpreadSheetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpreadSheetService = TestBed.get(SpreadSheetService);
    expect(service).toBeTruthy();
  });
});
