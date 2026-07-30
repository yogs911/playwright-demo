import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base.page';

export class EmployeePage extends BasePage {
  // Search form
  readonly employeeNameInput: Locator;
  readonly employeeIdInput: Locator;
  readonly searchButton: Locator;
  readonly resetButton: Locator;
  readonly noRecordsFound: Locator;

  // List
  readonly addButton: Locator;
  readonly tableRows: Locator;
  readonly recordCount: Locator;

  // Add employee form
  readonly firstNameInput: Locator;
  readonly middleNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly employeeIdField: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    super(page);

    // Search
    this.employeeNameInput = page.getByRole('textbox', { name: 'Type for hints...' }).first();
    this.employeeIdInput = page.getByRole('textbox').nth(2);
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.resetButton = page.getByRole('button', { name: 'Reset' });
    this.noRecordsFound = page.locator('#oxd-toaster_1').getByText('No Records Found')

    // List
    this.addButton = page.locator('button.oxd-button--secondary', { hasText: 'Add' });
    this.tableRows = page.getByRole('row'); // locator('.oxd-table-body .oxd-table-row');
    this.recordCount = page.locator('.orangehrm-horizontal-padding span').first();

    // Add form
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.middleNameInput = page.getByPlaceholder('Middle Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.employeeIdField = page.locator('input.oxd-input').nth(1);
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
  }

  async goto(): Promise<void> {
    await this.navigate(
      `${process.env.ORANGEHRM_URL}/web/index.php/pim/viewEmployeeList`
    );
    await this.waitForPageLoad();
  }

  async clickAddEmployee(): Promise<void> {
    await this.addButton.click();
    await this.waitForPageLoad();
  }

  async addEmployee(firstName: string, lastName: string, middleName?: string): Promise<string> {
    await this.firstNameInput.fill(firstName);
    if (middleName) await this.middleNameInput.fill(middleName);
    await this.lastNameInput.fill(lastName);

    // Capture auto-generated employee ID before saving
    const employeeId = await this.employeeIdField.inputValue();

    await this.saveButton.click();
    await this.waitForURL(/viewPersonalDetails/);

    return employeeId;
  }

  async searchByName(name: string): Promise<void> {
    await this.employeeNameInput.fill(name);
    await this.searchButton.click();
    await this.waitForPageLoad();
  }

  async getTableRowCount(): Promise<number> {
    return this.tableRows.count();
  }

  async getRecordCountText(): Promise<string> {
    return this.recordCount.innerText();
  }

  async deleteEmployeeAtRow(index: number): Promise<void> {
    await this.tableRows.nth(index)
      .locator('.oxd-icon-button.oxd-table-cell-action-space').last().click();
    await this.page.getByRole('button', { name: 'Yes, Delete' }).click();
    await this.waitForPageLoad();
  }

  async clickEditAtRow(index: number): Promise<void> {
    await this.tableRows.nth(index)
      .locator('.oxd-icon-button.oxd-table-cell-action-space').first().click();
    await this.waitForPageLoad();
  }
}