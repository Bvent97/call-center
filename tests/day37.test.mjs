import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import ts from 'typescript';

async function load(path){
 const js=ts.transpileModule(readFileSync(new URL(path,import.meta.url),'utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText;
 return import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'));
}
const {day37Scenarios:scenarios}=await load('../src/day37-records.ts');
const {day36Scenarios}=await load('../src/day36-records.ts');
const {casebookScenarios}=await load('../src/account-records.ts');
const {findByReference}=await load('../src/reference-search.ts');
const original=JSON.parse(readFileSync(new URL('../src/content.json',import.meta.url),'utf8')).scenarios;
const all=[...casebookScenarios,...original,...day36Scenarios,...scenarios];
const get=id=>scenarios.find(s=>s.id===id);
const field=(id,label)=>get(id).accountFields.find(f=>f.label===label)?.value;

test('adds seven distinct scenarios while keeping all twenty records independently selectable',()=>{
 assert.equal(scenarios.length,7);
 assert.equal(scenarios.filter(s=>s.brand==='FedEx').length,4);
 assert.equal(scenarios.filter(s=>s.brand==='TXU Energy').length,3);
 assert.equal(all.length,20);
 assert.equal(new Set(all.map(s=>s.id)).size,all.length);
 for(const s of scenarios){
  assert.equal(s.source,'Day 37');
  assert.ok(s.accountFields.length<=40);
  assert.ok(s.title && s.name && s.summary && s.detail);
 }
});
test('every record has a searchable ID; invented IDs are distinct and explicitly identified',()=>{
 const assigned=all.filter(s=>/^(FDX|TXU)-100\d$/.test(s.reference));
 assert.equal(assigned.length,7);
 assert.equal(new Set(assigned.map(s=>s.reference)).size,7);
 for(const s of all){
  assert.notEqual(s.reference,'Not provided');
  assert.ok(findByReference(all,s.brand,s.reference).some(result=>result.id===s.id));
 }
 for(const s of assigned)assert.match(s.accountFields.find(f=>f.label==='ID note').value,/Fictional practice ID/);
 assert.equal(get('day37-f3').reference,'7845 9912 2046');
});
test('reused tracking IDs return each scenario without mixing their records',()=>{
 assert.deepEqual(findByReference(all,'FedEx','7940 2261 5518').map(s=>s.id),['day36-f4','day37-f1']);
 assert.deepEqual(findByReference(all,'FedEx','7810 4492 6601').map(s=>s.id),['day36-f2','day37-f2']);
 assert.equal(field('day37-f1','Shipment status'),'In transit');
 assert.equal(field('day37-f1','Apartment entered'),'21');
 assert.equal(field('day37-f1','Correct apartment'),'12');
});
test('unknown amounts and outcomes remain unconfirmed; surprise prompts do not overwrite initial facts',()=>{
 assert.equal(field('day37-t1','Current bill'),'$207.00');
 assert.equal(field('day37-t1','Previous bill'),'$142.00');
 assert.equal(field('day37-t1','Rate change'),'Not verified');
 assert.equal(field('day37-t2','Customer-reported payment'),'$142.00');
 assert.equal(field('day37-t2','Payment posting status'),'Unverified');
 assert.match(field('day37-t3','Requested start date'),/Monday/);
 assert.equal(field('day37-t3','Deposit requirements'),'Unknown');
 assert.match(get('day37-t3').detail,/Wednesday/);
 assert.equal(field('day37-f4','Live rates / exact price'),'Not available');
 assert.doesNotMatch(JSON.stringify(get('day37-f4')),/18\.40|43\.20|20\.00/);
 assert.match(get('day37-f2').detail,/coworker/);
 assert.match(get('day37-f4').detail,/fragile glass/);
});
