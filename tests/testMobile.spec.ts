import { expect, test } from '@playwright/test'


test('input field @block', async ({page}, testInfo) => {
 page.locator('nb-card', {hasText: 'Using the Grid'})
    await page.goto('/', { waitUntil: 'domcontentloaded' })

    if(testInfo.project.name === 'mobile') {
        await page.locator('.sidebar-toggle').click()
    }

    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
    if(testInfo.project.name === 'mobile') {
        await page.locator('.sidebar-toggle').click()
    }
    const usingTheGridForm = page.locator('nb-card', {hasText: 'Using the Grid'})

    const usingTheGridInput = usingTheGridForm.getByRole('textbox', {name: 'Email'})
    await usingTheGridInput.fill('test@test.com')
    const inputValue = await usingTheGridInput.inputValue()
    
    expect(inputValue).toEqual('test@test.com')
    await expect(usingTheGridInput).toHaveValue('test@test.com')
})