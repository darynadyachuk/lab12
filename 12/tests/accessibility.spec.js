import { test, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

const BASE_URL = 'https://darynadyachuk.github.io/lab12/';

test.describe('E2E Accessibility & Flow (Production Site)', () => {

  test('перевірка головної сторінки на WCAG стандарти', async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForSelector('#root');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('перевірка сторінки People та перемикання теми', async ({ page }) => {
    // 1. Заходимо на головну
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForSelector('#root');

    // 2. Шукаємо кнопку зміни теми за текстом "Mode"
    // Використовуємо .first(), якщо таких кнопок раптом дві
    const themeButton = page.getByRole('button', { name: /mode/i }).first();
    // Перевіряємо, чи вона взагалі є
    await expect(themeButton).toBeVisible({ timeout: 10000 });
    // 3. Змінюємо тему
    await themeButton.click();
    // 4. Чекаємо на візуальні зміни
    await page.waitForTimeout(1000);
    // 5. Аналізуємо доступність
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test('навігація працює коректно', async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    const todoLink = page.locator('a, button').filter({ hasText: /todo/i });
    await todoLink.click();

    await expect(page).toHaveURL(/.*todo/);
  });

 test('інпути на сторінці Todo мають бути доступними', async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    // Переходимо на Todo через клік у меню
    const todoLink = page.locator('a, button').filter({ hasText: /todo/i });
    await todoLink.click();
    await expect(page).toHaveURL(/.*todo/);
    // Шукаємо інпут за плейсхолдером, який ти вказала в коді
    const input = page.getByPlaceholder(/new task/i);
    // Чекаємо, поки він з'явиться (на випадок затримки рендеру)
    await expect(input).toBeVisible({ timeout: 7000 });
    // Перевіряємо кнопку "Add"
    const addButton = page.getByRole('button', { name: /add/i });
    await expect(addButton).toBeVisible();
    // Запускаємо повний Axe-скан сторінки Todo
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('користувач може навігуватись за допомогою Tab', async ({ page }) => {
    await page.goto(BASE_URL);
    // Натискаємо Tab кілька разів
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    // Перевіряємо, чи фокус зараз на якомусь інтерактивному елементі
    const focusedElement = await page.evaluate(() => document.activeElement.tagName);
    expect(['A', 'BUTTON', 'INPUT']).toContain(focusedElement);
  });

  test('сторінка має коректний заголовок', async ({ page }) => {
    await page.goto(BASE_URL);
    // Перевірка заголовка сторінки (що він не порожній)
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
  });
});