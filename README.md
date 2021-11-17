![Captain Shannon](./icon.png)

# Captain Shannon — Code suggestion for VSCode


This feature is somewhat similar to [Github Copilot](https://copilot.github.com/)'s code suggestion. One might even call this a... copilot clone.



![Demo Video](./demo.gif)

## Table of contents:

1. [Installation](#1-installation)
2. [Play with Captain Stack](#2-play-with-captain-stack)
5. [Troubleshooting](#5-troubleshooting)


---

## 1. Installation

**Check out the installation video: https://youtu.be/MD-kzsF0Scg**

To install and starting Captain Stack:

1. Download this repository to your local machine. Unzip and open it on VSCode (make sure the root directory is the same as `package.json` file)
2. (optional) Run `npm install` in the terminal to install dependencies. _A `postinstall` script would download the latest version of `vscode.proposed.d.ts`_
3. Run the `Run Extension` target in the Debug View. Or from the top menu, choose `Run > Start Debugging`.

This will:
- Start a task `npm: watch` to compile the code and watch for changes
- Open a new VSCode window (you should use the extension here)

_Note: When you make changes, you should refresh that window to apply changes. To refresh, open Command Palette (Command+Shift+P on MacOS, or Ctrl+Shift+P on Windows), then choose "Developer: Reload window"_

---

## 2. Play with Captain Stack

After starting in debug mode, just type some text and you'll get some (dummy) inline completions.

Make sure that `showInlineCompletions` is enabled in your settings!
```
"editor.inlineSuggest.enabled": true
```

---

## 3. Captain Stack configurations

There are a few configurations available for Captain Stack. To open the configurationview:

1. Click on the Cog icon at bottom left
2. Choose **Settings**
3. In the **Search settings** search box, enter "Captain Stack"

### Available settings

- `n_samples` is the maximum number of results. It's `12` by default.

---

## 6. Troubleshooting

### Common reasons why you can't run Captain Stack:

- When `Run debugger`, it shows different target options (nodejs, edge, etc.). Your VSCode root directly might be incorrect. Make sure your root directory is the same with the `package.json` file.
- Error message `module "node-fetch" not found...`. You need to run `npm install`
- `canvas.node` was compiled against a different Node.js. [Try to remove canvas](https://github.com/hieunc229/copilot-clone/issues/9) (`npm uninstall canvas`)

### Still not running?

- You haven't enabled the inline completion feature. To enable, set VSCode config `"editor.inlineSuggest.enabled": true`
- It might conflict with some other plugins. You might need to disable plugins to check
