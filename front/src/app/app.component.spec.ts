import { TestBed, async } from '@angular/core/testing';

import { BaseTestingModule } from './testing.module';

import { AppComponent } from './app.component';

import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoNewComponent } from './todo-new/todo-new.component';
import { TodoComponent } from './todo/todo.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BaseTestingModule],
      declarations: [AppComponent, TodoListComponent, TodoNewComponent, TodoComponent],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
