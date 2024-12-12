import { expect } from '@playwright/test'
import { test } from '../testOptions'

test('drag and drop with iFrame', async ({page, globalsQaURL}) => {
    await page.context().addCookies([
        {
          name: 'FCCDCF', 
          value: '%5Bnull%2Cnull%2Cnull%2C%5B%22CQH0nwAQH0nwAEsACBENBPFoAP_gAEPgABBoINJD7C7FbSFCwH5zaLsAMAhHRsAAQoQAAASBAmABQAKQIAQCgkAQFASgBAACAAAAICRBIQIECAAAAUAAQAAAAAAEAAAAAAAIIAAAgAEAAAAIAAACAIAAEAAIAAAAEAAAmAgAAIIACAAAgAAAAAAAAAAAAAAAAgCAAAAAAAAAAAAAAAAAAQOhSD2F2K2kKFkPCmwXYAYBCujYAAhQgAAAkCBMACgAUgQAgFJIAgCIFAAAAAAAAAQEiCQAAQABAAAIACgAAAAAAIAAAAAAAQQAABAAIAAAAAAAAEAQAAIAAQAAAAIAABEhCAAQQAEAAAAAAAQAAAAAAAAAAABAAA%22%2C%222~70.89.93.108.122.149.196.236.259.311.313.323.358.415.449.486.494.495.540.574.609.864.981.1029.1048.1051.1095.1097.1126.1205.1276.1301.1365.1415.1449.1514.1570.1577.1598.1651.1716.1735.1753.1765.1870.1878.1889.1958.1960.2072.2253.2299.2373.2415.2506.2526.2531.2568.2571.2575.2624.2677.2778~dv.%22%2C%223A94BB68-5C6A-4545-A4A3-F9ACCDCFAAA6%22%5D%5D', // Replace with the cookie value that grants consent
          domain: 'www.globalsqa.com',
          path: '/',
        }
      ])
    await page.goto(globalsQaURL)

    // await page.waitForSelector('[rel-title="Photo Manager"] iframe') // Wait for the iframe to load
    const frame = await page.frameLocator('[rel-title="Photo Manager"] iframe')
    await frame.locator('li', { hasText: 'High Tatras 2' }).dragTo(frame.locator('#trash'))

    // more precise control
    await frame.locator('li', { hasText: 'High Tatras 4' }).hover()
    await page.mouse.down()
    await frame.locator('#trash').hover()
    await page.mouse.up()

    await expect(frame.locator('#trash li h5')).toHaveText(['High Tatras 2', 'High Tatras 4'])
})