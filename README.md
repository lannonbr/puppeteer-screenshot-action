# Puppeteer Screenshot Action

A GitHub Action to open Puppeteer and take a screenshot of the page. The screenshot will be saved to `$GITHUB_WORKSPACE/screenshots/screenshot-${timestamp}.png` where the timestamp is the unix timestamp of when the image was taken.
You can change the name of the saved screenshot in the config.

More on GitHub Actions [here](https://github.com/features/actions)

## Prerequisites

- Node.js ([Download](https://nodejs.org/en/download/))
- yarn package manager ([Download](https://yarnpkg.com/lang/en/docs/install))

## Supported platforms

| Platform  | Versions           | Tested & Working |
| :-------- | :----------------- | :--------------: |
| `ubuntu`  | 16.04, 18.04       |       :+1:       |
| `windows` | Server 2016 & 2019 |       :+1:       |
| `macOS`   | 10.15              |       :+1:       |

## Example usage

```yaml
steps:
  - name: Take photo of github.com
    uses: "lannonbr/puppeteer-screenshot-action@1.0.0"
    with:
      url: https://github.com
```
