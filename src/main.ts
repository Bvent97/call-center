import { Component, OnDestroy, computed, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import content from './content.json';
import { parseScenarioFile, scenarioTemplate, type PracticeScenario } from './scenario-file';
import { casebookScenarios, existingAccountFields } from './account-records';
import { day36Scenarios } from './day36-records';
import { day37Scenarios } from './day37-records';
import { findByReference } from './reference-search';

const builtIn: PracticeScenario[] = content.scenarios.map(s => ({
 id:s.id,source:'Earlier scripts',brand:s.brand as PracticeScenario['brand'],title:s.title,name:s.name,
 summary:s.stages[2].turns.flatMap(t=>t.messages).find(m=>m.role==='customer')?.text || s.title,
 reference:s.reference,status:s.status,detail:`${s.address}\n\n${s.record}`,accountFields:existingAccountFields[s.id] || []
}));

@Component({selector:'app-root',standalone:true,imports:[FormsModule],templateUrl:'./app.html'})
class App implements OnDestroy {
 appearance = signal<'dark'|'light'>(this.readAppearance());
 brand = signal<PracticeScenario['brand']>('FedEx');
 custom = signal<PracticeScenario[]>(this.readCustom());
 all = computed(()=>[...casebookScenarios,...builtIn,...day36Scenarios,...day37Scenarios,...this.custom()]);
 scenarios = computed(()=>this.all().filter(s=>s.brand===this.brand()));
 referenceQuery=signal('');
 searchMessage=signal('');
 searchResults=computed(()=>findByReference(this.all(),this.brand(),this.referenceQuery()));
 scenarioId = signal('casebook-fedex');
 scenario = computed(()=>this.all().find(s=>s.id===this.scenarioId())!);
 recordTitle = computed(()=>this.brand()==='FedEx'?'Shipment & tracking record':['day36-t1','day37-t3'].includes(this.scenario().id)?'Service request':['day36-t2','day37-t2'].includes(this.scenario().id)?'Payment & account record':'Electricity invoice');
 recordColumns = computed(()=>{
  const scenario=this.scenario();
  const fields=scenario.accountFields?.length?scenario.accountFields:[{label:'Customer',value:scenario.name},...(scenario.detail?[{label:'Case information',value:scenario.detail}]:[])];
  const rows=[{label:this.brand()==='FedEx'?'Tracking ID':'Account number',value:scenario.reference},...fields,{label:'Case status',value:scenario.status}];
  const middle=Math.ceil(rows.length/2);
  return [rows.slice(0,middle),rows.slice(middle)];
 });
 status = signal<'incoming'|'active'|'hold'|'ended'>('incoming');
 seconds = signal(0); notes=''; notice=signal('');
 importError=signal(''); draft=signal<Omit<PracticeScenario,'id'>|null>(null);
 private timer=setInterval(()=>{if(this.status()==='active')this.seconds.update(s=>s+1);},1000);
 constructor(){this.applyAppearance();}
 readAppearance():'dark'|'light'{try{return localStorage.getItem('practice-appearance')==='light'?'light':'dark';}catch{return 'dark';}}
 applyAppearance(){document.documentElement.dataset['theme']=this.appearance();}
 toggleAppearance(){this.appearance.update(value=>value==='dark'?'light':'dark');this.applyAppearance();try{localStorage.setItem('practice-appearance',this.appearance());}catch{/* The toggle still works when storage is unavailable. */}}
 ngOnDestroy(){clearInterval(this.timer);}
 get busy(){return this.status()==='active'||this.status()==='hold';}
 time(){return `${Math.floor(this.seconds()/60).toString().padStart(2,'0')}:${(this.seconds()%60).toString().padStart(2,'0')}`;}
 readCustom():PracticeScenario[]{
  try {
   const list:unknown=JSON.parse(localStorage.getItem('practice-custom-scenarios')||'[]');
   if(!Array.isArray(list))return [];
   return list.filter((s):s is PracticeScenario=>s && typeof s==='object' && ['id','brand','title','name','summary','reference','status','detail'].every(k=>typeof s[k]==='string') && s.id.startsWith('custom-') && ['FedEx','TXU Energy'].includes(s.brand))
    .map(s=>({...s,accountFields:Array.isArray(s.accountFields)?s.accountFields.filter((f:unknown):f is {label:string;value:string}=>!!f&&typeof f==='object'&&'label' in f&&'value' in f&&typeof f.label==='string'&&typeof f.value==='string').slice(0,40):[]})).slice(0,100);
  }catch{return [];}
 }
 clearSearch(){this.referenceQuery.set('');this.searchMessage.set('');}
 searchReference(){if(this.busy)return;const results=this.searchResults();if(results.length===1)this.selectScenario(results[0].id);else this.searchMessage.set(results.length?'Multiple cases found. Select the one you want to practice.':'No cases found with that ID for the selected company.');}
 changeBrand(brand:PracticeScenario['brand']){if(this.busy)return;this.clearSearch();this.brand.set(brand);this.scenarioId.set(this.scenarios()[0].id);this.reset();}
 selectScenario(id:string){if(this.busy)return;this.clearSearch();this.scenarioId.set(id);this.reset();}
 reset(){this.status.set('incoming');this.seconds.set(0);this.notice.set('');}
 answer(){if(this.status()==='incoming'){this.clearSearch();this.status.set('active');}}
 hold(){if(this.busy)this.status.set(this.status()==='hold'?'active':'hold');}
 end(){if(!this.busy)return;this.status.set('ended');}
 downloadTemplate(){
  const sample=casebookScenarios.find(s=>s.brand===this.brand())!;
  const text=this.brand()==='FedEx'?scenarioTemplate:[`Empresa: ${sample.brand}`,`Escenario: ${sample.title}`,`Cliente: ${sample.name}`,`Resumen: ${sample.summary}`,`Referencia: ${sample.reference}`,`Estado: ${sample.status}`,'Datos:',...(sample.accountFields || []).map(f=>`${f.label} | ${f.value}`),`Detalle: ${sample.detail}`,''].join('\n');
  const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));
  const a=document.createElement('a');a.href=url;a.download='plantilla-escenario.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
 }
 async importFile(event:Event){
  const input=event.target as HTMLInputElement; const file=input.files?.[0];
  this.importError.set('');this.draft.set(null);
  if(!file)return;
  try{
   if(!file.name.toLowerCase().endsWith('.txt'))throw new Error('Usa un archivo .txt con la plantilla. Los PDF no se importan directamente.');
   if(file.size>64000)throw new Error('El archivo es demasiado grande. Máximo: 64 KB.');
   this.draft.set(parseScenarioFile(await file.text()));
  }catch(e){this.importError.set(e instanceof Error?e.message:'No se pudo leer el archivo.');}
  finally{input.value='';}
 }
 addScenario(){
  const draft=this.draft();if(!draft||this.busy)return;
  if(this.custom().length>=100){this.importError.set('Ya tienes 100 escenarios importados en este navegador.');return;}
  const scenario:PracticeScenario={...draft,id:'custom-'+crypto.randomUUID()};
  const list=[...this.custom(),scenario];
  try{localStorage.setItem('practice-custom-scenarios',JSON.stringify(list));}
  catch{this.importError.set('No se pudo guardar. Revisa el almacenamiento del navegador.');return;}
  this.custom.set(list);this.brand.set(scenario.brand);this.scenarioId.set(scenario.id);this.reset();this.draft.set(null);this.notice.set('Escenario agregado. Ya puedes practicar.');
 }
}
bootstrapApplication(App).catch(console.error);
