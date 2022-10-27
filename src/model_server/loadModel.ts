import * as vscode from "vscode";
import * as path from "path";
import { exec, execSync } from "child_process";
import fetch from "node-fetch";

import { getConfig } from "../config";

export async function loadModel() {
  const archToMaverickImage: Record<string, string> = {
    "darwin-arm64": "linux-arm-64",
    "darwin-x64": "linux-amd-64",
    "linux-arm64": "linux-arm-64",
    "linux-x64": "linux-amd-64",
    "win32-x64": "windows-amd-64",
  };
  const config = getConfig();
  const port = config.settings.port;
  const systemArch = `${process.platform}-${process.arch}`;

  const maverickImageRepository = "yurts/maverick";
  const maverickImageTag = archToMaverickImage[systemArch];
  if (!maverickImageTag) {
    const unsupportedArchError = `Maverick cannot be ran on ${systemArch}`;
    console.error(unsupportedArchError);
    vscode.window.showErrorMessage(unsupportedArchError);
    throw new Error(unsupportedArchError);
  }
  const maverickImage = `${maverickImageRepository}:${maverickImageTag}`;

  // Stop and remove any existing containers
  let deletedContainers = "";
  try {
    deletedContainers = execSync(
      `docker rm -f $(docker ps -q --filter ancestor=${maverickImage})`
    ).toString();
    console.log("Container deleted: ", deletedContainers);
  } catch (err: any) {
    console.log("No previous containers found.");
  }

  // Remove any existing images
  let deletedImages = "";
  try {
    deletedImages = execSync(
      `docker image rm -f $(docker images -q ${maverickImage})`
    ).toString();
    console.log("Images deleted: ", deletedImages);
  } catch (err: any) {
    console.log("No previous images found.");
  }

  const modelDockerfilePath = path.resolve(__dirname);
  const modelDockerContainerName = `${maverickImageTag}-${new Date().getTime()}`;
  const modelLoadCmd =
    `docker build -t ${maverickImageRepository}:${maverickImageTag} ${modelDockerfilePath} && ` +
    `docker run --name ${modelDockerContainerName} -d -p ${port}:9401 ${maverickImageRepository}:${maverickImageTag}`;
  exec(modelLoadCmd, (error, stdout, stderr) => {
    if (error !== null) {
      console.log(error);
    }
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

  // Allow model to load/deploy for up to 10 minutes
  // 120 polls * 5000 ms = 600000 ms = 10 minutes
  const disposable = vscode.window.setStatusBarMessage(
    "Maverick loading... This message will auto-clear when it is ready."
  );
  let poll = 120;
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

  let containerLogs = "";
  disposable.dispose();

  if (!isModelReady) {
    try {
      containerLogs = execSync(
        `docker logs ${modelDockerContainerName}`
      ).toString();
    } catch (err: any) {
      containerLogs = err.toString();
    } finally {
      vscode.window.showErrorMessage("Failed to load Maverick.");
      vscode.window.showErrorMessage(containerLogs);
      console.error(containerLogs);
      throw new Error("Failed to load Maverick.");
    }
  }

  vscode.window.showInformationMessage(
    "Maverick ready. Use CMD/CTRL + SHIFT + M to generate code."
  );
}
