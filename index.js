const core = require("@actions/core");
const puppeteer = require("puppeteer-core");
const io = require("@actions/io");

(async () => {
  await io.mkdirP(`${process.env.GITHUB_WORKSPACE}/screenshots/`);

  let url = core.getInput("url");

  const timestamp = new Date().getTime();

  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/google-chrome",
    defaultViewport: { width: 1920, height: 1080 }
  });
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: "networkidle2"
  });
  await page.screenshot({
    fullPage: true,
    path: `${process.env.GITHUB_WORKSPACE}/screenshots/screenshot-${timestamp}.png`
  });
  await browser.close();

  core.exportVariable("TIMESTAMP", timestamp);
})();
