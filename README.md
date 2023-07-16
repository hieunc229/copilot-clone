![Captain Stack](./icon.png)

# Captain Stack — Code suggestion for VSCode

[![Captain Stack on Marketplace](https://img.shields.io/badge/Downloads-VSCode_Marketplace-blue)](https://marketplace.visualstudio.com/items?itemName=captainstack.captain-stack) [![Captain Stack on Marketplace](https://img.shields.io/visual-studio-marketplace/d/captainstack.captain-stack)](https://marketplace.visualstudio.com/items?itemName=captainstack.captain-stack) [![Discord Chat](https://img.shields.io/discord/864164585070526475.svg)](https://discord.gg/5F5tDsWFmp)

This feature is somewhat similar to Github Copilot's code suggestion. But instead of using AI, it sends your search query to Google, then retrieves StackOverflow and Github Gist answers and autocompletes them for you.

![Demo Video](./demo.gif)

---

Table of contents:

- [Captain Stack — Code suggestion for VSCode](#captain-stack--code-suggestion-for-vscode)
  - [1. Install extension from the marketplace](#1-install-extension-from-the-marketplace)
  - [2. How to use](#2-how-to-use)
  - [3. Installation for Development](#3-installation-for-development)
  - [4. Captain Stack Configurations](#4-captain-stack-configurations)
    - [Available settings](#available-settings)
  - [5. Notes](#5-notes)
  - [6. Changelog](#6-changelog)
  - [7. Troubleshooting](#7-troubleshooting)
    - [Common reasons why you can't run Captain Stack:](#common-reasons-why-you-cant-run-captain-stack)
    - [Still not running?](#still-not-running)
  - [8. Contributors](#8-contributors)

---

## 1. Install extension from the marketplace

You can search for "Captain Stack" on the VSCode Extension Marketplace, or use [this link](https://marketplace.visualstudio.com/items?itemName=captainstack.captain-stack) to install. Have questions? [Join our Discord server](https://discord.gg/5F5tDsWFmp)

## 2. How to use

To trigger inline completion, you'll need to type `//find {your keyword}.` (start with `//find`, end with a dot `.`)

For example

```js
//find binary search in javascript.
```

Make sure `Inline Suggest` is `enabled` from the VS Code Settings

_Note: Use `Alt+]` and `Alt+[` to move through suggestions_

## 3. Installation for Development

**Check out the installation video: https://youtu.be/MD-kzsF0Scg**

To install and starting Captain Stack:

1. Clone this repository to your PC using `git clone https://github.com/hieunc229/copilot-clone.git .`. Please note there is a dot at the end of the command
2. Run `npm install` in the terminal to install dependencies

3. Now, you can start the extension. From the top menu, choose `Run > Start Debugging`.

This will:

- Start a task `npm: watch` to compile the code and watch for changes
- Open a new VSCode window (you should use the extension there)

_Note: When you make changes, you should refresh that window to apply changes. To refresh, open Command Palette (Command+Shift+P on MacOS, or Ctrl+Shift+P on Windows), then choose "Developer: Reload window"_

---

## 4. Captain Stack Configurations

There are a few configurations available for Captain Stack. To open the settings page:

1. Click on the Cog icon in the bottom left
2. Choose **Settings**
3. In the **Search settings** search box, enter "Captain Stack"

### Available settings

- `sites` allows to enable or disable a source site. By default, only `Stackoverflow` is enabled.

- `maxResults` is the maximum number of results. It's `12` by default. Note: Since Captain Stack will fetch all the results from a page, the final number of results could be more than `maxResults`

---

## 5. Notes

- There are more code sources that should be considered besides StackOverflow
- If you see an `unsupported` error message, ignore it

**Limits:**

- The extension uses fetch-node to get page content, and I don't know if there is any fetching limit
- The extension uses querySelector to extract code and other info. There is a risk of either StackOverflow or Google changing its querySelector

If those factors became problems, the extension could be using their official APIs instead.

---

## 6. Changelog

- Jul 02, 2022 — Officially published Captain Stack on the extension marketplace
- Mar 22, 2022 — Added AI Code Validation
- Aug 15, 2021 - Added `sites` and `maxResults` configurations
- Jul 31, 2022 — Added GithubGist source
- Jul 31, 2021 — Create code extracting abstracting to add more code sources
- Jul 14, 2021 - Adapted to VS Code Insiders Release Version 1.59
- Jul 01, 2021 - Added snippet source (thanks for [mechero's suggestion](https://news.ycombinator.com/item?id=27698687))
- Jun 30, 2021 - Publish the initial version

---

## 7. Troubleshooting

### Common reasons why you can't run Captain Stack:

- When pressing `Run debugger`, it shows different target options (nodejs, edge, etc.). Your VSCode root directory might be incorrect. Make sure your root directory is the folder in which the `package.json` file is.
- Error message `module "node-fetch" not found...`. You need to run `npm install`.
- `canvas.node` was compiled against a different Node.js. [Try to remove canvas](https://github.com/hieunc229/copilot-clone/issues/9) (`npm uninstall canvas`)

### Still not running?

- You haven't enabled the inline completion feature. To enable, set VSCode config `"editor.inlineSuggest.enabled": true`
- It might conflict with some other plugins. You might need to disable plugins to check

If none of the above works, open a thread or join our [Discord channel and have a chat](https://discord.gg/5F5tDsWFmp).

---

## 8. Contributors

The plugin is available, thanks to:

- [Kekschen](https://github.com/Kek5chen)
- [Charlie Lin](https://github.com/clin1234)
- [Hieu Nguyen](https://github.com/hieunc229)

**Feel free to open a thread for feedback or discussion. And have fun!**

---

Love Captain Stack? Check out other things I do:

<a href="https://gasbyai.com?ref=csgithub">
<img src="https://gasbyai.com/assets/banner.svg" alt="GasbyAI - Chat with your fancy AI personal assistant - Fancy ChatGPT alternative" height="100" width="360" />
</a>

- [GasbyAI - Fancy ChatGPT alternative](https://gasbyai.com?ref=csgithub)
- [Rebit Nocode Site Builder](https://rebit.co/?ref=github)
- [Hieu's Twitter](https://twitter.com/hieuSSR/)

<img alt="Gum Pixels" src="https://lsn.gumanalytics.com/images/XOsbYS_va/gp.png" width="33" height="10" />