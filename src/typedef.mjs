
/**
 * JSON出力した時の形式
 * @typedef JavaClassesJSONSchema
 * @property {string} schemaVersion - メジャーバージョンは下位互換がない時にあげる。下位互換のあるときはマイナーバージョン
 * @property {Meta} meta 
 * @property {JavaClass[]} classes
 */
export var JavaClassesJSONSchema;

/**
 * @typedef Meta
 * @property {Date} processDate - 処理日
 */
export var Meta;

/**
 * @typedef JavaClass
 * @property {string} filePath
 * @property {string} className
 * @property {boolean} isInterface
 * @property {boolean} isClass
 * @property {string} package
 * @property {string} fullPackage
 * @property {string[]} imports
 * @property {string[]} implements
 * @property {boolean} isRepositoryImpl - isDDDがtrueの場合のみ
 * @property {boolean} isDataSourceRepository - isDDDがtrueの場合のみ
 * @property {boolean} isAppService - isDDDがtrueの場合のみ
 * @property {boolean} isOtherComponent - isDDDがtrueの場合のみ
 * @property {boolean} isRestController - isDDDがtrueの場合のみ
 * @property {boolean} isBatchMessageEndpoint - isDDDがtrueの場合のみ
 * @property {boolean} isDiComponent - isDDDがtrueの場合のみ
 * @property {string} domainRepositoryName - isDDDがtrueの場合のみ
 * @property {string[]} apiEndPoints - isDDDがtrueの場合のみ
 * @property {number} apiEndPointLength - isDDDがtrueの場合のみ
 */
export var JavaClass;
