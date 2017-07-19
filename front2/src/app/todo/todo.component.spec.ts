import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { Response, ResponseOptions } from '@angular/http';

import { BaseTestingModule } from '../testing.module';

import { Todo } from '../model';

import { TodoService } from '../todo.service';
import { TodoComponent } from './todo.component';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BaseTestingModule],
      declarations: [TodoComponent],
    })
      .compileComponents();
  }));

  beforeEach(inject([MockBackend], (backend: MockBackend) => {
    const response = new Response(new ResponseOptions({
      body: JSON.stringify({ data: {} }),
    }));
    backend.connections.subscribe(
      (conn: MockConnection) => conn.mockRespond(response)
    );

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
