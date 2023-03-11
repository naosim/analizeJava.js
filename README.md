# analizeJava.js
Javaのファイルを漁ってクラス構成を分析する

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
    package: string,
    fullPackage: string,
    imports: string[],
    implements: string[],

    // 以下、isDDDがtrueの場合のみ
    isRepositoryImpl: boolean,
    isDataSourceRepository: boolean,
    isAppService: boolean,
    isOtherComponent: boolean,
    isRestController: boolean,
    isBatchMessageEndpoint: boolean,
    isDiComponent: boolean,
    domainRepositoryName: boolean,
    apiEndPoints: string[],
    apiEndPointLength: number,
  },...
]
```

## usage
### コマンドラインから使う
```
node index.js ./path/to/java/project > output.json
```

### jsから使う
```js
import { analizeJava } from "./path/to/analyzeJava/src/analizeJava.mjs";

const list = analizeJava("./path/to/java/project", true);
```