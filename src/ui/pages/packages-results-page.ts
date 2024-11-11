import { type Locator, type Page } from '@playwright/test';
import * as allure from "allure-js-commons";

export class PackagesResultsPage {
  readonly page: Page;
  readonly buyNowButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.buyNowButton = page.getByTestId('esim-button');
  }

  async clickOnFirstBuyNowButton() {
    await allure.step("Click on First Buy Now button", async () => {
      await this.buyNowButton.first().click()
  })
}

}