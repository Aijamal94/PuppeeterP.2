const { clickElement, findText } = require("./lib/commands.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://qamid.tmweb.ru/client/index.php");
});

afterEach(() => {
  page.close();
});

describe("Cinema tests", () => {
  test("Фильм 'Сталкер' 14.12", async () => {
    await page.waitForSelector(".page-nav__day:nth-child(6)", {
      visible: true,
    });
    await clickElement(page, ".page-nav__day:nth-child(6)");
    await page.waitForSelector("[data-seance-id='217']", { visible: true });
    await clickElement(page, "[data-seance-id='217']");
    const actual = await findText(page, ".buying__info-title");
    await expect(actual).toContain("Вы выбрали билеты:");
  });

  test("Бронируем билеты на 'Микки Маус'", async () => {
    await clickElement(page, "[.page-nav__day:nth-child(6)]");
    await clickElement(page, "[data-seance-id=“199]");
    await clickElement(page, ".acceptin-button");
    const actual = await findText(page, ".ticket__check-title");
    await expect(actual).toContain("Вы выбрали билеты:");
  });

  test("Без выбора места, нельзя забронировать билет", async () => {
    await page.waitForSelector(".page-nav__day:nth-child(6)", {
      visible: true,
    });
    await clickElement(page, ".page-nav__day:nth-child(6)");
    await page.waitForSelector("[data-seance-id='217']", { visible: true });
    await clickElement(page, "[data-seance-id='217']");
    const acceptinButton = await page.$(".acceptin-button");
    const actual = await acceptinButton.evaluate((btn) => btn.disabled);
    expect(actual).toEqual(true);
  });
});
