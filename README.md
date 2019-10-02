# Puppeteer Screenshot Action

A GitHub Action to open Puppeteer and take a screenshot of the page. The screenshot will be saved to `$GITHUB_WORKSPACE/screenshots/screenshot-${timestamp}.png` where the timestamp is the unix timestamp of when the image was taken.

More on GitHub Actions [here](https://github.com/features/actions)

# Prerequisites

- Node.js ([Download](https://nodejs.org/en/download/))
- yarn package manager ([Download](https://yarnpkg.com/lang/en/docs/install))

# Usage

It currently only works on Ubuntu, but is planned to make it cross-platform.

```yaml
steps:
  - name: Take photo of github.com
    uses: "lannonbr/puppeteer-screenshot-action@1.0.0"
    with:
      url: https://github.com
```
