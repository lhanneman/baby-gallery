import { BabyGalleryAppPage } from './app.po';

describe('baby-gallery-app App', () => {
  let page: BabyGalleryAppPage;

  beforeEach(() => {
    page = new BabyGalleryAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
