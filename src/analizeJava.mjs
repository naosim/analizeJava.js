import fs from "fs";
import { searchFiles } from "./searchFiles.mjs";
import { getJavaData } from "./logic.mjs";
import {JavaClass} from "./typedef.mjs"

/**
 * @param {{filePath: string, sourceCode: string}} obj
 * @param {boolean} isDDD
 * @returns {JavaClass[]}
 */
export function analizeJava(rootPath, isDDD) {
  return searchFiles(rootPath, ".java")
  .filter(v => v.indexOf('/src/') != -1) // リソース配下のみ対象
  .filter(v => v.indexOf('/src/test/') == -1) // テストコードを除外
  .map((v) => ({ filePath: v, sourceCode: fs.readFileSync(v, "utf8") }))
  .map((v) => getJavaData(v, isDDD));
}

