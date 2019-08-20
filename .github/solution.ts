// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as cheerio from 'cheerio';
import axios from 'axios';

export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "nature-is-amazing" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    'extension.makeMeHappy',
    async () => {
      // The code you place here will be executed every time your command is executed

      // on Startup open a new gif

      // scroll through loaded gifs https://github.com/microsoft/vscode-extension-samples/tree/master/comment-sample

      // when input make me happy internatilised siehe  https://github.com/microsoft/vscode-extension-samples/tree/master/i18n-sample

      // display progressbar https://github.com/microsoft/vscode-extension-samples/tree/master/progress-sample

      // 1. open new window to load the gif

      // 2. crawl random twitter https://twitter.com/natureamazin

      // 3. Display the tweet inside

      // Display a message box to the user

      vscode.window.showInformationMessage('Make me Happy triggered!');

      // Create and show panel
      const panel = vscode.window.createWebviewPanel(
        'makeMeHappy',
        'Make me Happy',
        vscode.ViewColumn.One,
        {
          // Enable scripts in the webview
          enableScripts: true,
        }
      );

      const tweetIDs = await fetchTweetIDs();

      if (Array.isArray(tweetIDs)) {
        const tweetID = getRandomTweetId(tweetIDs);
        panel.webview.html = getMakeMeHappyTweet(tweetID);
      }

      // And set its HTML content
    }
  );

  context.subscriptions.push(disposable);
}

function getRandomTweetId(tweetIDs: Array<string>) {
  return tweetIDs[Math.floor(Math.random() * tweetIDs.length)];
}

function fetchTweetIDs() {
  const TWITTER_USER_ENDPOINT = 'https://twitter.com/natureamazin';

  return axios.get(TWITTER_USER_ENDPOINT).then((response: any) => {
    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);
      const tweetIds = $('li.stream-item')
        .map((index, elem) => {
          return $(elem).data('itemId');
        })
        .get();
      return tweetIds;
    }
  });
}

function getMakeMeHappyTweet(tweetId: string) {
  return ` 
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cat Coding</title>
  </head>
  <body>
  <iframe border=0 frameborder=0 height=800 width=600 src="https://twitframe.com/show?url=${encodeURIComponent(
    'https://twitter.com/natureamazin/status/'
  ) + tweetId}"></iframe>  </body>
  </html>`;
}

// this method is called when your extension is deactivated
export function deactivate() {}
