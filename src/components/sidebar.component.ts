import { Page, Locator } from '@playwright/test';

export class SidebarComponent {
  readonly adminLink: Locator;
  readonly pimLink: Locator;
  readonly leaveLink: Locator;
  readonly timeLink: Locator;
  readonly recruitmentLink: Locator;
  readonly myInfoLink: Locator;
  readonly performanceLink: Locator;
  readonly dashboardLink: Locator;
  readonly directoryLink: Locator;

  constructor(private readonly page: Page) {
    this.adminLink = page.getByRole('link', { name: 'Admin' });
    this.pimLink = page.getByRole('link', { name: 'PIM' });
    this.leaveLink = page.getByRole('link', { name: 'Leave' });
    this.timeLink = page.getByRole('link', { name: 'Time' });
    this.recruitmentLink = page.getByRole('link', { name: 'Recruitment' });
    this.myInfoLink = page.getByRole('link', { name: 'My Info' });
    this.performanceLink = page.getByRole('link', { name: 'Performance' });
    this.dashboardLink = page.getByRole('link', { name: 'Dashboard' });
    this.directoryLink = page.getByRole('link', { name: 'Directory' });
  }

  async navigateTo(module: 'Admin' | 'PIM' | 'Leave' | 'Time' | 'Recruitment' | 'Dashboard'): Promise<void> {
    const linkMap = {
      Admin: this.adminLink,
      PIM: this.pimLink,
      Leave: this.leaveLink,
      Time: this.timeLink,
      Recruitment: this.recruitmentLink,
      Dashboard: this.dashboardLink,
    };
    await linkMap[module].click();
  }
}