// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */

function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    //console.log('Hello Friend, extension "DevDocsTab" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json

    function get_uri() {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }

        const url = "https://devdocs.io/";
        let keyword = "";

        // selection.
        var selection = editor.selection;
        if (!selection.isEmpty) {
            keyword = editor.document.getText(selection);
        } else {
            const position = editor.selection.active;
            const range = editor.document.getWordRangeAtPosition(position);
            keyword = editor.document.getText(range);
        }

        // Safety checks
        if (keyword.length == 0) {
            vscode.window.showErrorMessage(
                "DevDocsTab: Null string in text variable."
            );
            keyword = "";
        }
        if (keyword.indexOf("\n") >= 0) {
            vscode.window.showErrorMessage(
                "DevDocsTab: Multiline selection not allowed for your security."
            );
            keyword = "";
        }

        // Open URI
        let uri = vscode.Uri.parse(url + "#q=" + keyword);
        //vscode.commands.executeCommand('vscode.open', uri);
        return uri;
    }

    function htmlMaker(url) {
        const html = `
			<style>
    body { margin: 0; background-color: #121212; }
    iframe{ position: fixed; top: 0; left: 0 }
    </style>
			<iframe src=${url} width="100%"" height="100%" frameborder="0"  scrolling="yes"></iframe>`;
        return html;
    }

    let currentPanel = undefined;

    let homeCommand = vscode.commands.registerCommand("DevDocsTab.home", function () {
        // The code you place here will be executed every time your command is executed
        const columnToShowIn = vscode.ViewColumn.Two;

        if (currentPanel) {
            // If we already have a panel, show it in the target column
            currentPanel.reveal(columnToShowIn);
            currentPanel.webview.html = htmlMaker("https://devdocs.io/");
        } else {
            // Otherwise, create a new panel
            currentPanel = vscode.window.createWebviewPanel(
                "DevDocs",
                "DevDocs.io",
                columnToShowIn,
                {
                    enableScripts: true,
                    retainContextWhenHidden: true,
                    enableCommandUris: true,
                }
            );
            currentPanel.webview.html = htmlMaker("https://devdocs.io/");
            // Reset when the current panel is closed
            currentPanel.onDidDispose(
                () => {
                    currentPanel = undefined;
                },
                null,
                context.subscriptions
            );
        }
    });

    let searchCommand = vscode.commands.registerCommand("DevDocsTab.search", function () {
        // The code you place here will be executed every time your command is executed
        const columnToShowIn = vscode.ViewColumn.Two;

        if (currentPanel) {
            // If we already have a panel, show it in the target column
            currentPanel.reveal(columnToShowIn);
            currentPanel.webview.html = htmlMaker(get_uri());
        } else {
            // Otherwise, create a new panel
            currentPanel = vscode.window.createWebviewPanel(
                "DevDocs",
                "DevDocs.io",
                columnToShowIn,
                {
                    enableScripts: true,
                    retainContextWhenHidden: true,
                    enableCommandUris: true,
                }
            );
            currentPanel.webview.html = htmlMaker(get_uri());
            // Reset when the current panel is closed
            currentPanel.onDidDispose(
                () => {
                    currentPanel = undefined;
                },
                null,
                context.subscriptions
            );
        }
    });

    let preferencesCommand = vscode.commands.registerCommand("DevDocsTab.preferences", function () {
        // The code you place here will be executed every time your command is executed
        const columnToShowIn = vscode.ViewColumn.Two;

        if (currentPanel) {
            // If we already have a panel, show it in the target column
            currentPanel.reveal(columnToShowIn);
            currentPanel.webview.html = htmlMaker("https://devdocs.io/settings");
        } else {
            // Otherwise, create a new panel
            currentPanel = vscode.window.createWebviewPanel(
                "DevDocs",
                "DevDocs.io",
                columnToShowIn,
                {
                    enableScripts: true,
                    retainContextWhenHidden: true,
                    enableCommandUris: true,
                }
            );
            currentPanel.webview.html = htmlMaker("https://devdocs.io/settings");
            // Reset when the current panel is closed
            currentPanel.onDidDispose(
                () => {
                    currentPanel = undefined;
                },
                null,
                context.subscriptions
            );
        }
    });

    let offlineCommand = vscode.commands.registerCommand("DevDocsTab.offline", function () {
        // The code you place here will be executed every time your command is executed
        const columnToShowIn = vscode.ViewColumn.Two;

        if (currentPanel) {
            // If we already have a panel, show it in the target column
            currentPanel.reveal(columnToShowIn);
            currentPanel.webview.html = htmlMaker("https://devdocs.io/offline");
        } else {
            // Otherwise, create a new panel
            currentPanel = vscode.window.createWebviewPanel(
                "DevDocs",
                "DevDocs.io",
                columnToShowIn,
                {
                    enableScripts: true,
                    retainContextWhenHidden: true,
                    enableCommandUris: true,
                }
            );
            currentPanel.webview.html = htmlMaker("https://devdocs.io/offline");
            // Reset when the current panel is closed
            currentPanel.onDidDispose(
                () => {
                    currentPanel = undefined;
                },
                null,
                context.subscriptions
            );
        }
    });

    context.subscriptions.push(homeCommand, searchCommand, preferencesCommand, offlineCommand)
        
}

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
    activate,
    deactivate,
};
