import { expect, test } from '@playwright/test'

test.beforeEach(async ({page}) => {
    await page.goto('/')
})

test.describe('Form Layouts page', () => {
    // test.describe.configure({retries: 2})

    let usingTheGridForm
    test.beforeEach(async ({page}) => {
        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
        usingTheGridForm = page.locator('nb-card', {hasText: 'Using the Grid'})
    }) 

    test('input field @block', async ({page}, testInfo) => {
        if(testInfo.retry) {
            // do something - clean up database or whatever
        }
        const usingTheGridInput = usingTheGridForm.getByRole('textbox', {name: 'Email'})

        await usingTheGridInput.fill('test@test.com')
        // await usingTheGridInput.clear()
        // await usingTheGridInput.pressSequentially('test2@test.com', {delay: 700})

        // generic assertion
        const inputValue = await usingTheGridInput.inputValue()
        expect(inputValue).toEqual('test@test.com')

        // locator assertion
        await expect(usingTheGridInput).toHaveValue('test@test.com')
    })

    test.only('radio button', async ({page}) => {
        // await usingTheGridForm.getByLabel('Option 1').check({force: true})
        const radio1 = usingTheGridForm.getByRole('radio', {name: 'Option 1'})
        const radio2 = usingTheGridForm.getByRole('radio', {name: 'Option 2'})
        await radio1.check({force: true})

        const radioStatus = await  radio1.isChecked()
        await expect(usingTheGridForm).toHaveScreenshot()
        
        // expect(radioStatus).toBeTruthy()  
        // await expect(radio1).toBeChecked() 

        // await radio2.check({force: true})
        // await expect(radio1).not.toBeChecked()
        // await expect(radio2).toBeChecked()
    })
})

test('checkboxes ', async ({page}) => {
    await page.getByText('Modal & Overlays').click();
    await page.getByText('Toastr').click();

    await page.getByRole('checkbox', {name: 'Hide on click'}).uncheck({force: true})
    await page.getByRole('checkbox', {name: 'Prevent arising of duplicate toast'}).check({force: true})

    const allBoxes = page.getByRole('checkbox')
    for(const box of await allBoxes.all()) {
        await box.uncheck({force: true})
        expect(await box.isChecked()).toBeFalsy()
    }
})

test('lists and dropdowns', async ({page}) => {
    const dropDownMenu = page.locator('ngx-header nb-select')
    await dropDownMenu.click()

    // page.getByRole('list')  // when the list has UL tag
    // page.getByRole('listitem')  // when the list has LI tag

    // const optionList = page.getByRole('list').locator('nb-option')
    const optionList = page.locator('nb-option-list nb-option')
    await expect(optionList).toHaveText(['Light', 'Dark', 'Cosmic', 'Corporate'])
    await optionList.filter({hasText: 'Dark'}).click()

    const header = page.locator('nb-layout-header')
    await expect(header).toHaveCSS('background-color', 'rgb(34, 43, 69)')

    const colors = {
        'Light': 'rgb(255, 255, 255)',
        'Dark': 'rgb(34, 43, 69)',
        'Cosmic': 'rgb(50, 50, 89)',
        'Corporate': 'rgb(255, 255, 255)',
    }

    for(const color in colors) {
        await dropDownMenu.click()
        await optionList.filter({hasText: color}).click()
        await expect(header).toHaveCSS('background-color', colors[color])
    }
})
 

test('tooltip', async ({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Tooltip').click()

    const toolTipCard = page.locator('nb-card', {hasText: 'Tooltip Placements'})
    await toolTipCard.getByRole('button', {name: 'Top'}).hover()

    // page.getByRole('tooltip') // if a role is tooltip creator
    const toolTip = page.locator('nb-tooltip')
    await expect(toolTip).toHaveText('This is a tooltip')
})

test('dialog boxes', async ({page }) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table ').click()

    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?')
        dialog.accept()
    })

    await page.getByRole('table').locator('tr', {hasText: 'mdo@gmail.com'})
         .locator('.nb-trash').click()

    await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com')
})

test('web tables', async ({page }) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table ').click()

    // 1st scenario
    const targetRow = page.getByRole('row', {name: 'twitter@outlook.com'})
    await targetRow.locator('.nb-edit').click()
    const ageInput = page.locator('input-editor').getByPlaceholder('Age')
    await ageInput.clear()
    await ageInput.fill('35')
    await page.locator('.nb-checkmark').click()

    // 2nd scenario
    await page.locator('.ng2-smart-pagination-nav').getByText('2').click()
    const targetRoleById = page.getByRole('row', {name: '11'}).filter({has: page.locator('td').nth(1).getByText('11')})
    // const targetRoleById = page.getByRole('row').filter({has: page.locator('td').nth(1).getByText('11')})
    await targetRoleById.locator('.nb-edit').click()
    const emailInput = page.locator('input-editor').getByPlaceholder('E-mail')
    await emailInput.clear()
    await emailInput.fill('test@test.com')
    await page.locator('.nb-checkmark').click()
    await expect(targetRoleById.locator('td').nth(5)).toHaveText('test@test.com')

    // test filter of the table
    const ages = ['20', '30', '40', '200']

    for(let age of ages) {
        const ageFilterInput = page.locator('input-filter').getByPlaceholder('Age')
        await ageFilterInput.clear()
        await ageFilterInput.fill(age)

        await page.waitForTimeout(1000)

        const ageRows = page.locator('tbody tr')

        for(let row of await ageRows.all()) {
            const ageValue = await row.locator('td').last().textContent()
            if(age === '200') {
                expect(await page.getByRole('table').textContent()).toContain('No data found')
            } else {
                expect(ageValue).toEqual(age)
            }
        }
    }
})

test('date picker', async ({page}) => {
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()

    const calendarInputField = page.getByPlaceholder('Form Picker')
    await calendarInputField.click()

    let date = new Date()
    date.setDate(date.getDate() + 501)
    const expectedDate = date.getDate().toString()
    const expectedFormattedDate = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    }).toString()

    let calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    let expectedMonthAndYear = date.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
    }).toString()
    expectedMonthAndYear = ` ${expectedMonthAndYear} `
    while(!calendarMonthAndYear.includes(expectedMonthAndYear)) {
        await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
        calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    }


    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact: true}).click()
    await expect(calendarInputField).toHaveValue(expectedFormattedDate)
})

test('slider', async ({page}) => {
     // Update attribute
    //  const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
    //  await tempGauge.evaluate(node => {
    //     node.setAttribute('cx', '232.630'),
    //     node.setAttribute('cy', '232.630')
    //  })
    //  await tempGauge.click()

     // Mouse move
     const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
     await tempBox.scrollIntoViewIfNeeded()

     const box = await tempBox.boundingBox()
     const x = box.x + box.width / 2
     const y = box.y + box.height / 2
     await page.mouse.move(x, y)
     await page.mouse.down()
     await page.mouse.move(x + 100, y)
     await page.mouse.move(x + 100, y + 150)
     await page.mouse.up()
     await expect(tempBox).toContainText('30')
})
