import { TestBed } from '@angular/core/testing';

import { AuthBlogService } from './auth-blog.service';

describe('AuthBlogService', () => {
  let service: AuthBlogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthBlogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
