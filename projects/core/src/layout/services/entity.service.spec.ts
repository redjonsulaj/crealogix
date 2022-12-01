import { TestBed } from '@angular/core/testing';

import { EntityService } from './entity.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('EntityService', () => {
  let service: EntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(EntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
