import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.locator('.oxd-alert-content-text', { hasText: 'Invalid credentials' });
  }

  async goto(): Promise<void> {
    await this.navigate(`${process.env.ORANGEHRM_URL}/web/index.php/auth/login`);
    await this.waitForPageLoad();
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async loginAsAdmin(): Promise<void> {
    await this.login(
      process.env.ORANGEHRM_USERNAME || 'Admin',
      process.env.ORANGEHRM_PASSWORD || 'admin123'
    );
  }
}