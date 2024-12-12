import { expect, test } from '@playwright/test'

test('Applications test', async ({page}) => {
    await page.goto('/')

    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})
