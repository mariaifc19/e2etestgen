import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { PackagesResultsPage } from '../pages/packages-results-page';
import { PackageDetailPage } from '../pages/package-detail-page';
import { loadTestData } from '../utils/test-data-utils.ts';

const SEARCH_INPUT_JAPAN_COUNTRY= 'Japan'

test.describe('Package Details', {tag: '@sanity'},  () => {  
    test('I expect to see title, coverage, data, validity and price', async ({page}) => {
        const homePage = new HomePage(page);
        const packagesResultsPage = new PackagesResultsPage(page)
        const packageDetailPage = new PackageDetailPage(page)

        const preferredPackageTestData = loadTestData('preferred-package-test-data.json');
        const japanTestData = preferredPackageTestData.Japan;

        await homePage.goto()
        await homePage.searchDataPack(SEARCH_INPUT_JAPAN_COUNTRY)
        await packagesResultsPage.clickOnFirstBuyNowButton()

        await expect(packageDetailPage.operatorTitle).toHaveText(japanTestData.operadorTitle)    
        await expect(packageDetailPage.coverageValue).toHaveText(japanTestData.coverage)
        await expect(packageDetailPage.dataValue).toHaveText(japanTestData.data)
        await expect(packageDetailPage.validityValue).toHaveText(japanTestData.validity)
        await expect(packageDetailPage.priceValue).toContainText(japanTestData.priceValue)
    })
})    