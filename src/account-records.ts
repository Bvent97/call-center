import type { AccountField, PracticeScenario } from './scenario-file';

// Fictional training facts transcribed from the user's Day 31 casebook image.
export const casebookScenarios: PracticeScenario[] = [
 {
  id:'casebook-fedex',brand:'FedEx',title:'Delivered but missing · Casebook',name:'Taylor Brooks',
  summary:'Tracking says delivered, but the package is not at the apartment door or reception.',
  reference:'FDX-TRAIN-782104',status:'Location unconfirmed; review needed',
  detail:'The customer cannot locate a replacement laptop adapter. Review the tracking events and delivery note. The record does not confirm the package location or its value.',
  accountFields:[
   {label:'Sender',value:'Harbor Office Supply'},
   {label:'Recipient',value:'Taylor Brooks'},
   {label:'Destination',value:'410 Pine Street, Apt 3C, Austin, TX'},
   {label:'Estimated delivery',value:'November 6, 2026'},
   {label:'Nov 5, 8:20 AM',value:'Out for delivery'},
   {label:'Nov 5, 3:42 PM',value:'Delivered — status posted'},
   {label:'Delivery note',value:'Left near building reception entrance'},
   {label:'Customer report',value:'No package at apartment door or reception'},
   {label:'Contents',value:'Replacement laptop adapter'},
   {label:'Value',value:'Not verified'},
   {label:'Proof of delivery',value:'Not available in training record'}
  ]
 },
 {
  id:'casebook-txu',brand:'TXU Energy',title:'High electricity bill · Casebook',name:'Morgan Rivera',
  summary:'My electricity bill is $206. Last month the new charges were $142.',
  reference:'TXU TRAINING-00482',status:'Amount due · $206.00',
  detail:'The previous balance was paid in full. Compare the current and prior usage and review each charge. The record does not confirm why consumption increased or whether a payment arrangement is available.',
  accountFields:[
   {label:'Customer',value:'Morgan Rivera'},
   {label:'Service address',value:'218 Cedar Lane, Dallas, TX'},
   {label:'Statement issued',value:'November 3, 2026'},
   {label:'Service period',value:'Oct 1–Oct 31, 2026 (31 days)'},
   {label:'Previous balance',value:'$48.00'},
   {label:'Payment received Oct 28',value:'−$48.00'},
   {label:'Electricity usage',value:'1,180 kWh'},
   {label:'Energy charge',value:'1,180 kWh × $0.115 = $135.70'},
   {label:'Delivery charge',value:'1,180 kWh × $0.046 = $54.28'},
   {label:'Monthly base charge',value:'$9.95'},
   {label:'Illustrative taxes / fees',value:'$6.07'},
   {label:'New charges',value:'$206.00'},
   {label:'Amount due',value:'$206.00'},
   {label:'Due date',value:'November 20, 2026'},
   {label:'Prior month usage',value:'720 kWh'},
   {label:'Prior month new charges',value:'$142.00'}
  ]
 }
];

// Only facts present in the existing classroom material are included.
export const existingAccountFields: Record<string, AccountField[]> = {
 delay:[
  {label:'Recipient',value:'Michael Reynolds'},
  {label:'Destination',value:'Denver, CO 80203'},
  {label:'Original estimated delivery',value:'Yesterday (relative to the practice call)'},
  {label:'Last scan',value:'6:40 AM · Regional facility'},
  {label:'Shipment status',value:'In transit'},
  {label:'Reason for delay',value:'Not confirmed in training record'},
  {label:'New delivery date',value:'Not confirmed'}
 ],
 missing:[
  {label:'Recipient',value:'Emily Carter'},
  {label:'Destination',value:'4827 Willow Creek Drive, Apt 2B, Columbus, OH 43215'},
  {label:'Delivery scan',value:'Tuesday, 2:14 PM · Delivered'},
  {label:'Delivery note',value:'Front entrance'},
  {label:'Delivery photo',value:'Brown package by a blue planter'},
  {label:'Customer report',value:'Photo does not match the entrance; no blue planter'},
  {label:'Practice report',value:'MP-10482'},
  {label:'Package location',value:'Not confirmed'}
 ],
 shipping:[
  {label:'Customer',value:'Brian Thompson'},
  {label:'Origin',value:'Austin, TX 78701'},
  {label:'Destination',value:'Seattle, WA 98101'},
  {label:'Weight',value:'4 lb'},
  {label:'Dimensions',value:'12 × 9 × 6 in'},
  {label:'Ground estimate',value:'$18.40 · Fictional practice estimate'},
  {label:'Faster service estimate',value:'$43.20 · Fictional practice estimate'},
  {label:'Final price / delivery date',value:'Not confirmed'}
 ],
 bill:[
  {label:'Customer',value:'Jennifer Williams'},
  {label:'Service address',value:'7308 Maple Street, Dallas, TX 75214'},
  {label:'Current bill',value:'$221.00'},
  {label:'Prior month bill',value:'$168.00'},
  {label:'Current usage',value:'1,240 kWh'},
  {label:'Prior month usage',value:'910 kWh'},
  {label:'Energy charges',value:'$149.80'},
  {label:'Delivery charges',value:'$54.20'},
  {label:'Base charge',value:'$9.95'},
  {label:'Taxes / fees',value:'$7.05'},
  {label:'Adjustment / arrangement',value:'Not approved in training record'}
 ],
 payment:[
  {label:'Customer',value:'Robert Anderson'},
  {label:'Service address',value:'916 Pine Ridge Lane, Houston, TX 77002'},
  {label:'Statement amount',value:'$184.60'},
  {label:'Customer-reported payment date',value:'November 10'},
  {label:'Payment status',value:'Pending; not yet posted'},
  {label:'Posting date',value:'Not confirmed'},
  {label:'Duplicate charge',value:'Not confirmed in training record'}
 ]
};
