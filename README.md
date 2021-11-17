![Captain Shannon](./icon.png)

# Captain Shannon — Code suggestion for VSCode

This feature is somewhat similar to [Github Copilot](https://copilot.github.com/)'s code suggestion. One might even call this a... copilot clone.

![Demo Video](./demo.gif)

## 0. Overview

Please edit src/sample.ts, Ben. I can help you get the extension running in the first place if you're having trouble.

We can add new hyperparams by editing package.json and config.ts.

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


## Todo:

Ben: Make it so we can sample from a laptop please.

Also we can improve things like: 
1. When to start sampling (currently we can't sample if normal intellisense is already sampling -- pretty dumb since they have different UIs)
3. Might be nice to have a way to trigger autocompletion using a keybinding?
2. The workarounds for prefix-tokenization we looked into before. I expect two-thirds of samples to be garbage right now due to tokenization artifacts.
