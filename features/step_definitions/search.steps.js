const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const { clickElement, findText } = require("../../lib/commands.js");

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("пользователь открывает сайт киноафиши", async function () {
  return await this.page.goto("https://qamid.tmweb.ru/client/index.php");
});

When("пользователь выбирает день сеанса и время", async function () {
  await clickElement(this.page, ("[data-seance-id='217']"));
  return await clickElement(this.page, ("[data-seance-id='217']"));
});

Then(
  "пользователь переходит на страницу с выбором места в зале на фильм {string}",
  async function (string) {
    const actual = await findText(this.page, ".buying__info-title");
    const expected = await string;
    expect(actual).contains(expected);
  }
);

When("пользователь выбирает фильм", async function () {
  await clickElement(page, "[.page-nav__day:nth-child(6)]");
    await clickElement(page, "[data-seance-id=“199]");
    await clickElement(page, ".acceptin-button");
    const actual = await findText(page, ".ticket__check-title");
    await expect(actual).toContain("Вы выбрали билеты:");
});

Then("пользователь видит надпись {string}", async function (string) {
  const actual = await findText(this.page, ".ticket__check-title");
  const expected = await string;
  expect(actual).contains(expected);
});

When("пользователь выбирает фильм, но не выбирает место", async function () {
  await clickElement(this.page, ".page-nav__day:nth-child(6)");
  return await clickElement(this.page, "[data-seance-id='217']");
});

Then("пользователь не может нажать кнопку {string}", async function (string) {
  const acceptinButton = await this.page.$(string);
  const actual = await acceptinButton.evaluate((btn) => btn.disabled);
  expect(actual).equal(true);
});
