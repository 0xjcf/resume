const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Adjust the path to where your HTML file is located
  await page.goto(`file://${__dirname}/index.html`, {
    waitUntil: "networkidle0",
  });

  // Inject CSS to disable animations and dark mode specifically for the PDF
  await page.evaluate(() => {
    document.body.classList.add('pdf-generation');
  });

  // Generate PDF without the specific styles
  await page.pdf({
    path: "resume.pdf",
    format: "A4",
    printBackground: true,
  });

  await browser.close();
})().catch(console.error);
