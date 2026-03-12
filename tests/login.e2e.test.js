const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

// On augmente le temps d'attente pour laisser le temps au navigateur de démarrer
jest.setTimeout(60000);

describe('Selenium E2E - Authentification', () => {
  let driver;

  beforeAll(async () => {
    const options = new chrome.Options();
    options.addArguments(
      '--headless=new',
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--remote-allow-origins=*'
    );

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
  });

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  it('Devrait charger la page de connexion', async () => {
    await driver.get('http://localhost:3000');
    const emailInput = await driver.wait(until.elementLocated(By.id('email')), 10000);
    expect(emailInput).toBeDefined();
    
    console.log("oui");
  });
});