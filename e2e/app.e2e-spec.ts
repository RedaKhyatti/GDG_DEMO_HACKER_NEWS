import { HackernewsAppPage } from './app.po';

describe('hackernews-app App', () => {
  let page: HackernewsAppPage;

  beforeEach(() => {
    page = new HackernewsAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
