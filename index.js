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

import { analizeJava } from "./src/analizeJava.mjs";

const rootPath = process.argv[2]; // findを開始するパス
const isDDD = true; // ドメイン駆動設計特有の項目有無

// メイン処理
var javaDataList = analizeJava(rootPath, isDDD);
// JSON出力
console.log(JSON.stringify(javaDataList));