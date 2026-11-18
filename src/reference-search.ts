import type { PracticeScenario } from './scenario-file';

const normalize=(value:string)=>value.toUpperCase().replace(/[^A-Z0-9]/g,'');
export function findByReference(scenarios:PracticeScenario[],brand:PracticeScenario['brand'],query:string):PracticeScenario[]{
 const needle=normalize(query);
 if(!needle)return [];
 return scenarios.filter(s=>s.brand===brand && !['NOTPROVIDED','NOTCONFIRMED','NOPROPORCIONADO','NOESPECIFICADO','NA'].includes(normalize(s.reference)) && normalize(s.reference).includes(needle));
}
