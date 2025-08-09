import { Locator, Page } from "@playwright/test";

export class DashboardPage {
  loginButton: Locator;
  optionAllowAll: Locator;
  userName: Locator;
  destinationInput: Locator;
  destinationCheckbox: Locator;
  modalConfirm: Locator;
  dateInput: Locator;
  dateFrom: Locator;
  dateTo: Locator;
  searchButton: Locator;
  expectedWarning: Locator;

  constructor(private page: Page) {
    this.loginButton = this.page.locator(
      "div[class = 'm-top-2__list'] > div:nth-child(3)"
    );
    this.optionAllowAll = this.page.locator(
      "#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll"
    );
    this.userName = this.page.locator(
      "div[class = 'm-top-2__list'] > div:nth-child(3) > div > button > span > span:nth-child(2) > span:nth-child(3)"
    );
    this.destinationInput = this.page.locator(
      "input[name = 'destination_picker']"
    );
    this.modalConfirm = this.page.locator(".sf-popup__button-primary");
    this.dateInput = this.page.locator("input[name = 'date_picker']");
    this.dateFrom = this.page.locator(
      "//div[contains(@class, 'i-calendar__month--left')]/following::span[text() = '9']"
    );
    this.dateTo = this.page.locator(
      "//div[contains(@class, 'i-calendar__month--left')]/following::span[text() = '13']"
    );
    this.searchButton = this.page.locator(".f-main-search__button");
    this.expectedWarning = this.page.locator("//div[contains(@class, 'message message--warning')]/div/div");
  }

  async getDestinationCheckboxLocator(destination) {
    return this.page.locator(
      `//span[text()='${destination}']/parent::label/parent::span/preceding-sibling::input`
    );
  }

  async tripSearch(destination: string) {
    await this.destinationInput.click();
    await (await this.getDestinationCheckboxLocator(destination)).check();
    await this.modalConfirm.click();
    await this.dateInput.click();
    await this.dateFrom.click();
    await this.dateTo.click();
    await this.modalConfirm.click();
    await this.searchButton.click();
  }
}
