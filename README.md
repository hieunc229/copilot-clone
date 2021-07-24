![Captain Stack](./icon.png)

# Captain Stack — Code suggestion for VSCode


This feature is somewhat similar to [Github Copilot](https://copilot.github.com/)'s code suggestion. But instead of using AI, it sends your search query to Google, then retrieves StackOverflow answers and autocompletes them for you. 

Have questions? [Join our Discord server](https://discord.gg/5F5tDsWFmp)
---

![Demo Video](./demo.gif)

## Table of contents:

1. [Installation](#1-installation)
2. [Play with Captain Stack](#2-play-with-captain-stack)
3. [Notes](#3-notes)
4. [Changelog](#4-changelog)
5. [Troubleshooting](#5-troubleshooting)
6. [Contributors](#6-contributors)


_Note: ⚠️ This extension uses a proposed API (inline-completion) and can only be used for extension development in [VSCode Insider release](https://code.visualstudio.com/insiders/). It's not yet available on VSCode_

---

## 1. Installation

**Check out the installation video: https://youtu.be/MD-kzsF0Scg**

Before installation, make sure you have [VSCode Insider](https://code.visualstudio.com/insiders/). You'll be using this version. To install and starting Captain Stack:

1. Download this repository to your local machine. Unzip and open it on VSCode Insider (make sure the root directory is the same as `package.json` file)
2. (optional) Run `npm install` in the terminal to install dependencies. _A `postinstall` script would download the latest version of `vscode.proposed.d.ts`_
3. Run the `Run Extension` target in the Debug View. Or from the top menu, choose `Run > Start Debugging`.

This will:
- Start a task `npm: watch` to compile the code and watch for changes
- Open a new VSCode window (you should use the extension here)

_Note: When you make changes, you should refresh that window to apply changes. To refresh, open Command Palette (Command+Shift+P on MacOS, or Ctrl+Shift+P on Windows), then choose "Developer: Reload window"_

---

## 2. Play with Captain Stack

To trigger inline completion, you'll need to type `//find {your keyword}.` (start with `//find`, end with a dot `.`)

For example
```js
//find binary search in javascript.
```

Make sure that `showInlineCompletions` is enabled in your settings!
```
"editor.inlineSuggest.enabled": true
```

---

## 3. Notes

- There are more code sources that should be considered besides StackOverflow
- If you see `unsupported` error message, ignore it

**Limits:**
- The extension uses fetch-node to get page content, and I don't know if there is any fetching limit
- The extension uses querySelector to extract code and other info. There is a risk of either StackOverflow or Google changing its querySelector

If those factor became problems, the extension could be using their official APIs instead.

---

## 4. Changelog

- Jul 14, 2021 - Adapted to VS Code Insiders Release Version 1.59
- Jul 01, 2021 - Added snippet source (thanks for [mechero's suggestion](https://news.ycombinator.com/item?id=27698687))
- Jun 30, 2021 - Publish the initial version

---

## 5. Troubleshooting

### Common reasons why you can't run Captain Stack:

- You're not using VSCode Insider. It can be [downloaded here](https://code.visualstudio.com/insiders/)
- When `Run debugger`, it shows different target options (nodejs, edge, etc.). Your VSCode root directly might be incorrect. Make sure your root directory is the same with the `package.json` file.
- Error message `module "node-fetch" not found...`. You need to run `npm install`
- `canvas.node` was compiled against a different Node.js. [Try to remove canvas](https://github.com/hieunc229/copilot-clone/issues/9) (`npm uninstall canvas`)

### Still not running?

- You haven't enabled the inline completion feature. To enable, set VSCode config `"editor.inlineSuggest.enabled": true`
- It might conflict with some other plugins. You might need to disable plugins to check

If none of the above works, open a thread or join our [Discord channel and have a chat](https://discord.gg/5F5tDsWFmp).

---

## 6. Contributors

The plugins is available, thanks to:

- [Kekschen](https://github.com/Kek5chen)
- [Charlie Lin](https://github.com/clin1234)
- [Hieu Nguyen](https://github.com/hieunc229)

**Feel free to open a thread for feedback or discussion. And have fun!**

---
Love Captain Stack? Check out other things I do:

- [Inverr Nocode Site Builder](https://inverr.com/?ref=github-filepond)
- [Hieu's Twitter](https://twitter.com/hieuSSR/)
