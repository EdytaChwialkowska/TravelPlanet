import { Locator, Page } from "@playwright/test";

export class LoginPage {
    loginEmail: Locator;
    loginPassword: Locator;
    loginSubmit: Locator;

  constructor(private page: Page) {
    this.loginEmail =  this.page.locator("#login_email");
    this.loginPassword = this.page.locator("#login_password");
    this.loginSubmit = this.page.locator("#login_submit");
  }

  async login(loginEmail: string, loginPassword: string): Promise<void> {
    await this.loginEmail.fill(loginEmail);
    await this.loginPassword.fill(loginPassword);
    await this.loginSubmit.click();
  }
}
