import {pluginFunc} from "./plugin.mjs"
import {JavaClass} from "./typedef.mjs"

/**
 * javaのソースコードから情報を取り出す
 * @param {{filePath: string, sourceCode: string}} obj
 * @param {boolean} isDDD
 * @returns {JavaClass}
 */
export function getJavaData(obj, isDDD) {
  var result = {
    filePath: obj.filePath,
    className: getClassName(obj.filePath),
    isInterface: false,
    isClass: false,
    package: null,
    fullPackage: null,
    imports: [],
    implements: [],
  };
  if (isDDD) {
    result.isRepositoryImpl = false;
    result.isDataSourceRepository = false;
    result.isAppService = false;
    result.isOtherComponent = false;
    result.isRestController = false;
    result.isBatchMessageEndpoint = false;
    result.isDiComponent = false;
    result.domainRepositoryName = null;
  }

  // ソースを1行ずつ解析する
  obj.sourceCode.split("\n").forEach((line) => {
    line = line.trim();
    if (line.indexOf("package") == 0) {
      result.package = line.split("package")[1].split(";")[0].trim();
    } else if (line.indexOf("import") == 0) {
      result.imports.push(line.split("import")[1].split(";")[0].trim());
    } else if (line.indexOf("interface") != -1) {
      result.isInterface = true;
    } else {
      if (line.indexOf("class") != -1) {
        result.isClass = true;
      }
      if (line.indexOf("implements") != -1) {
        result.implements = getImplements(line);
      }
      if (isDDD && line.indexOf("@Repository") == 0) {
        result.isDataSourceRepository = true;
        result.isDiComponent = true;
      }
      if (isDDD && line.indexOf("@Service") == 0) {
        result.isAppService = true;
        result.isDiComponent = true;
      }
      if (isDDD && line.indexOf("@Component") == 0) {
        result.isOtherComponent = true;
        result.isDiComponent = true;
      }
      if (isDDD && line.indexOf("@RestController") == 0) {
        result.isRestController = true;
        result.isDiComponent = true;
      }
      if (isDDD && line.indexOf("@BatchMessageEndpoint") == 0) {
        result.isBatchMessageEndpoint = true;
        result.isDiComponent = true;
      }
    }
  });

  if (isDDD) {
    result.apiEndPoints = getApiEndPoints(obj.sourceCode);
    result.apiEndPointLength = result.apiEndPoints.length; // apiEndPointsから計算すればいいけど、おまけ
    result.fullPackage = result.package + "." + result.className;
  }

  if (isDDD && result.isDataSourceRepository) {
    result.domainRepositoryName = detectDomainRepositoryName(
      result.className,
      result.implements
    );
  }

  try {
    result = pluginFunc({...obj}, result);
  } catch(e) {
    // nop
  }

  return result;
}

/**
 * ファイル名からクラス名を取得する
 * @param {string} filePath
 * @returns
 */
export function getClassName(filePath) {
  var lastSegment = filePath.split("/").pop();
  return lastSegment.split(".")[0];
}

/**
 * APIのエンドポイント（URL）を取得する
 * @param {string} sourceCode 
 * @returns {string[]} エンドポイントのパス。1クラスに複数ある場合もあるため配列で返す。
 */
export function getApiEndPoints(sourceCode) {
  var segs = sourceCode.split('@RequestMapping(');
  if(segs.length == 1) {
    return []; // エンドポイントなし
  }

  return segs.slice(1)
    .map(v => v.split(")")[0])
    .map(v => {
      // URLのリストを取得する
      // URLはパタンが3つある
      // 通常：@RequestMapping(value = "/path/to/api", ...
      // 変数：@RequestMapping(value = URL, ...
      // 変数と文字列：@RequestMapping(value = URL + /sub/path, ...
      var value = v.split('value = ')[1].split(',')[0].trim();
      if(value.indexOf('"') == -1) {
        // 変数のみ。URLなど 
        return getStringValue(value, sourceCode);
        // return '変数のみ。URLなど ' + value;
      } else if(value.indexOf('+') != -1) {
        // 変数 + 文字列。URL + "hoge" など
        return getStringValue(value.split('+')[0].trim(), sourceCode) + value.split('"')[1];
      } else {
        return value;
      }
    }).map(v => v.split('"').join(''))
}


// ソースコードから指定した変数名の値を取得する
function getStringValue(variableName, code) {
  return code.split('\n')
    .filter(v => v.indexOf('String ' + variableName) != -1)
    .map(v => v.split('"')[1])
    .join().trim();
}


/**
 * リポジトリのクラス名からドメイン層リポジトリを推定する
 *
 * @param {string} dataSourceRepositoryClassName
 * @param {string[]} implements_
 * @returns {string | null}
 */
export function detectDomainRepositoryName(
  dataSourceRepositoryClassName,
  implements_
) {
  if (implements_.length == 0) {
    return null;
  }
  if (implements_.length == 1) {
    return implements_[0];
  } else {
    return dataSourceRepositoryClassName.split("Repository")[0] + "Repository";
  }
}

export function getImplements(line) {
  if (line.indexOf("implements") == -1) {
    throw new Error("implements not found");
  }
  // インターフェース部分を取得する。ただしジェネリクスが含まれる
  var interfaceStringWithGenerics = line.split("implements")[1].split("{")[0];
  var nest = 0;
  // ジェネリクスを抜く
  var interfaceString = interfaceStringWithGenerics
    .split("")
    .filter((v, i) => {
      if (v == "<") {
        nest++;
        return false;
      } else if (v == ">") {
        nest--;
        return false;
      }
      return nest == 0;
    })
    .join("");
  return interfaceString.split(",").map((v) => v.trim());
}
