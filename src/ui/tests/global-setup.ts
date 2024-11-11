import { test } from '@playwright/test';
import * as allure from "allure-js-commons";
import * as path from 'path';

test.afterEach(async ({ page }, testInfo) => {
    await allure.step("Save screenshot for failed test case", async () => {
        if (testInfo.status === 'failed') {
            const screenshotPath = path.join('test-results', `${testInfo.title.replace(/\s+/g, '_')}-fail.png`);
            await page.screenshot({ path: screenshotPath });
        }
})
})
