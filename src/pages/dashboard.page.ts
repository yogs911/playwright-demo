import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { SidebarComponent } from '../components/sidebar.component';

export class DashboardPage extends BasePage {
  readonly sidebar: SidebarComponent;
  readonly header: Locator;
  readonly timeAtWork: Locator;
  readonly myActions: Locator;
  readonly quickLaunch: Locator;

  constructor(page: Page) {
    super(page);
    this.sidebar = new SidebarComponent(page);
    this.header = page.getByRole('heading', { name: 'Dashboard' });
    this.timeAtWork = page.getByText('Time at Work');
    this.myActions = page.locator('div').filter({ hasText: /^My Actions$/ }).first();
    this.quickLaunch = page.locator('div').filter({ hasText: /^Quick Launch$/ }).first();
  }

  async goto(): Promise<void> {
    await this.navigate(`${process.env.ORANGEHRM_URL}/web/index.php/dashboard/index`);
    await this.waitForPageLoad();
  }
}