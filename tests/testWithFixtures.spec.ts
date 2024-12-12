import { test } from '../testOptions'
import { faker } from '@faker-js/faker'

test('parametrized methods', async ({ pageManager }) => {
    const randomFullName = faker.person.fullName({sex: 'male'})
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(100)}@test.com`

    await pageManager.onFoemLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption(process.env.USERNAME, process.env.PASSWORD, 'Option 1')
    await pageManager.onFoemLayoutsPage().submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, true)
})
