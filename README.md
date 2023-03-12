# analizeJava.js
Javaのファイルを漁ってクラス構成を分析する

## 実行環境 node.js
古いバージョンでも動くようにする。モダンな書き方はアロー式を使う程度にする

## 出力形式
schemaVersion: "2.1"
```
{
  schemaVersion: string, // メジャーバージョンは下位互換がない時にあげる。下位互換のあるときはマイナーバージョン
  meta: {
    processDate: Date // 処理日
  },
  classes: [
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
}
```
最新の情報は[こちら](./javaClassesJSONSchema.md)

## usage
### コマンドラインから使う
```
node index.js ./path/to/java/project > javaClasses.json
```

### jsから使う
```js
import { analizeJava } from "./path/to/analyzeJava/src/analizeJava.mjs";

/** @type JavaClasses */
const list = analizeJava("./path/to/java/project", true);
```

## 開発
### 出力フォーマットのドキュメント生成
```
./node_modules/.bin/jsdoc2md -c jsdoc.conf src/typedef.mjs > javaClassesJSONSchema.md
```
