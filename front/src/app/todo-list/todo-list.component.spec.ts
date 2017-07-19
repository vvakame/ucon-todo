import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseTestingModule } from '../testing.module';

import { TodoListComponent } from './todo-list.component';
import { TodoComponent } from '../todo/todo.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BaseTestingModule],
      declarations: [TodoListComponent, TodoComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
