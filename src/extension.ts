import * as vscode from "vscode";
import calculate from "./features/calculate";

// 확장프로그램이 실행될 때 가장 먼저 실행되는 메서드.
export const activate = (context: vscode.ExtensionContext) => {
  console.log("🚀 VSCode Spotlight Extension is now active!");

  const runExtension = async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const input = await vscode.window.showInputBox({
      placeHolder: "Spotlight in VSCode",
    });
    if (!input) return;

    editor.edit((editBuilder) => {
      const position = editor.selection.active;
      if (!position) return;

      if (!calculate.check(input)) return;
      const result = calculate.run(input);
      editBuilder.insert(position, result);
    });
  };

  // `package.json` 파일의 `contributes.commands`에 정의된 명령어를 등록.
  const disposable = vscode.commands.registerCommand("vscode-spotlight.activate", runExtension);

  // 등록된 명령어를 확장프로그램이 종료될 때 폐기.
  context.subscriptions.push(disposable);
};

// 확장프로그램이 종료될 때 실행되는 메서드.
export const deactivate = () => {};
