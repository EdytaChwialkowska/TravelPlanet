import { test, expect, type Page } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { DashboardPage } from "../pages/dashboard.page";
import { loginData } from "../test-data/login.data";

test.describe("User log in to traval planet", () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);

    await page.goto('/');
    await dashboardPage.optionAllowAll.click();
  });

  test("successfull log in with correct credentials", async ({ page }) => {
    // Arrange
    const loginEmail = loginData.loginEmail;
    const loginPassword = loginData.loginPassword;
    const expectedUserName = String(process.env.EXPEPECTED_USER_NAME);

    // Act
    await dashboardPage.loginButton.click();
    await loginPage.login(loginEmail, loginPassword)

    // Assert
    await expect(dashboardPage.userName).toHaveText(expectedUserName);
  });
});
