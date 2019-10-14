const core = require("@actions/core");
const puppeteer = require("puppeteer-core");
const io = require("@actions/io");

(async () => {
  try {
    await io.mkdirP(`${process.env.GITHUB_WORKSPACE}/screenshots/`);

    const url = core.getInput("url");

    const timestamp = new Date().getTime();
    const width = parseInt(core.getInput("width"));
    const height = parseInt(core.getInput("height"));

    const browser = await puppeteer.launch({
      executablePath: "/usr/bin/google-chrome",
      defaultViewport: { width, height }
    });
    const page = await browser.newPage();
    await page.goto(url, {
      waitUntil: "networkidle2"
    });
    await page.waitFor(3000);
    await page.screenshot({
      fullPage: true,
      path: `${process.env.GITHUB_WORKSPACE}/screenshots/screenshot-${timestamp}.png`
    });
    await browser.close();

    core.exportVariable("TIMESTAMP", timestamp);
  } catch (error) {
    core.setFailed(`Failed to run action. ${error}`);
  }
})();