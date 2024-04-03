![Captain Stack](./icon.png)

# Captain Stack — Code generator and suggestion for VSCode

[![Captain Stack on Marketplace](https://img.shields.io/badge/Downloads-VSCode_Marketplace-blue)](https://marketplace.visualstudio.com/items?itemName=captainstack.captain-stack) [![Captain Stack on Marketplace](https://img.shields.io/visual-studio-marketplace/d/captainstack.captain-stack)](https://marketplace.visualstudio.com/items?itemName=captainstack.captain-stack) [![Discord Chat](https://img.shields.io/discord/864164585070526475.svg)](https://discord.gg/5F5tDsWFmp)

This feature is somewhat similar to Github Copilot's code suggestion. But instead of using AI, it sends your search query to Google, then retrieves StackOverflow and Github Gist answers and autocompletes them for you.

✅ OpenAI and OpenRouter added to generate code with AI (Bring Your Own Key)

![Demo Video](./demo.gif)

## 1. Usage

Captain Stack provides Code Search (from Github Gist, StackOverflow), and AI Code Generation (with OpenAI and OpenRouter). With multiple options can be enabled at the same time.

To generate/search code, use `// find {what you need}.`. For example:

```js
// find binary search in JavaScript.

// generate binary search function in Python.
```

Note:
- Make sure there is a dot at the end of `{what you need}` search phrase
- You can use either `// find` or `// generate` to trigger Captain Stack code completion. Both are the same.


## 2. Settings

To configure setting options for Captain Stack, open the settings page by using hotkey `Meta + ,`, or:

1. Click on the Cog icon in the bottom left
2. Choose **Settings**
3. In the **Search settings** search box, enter "Captain Stack"

### Settings options

Tick the checkbox of the following provider to enable
- Github Gist
- Stackoverflow
- Open AI
- Open Router

For Code Search (from Github Gist, StackOverflow)
-  `Max results`: the max number of search results return

For Code Generator

- `Open AI: Api Key`: OpenAI API Key, see [how to get OpenAI API Key](https://gasbyai.com/docs/setup-openai). Required when using OpenAI provider
- `Open AI: Model`: Model used to generate code. Model list is available at https://platform.openai.com/docs/models
- `Open Router: Api Key`: OpenRouter API Key, see [how to get OpenRouter API Key](https://gasbyai.com/docs/setup-openrouter). Required when using OpenRouter provider
- `Open Router: Model`: Model used to generate code. Model list is available at https://platform.openai.com/docs/models
- `Ai: N`: Number of generated code outputs. Default is `1`
- `Ai: Temperature`: Code output creativeness, higher value will make the output more random (value between 0.0-1.0). Default is `0.5`

Please note when using OpenRouter, `X-Title` and `HTTP-Referer` will be set as GasbyAI

## 3. Contributors

The plugin is available, thanks to:

- [Kekschen](https://github.com/Kek5chen)
- [Charlie Lin](https://github.com/clin1234)
- [Hieu Nguyen](https://twitter.com/hieuSSR/)

**Feel free to open a thread for feedback or discussion. And have fun!**

---

Love Captain Stack? Check out other things I do:

<a href="https://gasbyai.com?ref=csgithub">
<img src="https://gasbyai.com/banner.png" alt="GasbyAI - Chat with your fancy AI personal assistant - Fancy ChatGPT alternative" height="100" width="360" />
</a>

- [GasbyAI - Fancy ChatGPT alternative](https://gasbyai.com?ref=csgithub)
- [Rebit Nocode Site Builder](https://rebit.co/?ref=github)
- [...more at theGums](https://thegums.co)

<img alt="Gum Pixels" src="https://lsn.gumanalytics.com/images/XOsbYS_va/gp.png" width="33" height="10" />
