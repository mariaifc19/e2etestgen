import { type Locator, type Page } from '@playwright/test';

export class PackageDetailPage {
  readonly page: Page;
  readonly simDetailHeader: Locator;
  readonly operatorTitle: Locator;
  readonly coverageValue: Locator;
  readonly dataValue: Locator;
  readonly validityValue: Locator;
  readonly priceValue: Locator;

  constructor(page: Page) {
    this.page = page;
    this.simDetailHeader = page.locator('data-testid=sim-detail-header')
    this.operatorTitle = this.simDetailHeader.locator('data-testid=sim-detail-operator-title')
    this.coverageValue = this.simDetailHeader.locator('data-testid=COVERAGE-value')
    this.dataValue = this.simDetailHeader.locator('data-testid=DATA-value')
    this.validityValue = this.simDetailHeader.locator('data-testid=VALIDITY-value')
    this.priceValue = this.simDetailHeader.locator('data-testid=PRICE-value')

  }

}