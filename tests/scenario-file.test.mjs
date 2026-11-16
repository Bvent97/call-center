import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
const source=readFileSync(new URL('../src/scenario-file.ts',import.meta.url),'utf8');
const js=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText;
const {parseScenarioFile,scenarioTemplate}=await import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'));
const recordsSource=readFileSync(new URL('../src/account-records.ts',import.meta.url),'utf8');
const recordsJs=ts.transpileModule(recordsSource,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText;
const {casebookScenarios}=await import('data:text/javascript;base64,'+Buffer.from(recordsJs).toString('base64'));
test('template imports a complete scenario and supports Windows line endings',()=>{
 const s=parseScenarioFile('\uFEFF'+scenarioTemplate.replaceAll('\n','\r\n'));
 assert.equal(s.brand,'FedEx');assert.equal(s.name,'Sarah Miller');assert.equal(s.reference,'7946 2108 5632');
 assert.ok(s.detail.includes('not guaranteed'));
});
test('rejects missing fields, duplicates, unsupported brands and excessive input',()=>{
 assert.throws(()=>parseScenarioFile(scenarioTemplate.replace('Cliente: Sarah Miller','')),/Cliente/);
 assert.throws(()=>parseScenarioFile('Empresa: FedEx\n'+scenarioTemplate),/repetido/);
 assert.throws(()=>parseScenarioFile(scenarioTemplate.replace('Empresa: FedEx','Empresa: Other')),/Empresa/);
 assert.throws(()=>parseScenarioFile('x'.repeat(64001)),/largo/);
 assert.throws(()=>parseScenarioFile('not a scenario'),/Formato/);
});
test('imports TXU and preserves multiline case information as plain text',()=>{
 const s=parseScenarioFile(scenarioTemplate.replace('Empresa: FedEx','Empresa: TXU Energy')+'Customer: I already paid.\n<script>alert(1)</script>');
 assert.equal(s.brand,'TXU Energy');assert.ok(s.detail.includes('Customer: I already paid.'));assert.ok(s.detail.endsWith('<script>alert(1)</script>'));
});
test('imports structured account data and keeps times and formulas intact',()=>{
 const s=parseScenarioFile(scenarioTemplate);
 assert.equal(s.accountFields.length,4);
 const invoice=parseScenarioFile(readFileSync(new URL('../public/ejemplo-txu.txt',import.meta.url),'utf8'));
 const shipment=parseScenarioFile(readFileSync(new URL('../public/ejemplo-fedex.txt',import.meta.url),'utf8'));
 assert.deepEqual(invoice.accountFields,casebookScenarios.find(s=>s.brand==='TXU Energy').accountFields);
 assert.deepEqual(shipment.accountFields,casebookScenarios.find(s=>s.brand==='FedEx').accountFields);
 assert.equal(shipment.accountFields.find(f=>f.label==='Nov 5, 8:20 AM').value,'Out for delivery');
 assert.equal(invoice.accountFields.find(f=>f.label==='Energy charge').value,'1,180 kWh × $0.115 = $135.70');
});
test('old templates still import without structured account fields',()=>{
 const old=scenarioTemplate.replace(/Datos:\n[\s\S]*?(?=Detalle:)/,'');
 assert.equal(parseScenarioFile(old).name,'Sarah Miller');
 assert.deepEqual(parseScenarioFile(old).accountFields,[]);
});
test('rejects malformed and excessive account rows',()=>{
 assert.throws(()=>parseScenarioFile(scenarioTemplate.replace('Delivery address |','Delivery address ')),/Nombre \| Valor/);
 assert.throws(()=>parseScenarioFile(scenarioTemplate.replace('Datos:\n','Datos:\n'+'Field | Value\n'.repeat(41))),/40 datos/);
 assert.throws(()=>parseScenarioFile(scenarioTemplate.replace('Datos:\n','Datos:\nEmpty | \n')),/Cada dato/);
});
