import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import ts from 'typescript';
const source=readFileSync(new URL('../src/reference-search.ts',import.meta.url),'utf8');
const js=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText;
const {findByReference}=await import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'));
const cases=[
 {id:'f1',brand:'FedEx',reference:'7824 6130 5582'},
 {id:'f2',brand:'FedEx',reference:'Not provided'},
 {id:'t1',brand:'TXU Energy',reference:'TXU TRAINING-00482'},
 {id:'t2',brand:'TXU Energy',reference:'TXU-00482'},
 {id:'t3',brand:'TXU Energy',reference:'Not provided'}
];
test('finds tracking IDs with spaces, hyphens or partial numbers',()=>{
 for(const query of ['782461305582','7824-6130-5582','6130'])assert.deepEqual(findByReference(cases,'FedEx',query).map(s=>s.id),['f1']);
});
test('account lookup ignores casing and preserves multiple distinct cases',()=>{
 assert.deepEqual(findByReference(cases,'TXU Energy','txu training 00482').map(s=>s.id),['t1']);
 assert.deepEqual(findByReference(cases,'TXU Energy','00482').map(s=>s.id),['t1','t2']);
});
test('does not cross companies or match empty and missing IDs',()=>{
 for(const query of ['','---','not provided','unknown'])assert.deepEqual(findByReference(cases,'FedEx',query),[]);
 assert.deepEqual(findByReference(cases,'TXU Energy','782461305582'),[]);
 assert.deepEqual(findByReference(cases,'FedEx','00482'),[]);
});
