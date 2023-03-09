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

const exec = require('child_process').exec
const fs = require('fs')

// ★ 各自設定をお願いします ★
var CONFIG = {
  ROOT_PATH: './', // findを開始するパス
  IS_DDD: true, // ドメイン駆動設計特有の項目有無
}


// メイン処理
exec('find ' + CONFIG.ROOT_PATH + ' -name "*.java"', (err, stdout, stderr) => {
  if (err) {
    console.log(`stderr: ${stderr}`)
    return
  }
  var javaDataList = stdout.trim().split('\n')
    .map(v => ({filePath: v, sourceCode:fs.readFileSync(v, 'utf8')}))
    .map(v => getJavaData(v, CONFIG.IS_DDD));

  // JSON出力
  console.log(JSON.stringify(javaDataList));
});