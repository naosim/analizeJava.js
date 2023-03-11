/*
Javaのファイルを漁ってクラス構成を分析する
---
# 実行環境 node.js
古いバージョンでも動くようにする。モダンな書き方はアロー式を使う程度にする
# 出力形式
[
  {
    filePath: string,
    className: string,
    isInterface: boolean,
    isClass: boolean,
    isDataSourceRepository: boolean, // DDDありのとき
    imports: string[],
    implements: string[],
    package: string,
    fullPackage: string,
    domainRepositoryName?: string //DDDあり、かつ、isDataSourceRepositoryがtrueのとき
  },...
]
*/

import fs from "fs";
import { searchFiles } from "./searchFiles.mjs";
import { getJavaData } from "./logic.mjs";

export function analizeJava(rootPath, isDDD) {
  return searchFiles(rootPath, ".java")
  .filter(v => v.indexOf('/src/test/') == -1) // テストコードを除外
  .map((v) => ({ filePath: v, sourceCode: fs.readFileSync(v, "utf8") }))
  .map((v) => getJavaData(v, isDDD));
}

