import { UconTodoPage } from './app.po';

describe('ucon-todo App', () => {
  let page: UconTodoPage;

  beforeEach(() => {
    page = new UconTodoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
