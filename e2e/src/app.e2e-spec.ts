import { $, browser, By, ExpectedConditions, logging } from 'protractor';
import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should login', async () => {
    await page.navigateTo();
    await page.fillUsernameInput('test1');
    await browser.wait(ExpectedConditions.elementToBeClickable(page.getCreateButton()), 500);
    await page.getCreateButton().click();
    await browser.wait(ExpectedConditions.urlContains('home'));
    expect(await browser.getCurrentUrl()).toContain('home');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
  });
});
