import { test, expect, type Page } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { DashboardPage } from "../pages/dashboard.page";
import { loginData } from "../test-data/login.data";

test.describe("User seraches trip", () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;
  test.beforeEach(async ({ page }) => {
    const loginEmail = loginData.loginEmail;
    const loginPassword = loginData.loginPassword;

    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);

    await page.goto("/");
    await dashboardPage.optionAllowAll.click();
    await dashboardPage.loginButton.click();
    await loginPage.login(loginEmail, loginPassword);
  });
  test.only("successfully trip search", async ({ page }) => {
    // Arrange
    const destination = String(process.env.DESTINATION);
    const warningMessage = String(process.env.WARNING_MESSAGE);
    // Act
    await dashboardPage.tripSearch(destination);
    // Assert
    await expect(dashboardPage.expectedWarning).toHaveText(warningMessage);
  });
});



							
