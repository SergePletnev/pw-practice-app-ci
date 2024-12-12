import { Locator, Page, expect } from "@playwright/test";
import { HelperBase } from "./helperBase";


export class DatePickerPage extends HelperBase {

    constructor(page: Page) {
        super(page)
    }

    async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number) {
        const calendarInputField = this.page.getByPlaceholder('Form Picker')
        await calendarInputField.click()
        const expectedFormattedDate = await this.selectDateInTheCalendar(numberOfDaysFromToday)

        await expect(calendarInputField).toHaveValue(expectedFormattedDate)
    }

    async selectDateOickerWithRange(startDayFromToday: number, endDayFromToday: number) {
        const calendarInputField = this.page.getByPlaceholder('Range Picker')
        await calendarInputField.click()

        const expectedFormattedDateStart = await this.selectDateInTheCalendar(startDayFromToday)
        const expectedFormattedDateEnd = await this.selectDateInTheCalendar(endDayFromToday)

        const expectedFormattedDate = `${expectedFormattedDateStart} - ${expectedFormattedDateEnd}`
        await expect(calendarInputField).toHaveValue(expectedFormattedDate)
    }

    private async selectDateInTheCalendar(numberOfDaysFromToday: number) {
        let date = new Date()
        date.setDate(date.getDate() + numberOfDaysFromToday)
        const expectedDate = date.getDate().toString()
        const expectedFormattedDate = date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        }).toString()

        let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        let expectedMonthAndYear = date.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric'
        }).toString()
        expectedMonthAndYear = ` ${expectedMonthAndYear} `
        while(!calendarMonthAndYear.includes(expectedMonthAndYear)) {
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
            calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        }
        await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate, {exact: true}).click()
        return expectedFormattedDate
    }
}