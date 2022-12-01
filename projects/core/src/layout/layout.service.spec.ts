import { TestBed } from '@angular/core/testing';

import { LayoutService } from './layout.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('LayoutService', () => {
  let service: LayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(LayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
