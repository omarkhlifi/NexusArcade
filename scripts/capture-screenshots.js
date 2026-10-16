import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const TARGET_URL = 'http://localhost:4173';
const OUTPUT_DIR = path.resolve('screenshots');

async function capture() {
  console.log('Launching Chrome via puppeteer-core...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
    defaultViewport: { width: 1440, height: 900 }
  });

  const page = await browser.newPage();
  await page.goto(TARGET_URL, { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1200));

  console.log('1. Capturing 01-hero-showcase.png...');
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.screenshot({ path: path.join(OUTPUT_DIR, '01-hero-showcase.png') });

  console.log('2. Scrolling to catalog and capturing 02-catalog-filters.png...');
  await page.evaluate(() => window.scrollTo({ top: 620, behavior: 'instant' }));
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(OUTPUT_DIR, '02-catalog-filters.png') });

  console.log('3. Opening game detail drawer and capturing 03-game-detail-modal.png...');
  const card = await page.$('.group.relative.rounded-2xl.cyber-glass-card');
  if (card) {
    await card.click();
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(OUTPUT_DIR, '03-game-detail-modal.png') });
    
    // Close modal
    const closeBtn = await page.$('button[aria-label="Close dialog"]');
    if (closeBtn) await closeBtn.click();
    await new Promise(r => setTimeout(r, 500));
  }

  console.log('4. Adding item to cart and capturing 04-cart-drawer.png...');
  // Click first acquire button on page
  await page.evaluate(() => {
    const acquireBtns = Array.from(document.querySelectorAll('button')).filter(b => b.textContent && b.textContent.includes('Acquire'));
    if (acquireBtns.length > 0) acquireBtns[0].click();
  });
  await new Promise(r => setTimeout(r, 800));

  // Type promo code NEXUS10
  const promoInput = await page.$('input[placeholder*="Promo code"]');
  if (promoInput) {
    await promoInput.type('NEXUS10');
    const applyBtn = await page.$('button[type="submit"]');
    if (applyBtn) await applyBtn.click();
    await new Promise(r => setTimeout(r, 600));
  }
  await page.screenshot({ path: path.join(OUTPUT_DIR, '04-cart-drawer.png') });

  console.log('5. Opening checkout modal and capturing 05-checkout-modal.png...');
  await page.evaluate(() => {
    const checkoutBtns = Array.from(document.querySelectorAll('button')).filter(b => b.textContent && b.textContent.includes('Proceed to Payment'));
    if (checkoutBtns.length > 0) checkoutBtns[0].click();
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(OUTPUT_DIR, '05-checkout-modal.png') });

  // Close checkout modal
  const closeCheckout = await page.$('button[aria-label="Close checkout"]');
  if (closeCheckout) await closeCheckout.click();
  await new Promise(r => setTimeout(r, 600));

  console.log('6. Navigating to Achievements and capturing 06-achievements-hub.png...');
  await page.evaluate(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const btns = Array.from(document.querySelectorAll('button'));
    const achBtn = btns.find(b => b.textContent && b.textContent.includes('Achievements'));
    if (achBtn) achBtn.click();
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.screenshot({ path: path.join(OUTPUT_DIR, '06-achievements-hub.png') });

  console.log('7. Navigating to Library and capturing 07-my-library.png...');
  await page.evaluate(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const btns = Array.from(document.querySelectorAll('button'));
    const libBtn = btns.find(b => b.textContent && b.textContent.includes('Library'));
    if (libBtn) libBtn.click();
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.screenshot({ path: path.join(OUTPUT_DIR, '07-my-library.png') });

  console.log('8. Mobile view and capturing 08-mobile-responsive.png...');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.evaluate(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const btns = Array.from(document.querySelectorAll('button'));
    const storeBtn = btns.find(b => b.textContent && b.textContent.includes('Store'));
    if (storeBtn) storeBtn.click();
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(OUTPUT_DIR, '08-mobile-responsive.png') });

  console.log('All 8 high-res screenshots captured successfully!');
  await browser.close();
}

capture().catch(err => {
  console.error('Error capturing screenshots:', err);
  process.exit(1);
});
