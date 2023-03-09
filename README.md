# analizeJava.js
Javaのファイルを漁ってクラス構成を分析する
---
## 実行環境 node.js
古いバージョンでも動くようにする。モダンな書き方はアロー式を使う程度にする

## 出力形式
```
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
```
