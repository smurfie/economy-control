import { browser, by, element, ElementFinder } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  getCreateButton(): ElementFinder {
    return element(by.css('app-root form button'));
  }

  async fillUsernameInput(username: string): Promise<void> {
    return element(by.css('app-root form input')).sendKeys(username);
  }
}
