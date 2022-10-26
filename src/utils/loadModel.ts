import * as vscode from "vscode";
import * as path from "path";
import { exec } from "child_process";
import fetch from "node-fetch";

import { getConfig } from "../config";

export async function loadModel() {
  const config = getConfig();
  const port = config.settings.port;
  const modelDockerImagePath = path.resolve(__dirname, "maverick.tar");
  const modelLoadCmd = `docker load -i ${modelDockerImagePath} && docker run -d -p ${port}:9401 maverick`;
  exec(modelLoadCmd, (error, stdout, stderr) => {
    console.log(error);
  });

  vscode.window.showInformationMessage(
    `Maverick launching on port ${port}. Please wait a few minutes for Maverick to load and configure.`
  );

  let isModelReady = false;

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  async function checkServer() {
    return await fetch(`http://localhost:${port}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => res.text());
  }

  // Allow model to load for up to 10 minutes
  // 60 polls * 5000 ms = 5 minutes
  const disposable = vscode.window.setStatusBarMessage(
    "Maverick loading... This message will auto-clear when it is ready."
  );
  let poll = 60;

  while (!isModelReady && poll > 0) {
    try {
      const serverResponse = await checkServer();
      isModelReady =
        serverResponse ===
        "Maverick loaded properly. Use POST methods to retrieve predictions.";
    } catch {
      poll -= 1;
      await sleep(5000);
    }
  }

  isModelReady
    ? disposable.dispose()
    : vscode.window.showErrorMessage("Failed to load Maverick.");
}
