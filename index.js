const core = require("@actions/core");
const puppeteer = require("puppeteer-core");
const io = require("@actions/io");
const os = require("os");

function getChromePath() {
  let browserPath = "";

  if (os.type() === "Windows_NT") {
    // Chrome is usually installed as a 32-bit application, on 64-bit systems it will have a different installation path.
    const programFiles = os.arch() === 'x64' ? process.env["PROGRAMFILES(X86)"] : process.env.PROGRAMFILES;
    browserPath = path.join(programFiles, "Google/Chrome/Application/chrome.exe");
  } else if (os.type() === "Darwin") {
    browserPath = "/Application/Google Chrome.app/Contents/MacOS/Google Chrome";
  } else {
    browserPath = "/usr/bin/google-chrome"; // Linux
  }

  return path.normalize(browserPath);
}

(async () => {
  await io.mkdirP(`${process.env.GITHUB_WORKSPACE}/screenshots/`);

  const url = core.getInput("url");

  const timestamp = new Date().getTime();
  const width = parseInt(core.getInput("width"));
  const height = parseInt(core.getInput("height"));

  const browser = await puppeteer.launch({
    executablePath: getChromePath(),
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
})();
