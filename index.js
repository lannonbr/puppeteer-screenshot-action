const core = require("@actions/core");
const puppeteer = require("puppeteer-core");
const io = require("@actions/io");
const os = require("os");

function getChromePath() {
  let browserPath;

  if (os.type() === "Windows_NT") {
    // Chrome is usually installed as a 32-bit application, on 64-bit systems it will have a different installation path.
    const programFiles =
      os.arch() === "x64"
        ? process.env["PROGRAMFILES(X86)"]
        : process.env.PROGRAMFILES;
    browserPath = path.join(
      programFiles,
      "Google/Chrome/Application/chrome.exe"
    );
  } else if (os.type() === "Linux") {
    browserPath = "/usr/bin/google-chrome";
  } else if (os.type() === "Darwin") {
    browserPath =
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  }

  if (browserPath && browserPath.length > 0) {
    return path.normalize(browserPath);
  }

  throw new TypeError(`Cannot run action. ${os.type} is not supported.`);
}

(async () => {
  try {
    await io.mkdirP(`${process.env.GITHUB_WORKSPACE}/screenshots/`);

    const url = core.getInput("url");

    const timestamp = new Date().getTime();
    const width = parseInt(core.getInput("width"));
    const height = parseInt(core.getInput("height"));
    const fullPage = core.getInput("fullPage") === "true";
    const screenshotName =
      core.getInput("screenshotName") !== "false"
        ? core.getInput("screenshotName")
        : `screenshot-${timestamp}`;

    const browser = await puppeteer.launch({
      executablePath: getChromePath(),
      defaultViewport: { width, height },
    });
    const page = await browser.newPage();
    await page.goto(url, {
      waitUntil: "networkidle2",
    });
    await page.waitFor(3000);
    await page.screenshot({
      fullPage,
      path: `${process.env.GITHUB_WORKSPACE}/screenshots/${screenshotName}.png`,
    });
    await browser.close();

    core.exportVariable("TIMESTAMP", timestamp);
  } catch (error) {
    core.setFailed(`Failed to run action. ${error}`);
    process.exit(1);
  }
})();
