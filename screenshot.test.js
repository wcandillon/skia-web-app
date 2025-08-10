const puppeteer = require('puppeteer');
const sharp = require('sharp');

async function getFirstPixelColor(imagePath) {
  const { data } = await sharp(imagePath)
    .raw()
    .ensureAlpha()
    .toBuffer({ resolveWithObject: true });
  
  // First pixel RGBA values
  const r = data[0];
  const g = data[1];
  const b = data[2];
  const a = data[3];
  
  return { r, g, b, a };
}

describe('Web App Screenshot', () => {
  let browser;
  let page;

  beforeAll(async () => {
    const webUrl = 'http://localhost:8082';
    console.log(`Using web server at: ${webUrl}`);

    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    page = await browser.newPage();
    page.webUrl = webUrl;
  }, 60000);

  afterAll(async () => {
    if (browser) {
      await browser.close();
    }
  });

  test('should take a screenshot of the web app', async () => {
    try {
      await page.goto(page.webUrl, { 
        waitUntil: 'networkidle2',
        timeout: 30000 
      });

      await new Promise(resolve => setTimeout(resolve, 12000));

      await page.screenshot({ 
        path: 'screenshot.png',
        fullPage: true 
      });

      console.log('Screenshot saved as screenshot.png');
      
      // Check the color of the first pixel
      const firstPixel = await getFirstPixelColor('screenshot.png');
      console.log(`First pixel color: R=${firstPixel.r}, G=${firstPixel.g}, B=${firstPixel.b}, A=${firstPixel.a}`);
      
      // Check if it's predominantly blue (B > R and B > G)
      const isBlue = firstPixel.b > firstPixel.r && firstPixel.b > firstPixel.g && firstPixel.b > 100;
      console.log(`First pixel is blue: ${isBlue}`);
      
      expect(isBlue).toBe(true);
    } catch (error) {
      console.error('Error taking screenshot:', error);
      throw error;
    }
  }, 60000);
});