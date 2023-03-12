import { analizeJava } from "./src/analizeJava.mjs";
import {JavaClassesJSONSchema} from "./src/typedef.mjs"

const rootPath = process.argv[2]; // findを開始するパス
const isDDD = true; // ドメイン駆動設計特有の項目有無

// メイン処理
var javaDataList = analizeJava(rootPath, isDDD);

/** @type JavaClassesJSONSchema */
const result = {
  schemaVersion: "2.1", // メジャーバージョンは下位互換がない時にあげる。下位互換のあるときはマイナーバージョン
  meta: {
    // TODO 任意のメタデータを入れられるようにしたい。たとえばコミット番号とか入れたい。
    processDate: new Date() // 処理日
  },
  classes: javaDataList
}
// JSON出力
console.log(JSON.stringify(result));