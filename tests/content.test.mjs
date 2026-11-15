import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const data = JSON.parse(readFileSync(new URL('../src/content.json', import.meta.url), 'utf8'));

test('all five scenarios have seven ordered stages and complete A/B/C alternatives', () => {
 assert.equal(data.scenarios.length, 5);
 for (const scenario of data.scenarios) {
  assert.deepEqual(scenario.stages.map(s => s.number), [1,2,3,4,5,6,7]);
  for (const stage of scenario.stages) {
   assert.ok(stage.turns.length > 0);
   for (const turn of stage.turns) {
    assert.ok(turn.options.length === 0 || turn.options.length === 3, `${scenario.id}, stage ${stage.number}`);
    for (const option of turn.options) assert.ok(option.length > 10 && !option.includes('AGENT B:'));
    for (const message of turn.messages) assert.ok(message.text && ['customer','system'].includes(message.role));
   }
  }
 }
});
test('interview questions have unique sequential IDs and bilingual text', () => {
 assert.deepEqual(data.questions.map(q => q.id), Array.from({length:28},(_,i)=>i+1));
 for (const q of data.questions) { assert.ok(q.en.endsWith('?') || q.en.endsWith('.')); assert.ok(q.es.length > 8); }
});
test('vocabulary extraction keeps terms, meanings and examples aligned', () => {
 assert.equal(data.vocab.length,58);
 assert.equal(data.vocab.find(v=>v.term==='Tracking number').es,'Número de rastreo');
 assert.equal(data.vocab.find(v=>v.term==='Pending payment').example,'Your payment may still be pending.');
 for (const v of data.vocab) assert.ok(v.example.endsWith('.') || v.example.endsWith('?'));
});
