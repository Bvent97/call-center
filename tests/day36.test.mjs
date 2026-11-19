import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import ts from 'typescript';
async function loadSource(path){
 const source=readFileSync(new URL(path,import.meta.url),'utf8');
 const js=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText;
 return import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'));
}
const {day36Scenarios:scenarios}=await loadSource('../src/day36-records.ts');
const {casebookScenarios,existingAccountFields}=await loadSource('../src/account-records.ts');
const original=JSON.parse(readFileSync(new URL('../src/content.json',import.meta.url),'utf8')).scenarios;
const get=id=>scenarios.find(s=>s.id===id);
const field=(id,label)=>get(id).accountFields.find(f=>f.label===label)?.value;

test('Day 36 adds six independent records without reusing existing note IDs',()=>{
 assert.equal(scenarios.length,6);
 assert.equal(scenarios.filter(s=>s.brand==='FedEx').length,4);
 assert.equal(scenarios.filter(s=>s.brand==='TXU Energy').length,2);
 const all=[...casebookScenarios,...original,...scenarios];
 assert.equal(new Set(all.map(s=>s.id)).size,all.length);
 for(const s of scenarios){assert.equal(s.source,'Day 36');assert.ok(s.accountFields.length<40);}
 assert.deepEqual(casebookScenarios.map(s=>s.id),['casebook-fedex','casebook-txu']);
});
test('source tracking IDs are preserved and missing IDs get simple fictional practice references',()=>{
 assert.equal(get('day36-f1').reference,'7824 6130 5582');
 assert.equal(get('day36-f2').reference,'7810 4492 6601');
 assert.equal(get('day36-f4').reference,'7940 2261 5518');
 for(const [id,reference] of [['day36-f3','FDX-1001'],['day36-t1','TXU-1001'],['day36-t2','TXU-1002']]){
  assert.equal(get(id).reference,reference);
  assert.match(field(id,'ID note'),/Fictional practice ID/);
 }
});
test('Brian Thompson Day 36 has no inherited quote or confirmed delivery commitment',()=>{
 assert.equal(field('day36-f3','Live shipping rate'),'Not available');
 assert.match(field('day36-f3','Price requested by customer'),/request only; not a quote/);
 assert.doesNotMatch(JSON.stringify(get('day36-f3').accountFields),/18\.40|43\.20/);
 assert.match(existingAccountFields.shipping.find(f=>f.label==='Ground estimate').value,/18\.40/);
 assert.match(field('day36-f3','Required delivery'),/Friday/);
});
test('TXU payment reports and move-in requests do not become confirmed balances or dates',()=>{
 assert.equal(field('day36-t2','Customer-reported payment'),'$142.00');
 assert.equal(field('day36-t2','Outstanding balance amount'),'Not provided');
 assert.equal(field('day36-t2','Payment status / allocation'),'Not confirmed');
 assert.match(field('day36-t1','Move-in date'),/Next Monday \(relative/);
 assert.equal(field('day36-t1','Approved start date'),'Not confirmed');
});
