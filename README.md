![Captain Stack](./logo.svg)

# Captain Stack — Code suggestion for VSCode

This feature is somewhat similar to [Github Copilot](https://copilot.github.com/)'s code suggestion. But instead of using AI, it sends your search query to Google, then retrieves StackOverflow answers and autocompletes them for you.

Note: ⚠️ This sample can only be used for extension development in [Insider release](https://code.visualstudio.com/insiders/). You cannot publish extensions using Proposed API. **Meaning it's not gonna work on VSCode. You'll need to download and use the [VSCode Insider](https://code.visualstudio.com/insiders/) version**

![Demo Video](./demo.gif)

_Note: vscode inline-completions feature is still not ready for production (VSCode store won't accept extensions like this yet). Check out the original [Microsoft/examples/inline-completions](https://github.com/microsoft/vscode-extension-samples/tree/main/inline-completions) repository_


## Running the Sample

- Download this repository to your local machine
- Run `npm install` in the terminal to install dependencies. _A `postinstall` script would download the latest version of `vscode.proposed.d.ts`_
- Run the `Run Extension` target in the Debug View. Or from the top menu, choose `Run > Start Debugging`.

This will:
	- Start a task `npm: watch` to compile the code
	- Run the extension in a new VS Code window (you should play the code here)

## Play with Copilot

To trigger inline completion, you'll need to type `//find {your keyword}.` (start with `//find`, end with a dot `.`)

For example
```js
//find binary search in javascript.
```

Make sure that `showInlineCompletions` is enabled in your settings!
```
"editor.inlineSuggest.enabled": true
```

# Have fun