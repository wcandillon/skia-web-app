const puppeteer = require('puppeteer');
const sharp = require('sharp');

async function getFirstPixelColor(imagePath) {
  const { data, info } = await sharp(imagePath)
    .raw()
    .ensureAlpha()
    .toBuffer({ resolveWithObject: true });
  
  // Calculate offset for pixel at (0, 80)
  const x = 0;
  const y = 80;
  const pixelOffset = (y * info.width + x) * 4; // 4 bytes per pixel (RGBA)
  
  // Pixel RGBA values at (0, 80)
  const r = data[pixelOffset];
  const g = data[pixelOffset + 1];
  const b = data[pixelOffset + 2];
  const a = data[pixelOffset + 3];
  
  return { r, g, b, a };
}

describe('Web App Screenshot', () => {
  let browser;
  let page;

  beforeAll(async () => {
    const webUrl = 'http://localhost:8081/examples/animated-square';
    console.log(`Using web server at: ${webUrl}`);

    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    page = await browser.newPage();
    page.webUrl = webUrl;
  }, 60000);

  afterAll(async () => {
    // Close page first
    if (page) {
      try {
        await page.close();
      } catch (error) {
        console.error('Error closing page:', error);
      }
    }
    
    // Then close browser
    if (browser) {
      try {
        await browser.close();
      } catch (error) {
        console.error('Error closing browser:', error);
        // Force kill if normal close fails
        if (browser.process() !== null) {
          browser.process().kill('SIGKILL');
        }
      }
    }
  }, 30000); // Add timeout here

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
      
      // Check the color of the pixel at (0, 80)
      const pixelAt0_80 = await getFirstPixelColor('screenshot.png');
      console.log(`Pixel at (0, 80) color: R=${pixelAt0_80.r}, G=${pixelAt0_80.g}, B=${pixelAt0_80.b}, A=${pixelAt0_80.a}`);
      
      // Check if it's predominantly blue (B > R and B > G)
      const isBlue = pixelAt0_80.b > pixelAt0_80.r && pixelAt0_80.b > pixelAt0_80.g && pixelAt0_80.b > 100;
      console.log(`Pixel at (0, 80) is blue: ${isBlue}`);
      
      expect(isBlue).toBe(true);
    } catch (error) {
      console.error('Error taking screenshot:', error);
      throw error;
    }
  }, 60000);
});