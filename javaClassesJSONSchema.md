## Typedefs

<dl>
<dt><a href="#JavaClassesJSONSchema">JavaClassesJSONSchema</a></dt>
<dd><p>JSON出力した時の形式</p>
</dd>
<dt><a href="#Meta">Meta</a></dt>
<dd></dd>
<dt><a href="#JavaClass">JavaClass</a></dt>
<dd></dd>
</dl>

<a name="JavaClassesJSONSchema"></a>

## JavaClassesJSONSchema
JSON出力した時の形式

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| schemaVersion | <code>string</code> | メジャーバージョンは下位互換がない時にあげる。下位互換のあるときはマイナーバージョン |
| meta | [<code>Meta</code>](#Meta) |  |
| classes | [<code>Array.&lt;JavaClass&gt;</code>](#JavaClass) |  |

<a name="Meta"></a>

## Meta
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| processDate | <code>Date</code> | 処理日 |

<a name="JavaClass"></a>

## JavaClass
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| filePath | <code>string</code> |  |
| className | <code>string</code> |  |
| isInterface | <code>boolean</code> |  |
| isClass | <code>boolean</code> |  |
| package | <code>string</code> |  |
| fullPackage | <code>string</code> |  |
| imports | <code>Array.&lt;string&gt;</code> |  |
| implements | <code>Array.&lt;string&gt;</code> |  |
| isRepositoryImpl | <code>boolean</code> | isDDDがtrueの場合のみ |
| isDataSourceRepository | <code>boolean</code> | isDDDがtrueの場合のみ |
| isAppService | <code>boolean</code> | isDDDがtrueの場合のみ |
| isOtherComponent | <code>boolean</code> | isDDDがtrueの場合のみ |
| isRestController | <code>boolean</code> | isDDDがtrueの場合のみ |
| isBatchMessageEndpoint | <code>boolean</code> | isDDDがtrueの場合のみ |
| isDiComponent | <code>boolean</code> | isDDDがtrueの場合のみ |
| domainRepositoryName | <code>string</code> | isDDDがtrueの場合のみ |
| apiEndPoints | <code>Array.&lt;string&gt;</code> | isDDDがtrueの場合のみ |
| apiEndPointLength | <code>number</code> | isDDDがtrueの場合のみ |

