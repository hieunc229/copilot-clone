![Maverick](./small_yurts.png)

# Maverick — AI Code suggestion for VSCode

[![Maverick on Marketplace](https://vsmarketplacebadge.apphb.com/version/YurtsAI.maverick.svg)](https://marketplace.visualstudio.com/items?itemName=YurtsAI.maverick) [![Maverick on Marketplace](https://vsmarketplacebadge.apphb.com/installs-short/YurtsAI.maverick.svg)](https://marketplace.visualstudio.com/items?itemName=YurtsAI.maverick) [![Discord Chat](https://img.shields.io/discord/864164585070526475.svg)](https://discord.gg/qgUprRUX)

**Forked from [Captain Stack](https://marketplace.visualstudio.com/items?itemName=captainstack.captain-stack)**

This feature is somewhat similar to Github Copilot's code suggestion. This fork specifically incorporates AI into the workflow.

![Demo Video](./demo.gif)

---

Table of contents:

- [Maverick — AI Code suggestion for VSCode](#maverick--ai-code-suggestion-for-vscode)
  - [1. Install extension from the marketplace](#1-install-extension-from-the-marketplace)
  - [2. How to use](#2-how-to-use)
    - [Inline Completion using AI (only Python)](#inline-completion-using-ai-only-python)
    - [Inline Completion using Querying](#inline-completion-using-querying)
  - [3. Installation for Development](#3-installation-for-development)
  - [4. Captain Stack Archive](#4-captain-stack-archive)
    - [a. Captain Stack Configurations](#a-captain-stack-configurations)
      - [Available settings](#available-settings)
    - [b. Notes](#b-notes)
    - [c. Changelog](#c-changelog)
    - [d. Troubleshooting](#d-troubleshooting)
      - [Common reasons why you can't run Captain Stack:](#common-reasons-why-you-cant-run-captain-stack)
      - [Still not running?](#still-not-running)
  - [5. Contributors](#5-contributors)

---

## 1. Install extension from the marketplace

You can search for "Maverick" on the VSCode Extension Marketplace, or use [this link](https://marketplace.visualstudio.com/items?itemName=YurtsAI.maverick) to install. Have questions? [Join our Discord server](https://discord.gg/qgUprRUX)

## 2. How to use

### Inline Completion using AI (only Python)

AI inline completion will trigger on keywords `def` and `class` and upon entering colon `:`.

For example

```python
class LinkedList:
```

### Inline Completion using Querying

To trigger inline completion, you'll need to type `//find {your keyword}.` (start with `//find`, end with a dot `.`)

For example

```js
//find binary search in javascript.
```

Make sure `Inline Suggest` is `enabled` from the VS Code Settings

## 3. Installation for Development

To install and starting developing on Maverick:

1. Clone this repository to your local machine using `git clone https://github.com/YurtsAI/maverick.git`.
2. Run `npm install` in the terminal to install dependencies

3. Now, you can start the extension. From the top menu, choose `Run > Start Debugging`.

This will:

- Start a task `npm: watch` to compile the code and watch for changes
- Open a new VSCode window (you should use the extension there)

_Note: When you make changes, you should refresh that window to apply changes. To refresh, open Command Palette (Command+Shift+P on MacOS, or Ctrl+Shift+P on Windows), then choose "Developer: Reload window"_

---

## 4. Captain Stack Archive

### a. Captain Stack Configurations

There are a few configurations available for Captain Stack. To open the settings page:

1. Click on the Cog icon in the bottom left
2. Choose **Settings**
3. In the **Search settings** search box, enter "Captain Stack"

#### Available settings

- `sites` allows to enable or disable a source site. By default, only `Stackoverflow` is enabled.

- `maxResults` is the maximum number of results. It's `12` by default. Note: Since Captain Stack will fetch all the results from a page, the final number of results could be more than `maxResults`

### b. Notes

- There are more code sources that should be considered besides StackOverflow
- If you see an `unsupported` error message, ignore it

**Limits:**

- The extension uses fetch-node to get page content, and I don't know if there is any fetching limit
- The extension uses querySelector to extract code and other info. There is a risk of either StackOverflow or Google changing its querySelector

If those factors became problems, the extension could be using their official APIs instead.

### c. Changelog

- Jul 02, 2022 — Officially published Captain Stack on the extension marketplace
- Mar 22, 2022 — Added AI Code Validation
- Aug 15, 2021 - Added `sites` and `maxResults` configurations
- Jul 31, 2022 — Added GithubGist source
- Jul 31, 2021 — Create code extracting abstracting to add more code sources
- Jul 14, 2021 - Adapted to VS Code Insiders Release Version 1.59
- Jul 01, 2021 - Added snippet source (thanks for [mechero's suggestion](https://news.ycombinator.com/item?id=27698687))
- Jun 30, 2021 - Publish the initial version

### d. Troubleshooting

#### Common reasons why you can't run Captain Stack:

- When pressing `Run debugger`, it shows different target options (nodejs, edge, etc.). Your VSCode root directory might be incorrect. Make sure your root directory is the folder in which the `package.json` file is.
- Error message `module "node-fetch" not found...`. You need to run `npm install`.
- `canvas.node` was compiled against a different Node.js. [Try to remove canvas](https://github.com/hieunc229/copilot-clone/issues/9) (`npm uninstall canvas`)

#### Still not running?

- You haven't enabled the inline completion feature. To enable, set VSCode config `"editor.inlineSuggest.enabled": true`
- It might conflict with some other plugins. You might need to disable plugins to check

If none of the above works, open a thread or join our [Discord channel and have a chat](https://discord.gg/5F5tDsWFmp).

## 5. Contributors

The plugin is available, thanks to the original Captain Stack creators:

- [Kekschen](https://github.com/Kek5chen)
- [Charlie Lin](https://github.com/clin1234)
- [Hieu Nguyen](https://github.com/hieunc229)

**Feel free to open a thread for feedback or discussion. And have fun!**

---

Love Maverick? Please drop us a star :) and expand the yurt.
