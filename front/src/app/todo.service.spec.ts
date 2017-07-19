import { TestBed, inject } from '@angular/core/testing';

import { BaseTestingModule } from './testing.module';

import { TodoService } from './todo.service';

describe('TodoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BaseTestingModule],
      providers: [TodoService],
    });
  });

  it('should be created', inject([TodoService], (service: TodoService) => {
    expect(service).toBeTruthy();
  }));
});
