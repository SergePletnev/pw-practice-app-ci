import { test as base } from '@playwright/test'
import { PageManager } from './page-objects/pageManager'

export type TestOptions = {
    globalsQaURL: string,
    formLayoutsForm: string,
    pageManager: PageManager
}

export const test = base.extend<TestOptions>({
    globalsQaURL: ['', {option: true}],

    formLayoutsForm: async ({ page }, use) => {
        await page.goto('/')
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
        await use('')

        console.log('Tear down')
    },

    pageManager: [async({page, formLayoutsForm}, use) => {
        const pm = new PageManager(page)
        await use(pm)
    }, {auto: true}]
})
