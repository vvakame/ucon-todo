import { TestBed, inject } from '@angular/core/testing';

import { BaseTestingModule } from './testing.module';

import { UserService } from './user.service';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BaseTestingModule],
      providers: [UserService],
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
