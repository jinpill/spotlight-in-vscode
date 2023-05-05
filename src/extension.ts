import * as vscode from "vscode";
import calculate from "./features/calculate";
import px2rem from "./features/px2rem";

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

      // 연산식인 경우 실행.
      if (calculate.check(input)) {
        const result = calculate.run(input);
        editBuilder.insert(position, result);
        return;
      }

      // to rem 키워드가 포함된 경우 실행.
      if (px2rem.check(input)) {
        const result = px2rem.run(input);
        editBuilder.insert(position, result);
        return;
      }
    });
  };

  // `package.json` 파일의 `contributes.commands`에 정의된 명령어를 등록.
  const disposable = vscode.commands.registerCommand("vscode-spotlight.activate", runExtension);

  // 등록된 명령어를 확장프로그램이 종료될 때 폐기.
  context.subscriptions.push(disposable);
};

// 확장프로그램이 종료될 때 실행되는 메서드.
export const deactivate = () => {};
