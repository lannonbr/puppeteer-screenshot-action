# Puppeteer Screenshot Action

A GitHub Action to open Puppeteer and take a screenshot of the page. The screenshot will be saved to `$GITHUB_WORKSPACE/screenshots/screenshot-${timestamp}.png` where the timestamp is the unix timestamp of when the image was taken.

More on GitHub Actions [here](https://github.com/features/actions)

## Prerequisites

- Node.js ([Download](https://nodejs.org/en/download/))
- yarn package manager ([Download](https://yarnpkg.com/lang/en/docs/install))

## Supported platforms
| Platform | Versions | Tested & Working |
| :--- | :--- | :--: |
| `ubuntu` | 16.04, 18.04 | :+1: |
| `windows` | Server 2016 & 2019 | :+1: |
| `macOS` | 10.14 | :-1: |

> **Why won't it work on macOS?** The [GitHub Actions virtual environment for macOS](https://help.github.com/en/articles/software-in-virtual-environments-for-github-actions#macos-1014) does not come preinstalled with Google Chrome. This is required in order to run puppeteer-core.

## Example usage
```yaml
steps:
  - name: Take photo of github.com
    uses: "lannonbr/puppeteer-screenshot-action@1.0.0"
    with:
      url: https://github.com
```
