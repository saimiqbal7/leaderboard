import puppeteer from 'puppeteer';
import fs from 'fs';

async function openInitialPage() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  const key =  "5XbNSjUrsUezGWBufz4Sv8Uw9CYPXawD92JTXFMJaJhB"
  await page.goto(`https://explorer.koii.live/address/${key}/history`);

  // Wait for the element with class ".text-truncate" to be visible on the page
  await page.waitForSelector('.text-truncate');

  const firstElement = await page.evaluate(() => {
    return document.querySelector('.text-truncate').innerText;
  });

  await browser.close();
  
  return firstElement;
}

async function openNewPageAndRetrieveText(url) {

  const newBrowser = await puppeteer.launch({ headless: false });
  const newPage = await newBrowser.newPage();

  await newPage.goto(url);

  // Replace 'a' with a more specific selector if necessary
  await newPage.waitForSelector('a');

  // Adding a delay here
  await newPage.waitForTimeout(5000);  // wait for 5 seconds

  const secText = await newPage.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll('a'));
    return anchors[8] ? anchors[8].innerText : null;
  });

  await newBrowser.close();

  return secText;
}

(async () => {
  const firstElement = await openInitialPage();
  console.log(firstElement);

  const url = `https://explorer.koii.live/tx/${firstElement}`;
  const secText = await openNewPageAndRetrieveText(url);
  console.log(secText);

  fs.appendFile('output.txt', secText + '\n', (err) => {
    if (err) {
      console.error('Error appending to file:', err);
    } else {
      console.log('secText appended to output.txt');
    }
  });
})();

