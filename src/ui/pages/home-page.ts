import { type Locator, type Page } from '@playwright/test';
import * as allure from "allure-js-commons";

export class HomePage {
  readonly page: Page;
  readonly searchInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByTestId('search-input');
  }

  async goto() {
    await allure.step("Go to Main Page", async () => {
      await this.page.goto('https://www.airalo.com');
    })
  }

  async getLocatorByCountryName(country: string) {
    return `data-testid=${country}-name`;
  }

  async searchDataPack(country: string) {
    await allure.step(`Search for ${country} and select result`, async () => {
      await this.searchInput.fill(country)
      const resultLocator = await this.getLocatorByCountryName(country);
      await this.page.locator(resultLocator).click()
  })
}

}