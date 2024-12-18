const { clickElement, findText } = require("./lib/commands.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://qamid.tmweb.ru/client/index.php");
});

afterEach(async () => {
  await page.close();
});

describe("Cinema tests", () => {
  test("Фильм 'Сталкер' 14.12", async () => {
    await clickElement(page, ".page-nav__day:nth-child(6)");
    await clickElement(page, "[data-seance-id='217']");
    const actual = await findText(page, ".buying__info-title");
    await expect(actual).toContain("Сталкер");
  });

  test("Бронируем билеты на 'Микки Маус'", async () => {
    await clickElement(page, ".page-nav__day:nth-child(6)");
    await clickElement(page, "[data-seance-id='199']");
    await clickElement(page, ".acceptin-button");
    const actual = await findText(page, ".ticket__check-title");
    await expect(actual).toContain("Вы выбрали билеты:");
  });

  test("Без выбора места, нельзя забронировать билет", async () => {
    await clickElement(page, ".page-nav__day:nth-child(6)");
    await clickElement(page, "[data-seance-id='217']");
    const acceptinButton = await page.$(".acceptin-button");
    const actual = await acceptinButton.evaluate((btn) => btn.disabled);
    expect(actual).toEqual(true);
  });
});
