import { expect, test } from '@playwright/test'

test.beforeEach(async ({page}, testInfo) => {
    await page.goto(process.env.AUTO_WAITING_URL);
    await page.getByText('Button Triggering AJAX Request').click();
    testInfo.setTimeout(testInfo.timeout + 2000)
})

test('auo waiting', async ({page}) => {
    const successButton = page.locator('.bg-success')
    // await successButton.click()

    // const textSuccess = await successButton.textContent()
    // await successButton.waitFor({state: 'attached'})
    // const textSuccess = await successButton.allTextContents()
    // expect(textSuccess).toContain('Data loaded with AJAX get request.')
    await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})

})

test('alternative waits', async({page}) => {
    const successButton = page.locator('.bg-success') 

    // wait for element
    // await page.waitForSelector('.bg-success')

    // wait for particular response
    // await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    // waut for network calls to be completed - [NOT Recommended]
    await page.waitForLoadState('networkidle')


    const textSuccess = await successButton.allTextContents()
    expect (textSuccess).toContain('Data loaded with AJAX get request.')
})

test('timeouts', async ({page}) => {
    // test.setTimeout(10000)
    // multiplied by 3
    test.slow()
    const successButton = page.locator('.bg-success')
    await successButton. click({timeout: 16000})
})