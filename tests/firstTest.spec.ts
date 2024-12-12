import { expect, test } from '@playwright/test'
import { Browser } from 'leaflet';

test.beforeEach(async ({page}) => {
    await page.goto('/');
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
})

test('selectors', async ({ page, browser }) => {
    page.locator('#inputEmail');
    await page.getByRole('button', {name: 'Sign in'}).first().click()
    const myPage = (await browser.newContext()).newPage();
})

test('extracting values', async ({page}) => {
    const basicForm =  page.locator('nb-card').filter({hasText: 'Basic form'})
    const buttonText  = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')

    // all radio buttons
    const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtonsLabels).toContain('Option 1')

    // input values
    const emailField = basicForm.getByRole('textbox', {name: 'Email'})
    await emailField.fill('test@test.com')
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('test@test.com')

    // attribute value
    const placeholderValue = await emailField.getAttribute('placeholder')
    expect(placeholderValue).toEqual('Email')
})


test('assertions', async ({page}) => {
    // General assertion
    const value = 5
    expect(value).toEqual(5)

    const basicFormButton =  page.locator('nb-card').filter({hasText: 'Basic form'}).locator('button')
    const buttonText  = await basicFormButton.textContent()
    expect(buttonText).toEqual('Submit')

    // Locator assertion
    await expect(basicFormButton).toHaveText('Submit')

    // Soft assertion
    await expect.soft(basicFormButton).toHaveText('Submit5')
    await basicFormButton.click()

})
