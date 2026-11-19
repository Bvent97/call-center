import type { PracticeScenario } from './scenario-file';

// Day37_Student_Readiness_Casebook.pdf, slides 5–11. Fictional training records.
// FDX-1002 and TXU-1003–1005 are simulator IDs added where the PDF has none.
// Surprise prompts remain separate from the initial facts of each case.
export const day37Scenarios: PracticeScenario[] = [
 {
  id:'day37-f1',source:'Day 37',brand:'FedEx',title:'Delivery address correction',name:'Olivia Bennett',
  reference:'7940 2261 5518',status:'In transit · Correction eligibility unknown',
  summary:'The apartment number on my package says 21, but I live in 12.',
  accountFields:[
   {label:'Customer',value:'Olivia Bennett'},
   {label:'Shipment status',value:'In transit'},
   {label:'Destination',value:'Atlanta, GA 30309'},
   {label:'Apartment entered',value:'21'},
   {label:'Correct apartment',value:'12'},
   {label:'Requested change',value:'Correct apartment number before delivery'},
   {label:'Correction eligibility',value:'Unknown'},
   {label:'Correction approval',value:'Not confirmed'},
   {label:'Delivery today',value:'Requested by customer; not confirmed'}
  ],
  detail:'Confirm the apartment number and review correction eligibility before offering an option. No correction or delivery date is guaranteed. Optional role-play change: the customer later says the package was delivered yesterday. Clarify that new report against the initial in-transit record before deciding the next step.'
 },
 {
  id:'day37-f2',source:'Day 37',brand:'FedEx',title:'Hold at a location',name:'Kevin Brooks',
  reference:'7810 4492 6601',status:'Out for delivery · Hold and location unconfirmed',
  summary:'I will not be home today. Could I pick up my package near work?',
  accountFields:[
   {label:'Customer',value:'Kevin Brooks'},
   {label:'Shipment status',value:'Out for delivery'},
   {label:'Preferred pickup ZIP code',value:'30309'},
   {label:'Requested option',value:'Pickup near office'},
   {label:'Hold eligibility',value:'Not confirmed'},
   {label:'Pickup location',value:'Not confirmed'},
   {label:'Ready for pickup',value:'Not confirmed'},
   {label:'Pickup authorization / requirements',value:'Not verified'}
  ],
  detail:'Review both an eligible location and shipment availability. A nearby location does not mean the package is there or ready. Optional role-play change: the customer says a coworker will collect it instead. Clarify the collector and verify the applicable authorization requirements; collection is not yet approved.'
 },
 {
  id:'day37-f3',source:'Day 37',brand:'FedEx',title:'Damaged package',name:'Daniel Foster',
  reference:'7845 9912 2046',status:'Delivered · Damage report needs review',
  summary:'My package arrived, but the box is crushed and something inside is broken.',
  accountFields:[
   {label:'Customer',value:'Daniel Foster'},
   {label:'Tracking status',value:'Delivered'},
   {label:'Box condition',value:'Crushed'},
   {label:'Contents condition in record',value:'May be damaged; inspection not confirmed'},
   {label:'Customer report',value:'Something inside is broken'},
   {label:'Photos',value:'Available per training record; images not attached'},
   {label:'Customer question',value:'Should I throw the box away?'},
   {label:'Claim eligibility',value:'Not checked'},
   {label:'Refund approval / timing',value:'Not confirmed'},
   {label:'Contents / value',value:'Not specified in initial record'}
  ],
  detail:'Document the condition and review the reporting process before advising disposal of packaging. No immediate refund is confirmed. Optional role-play change: the customer says the contents were a birthday gift. Clarify the contents and documentation without treating the occasion as claim approval.'
 },
 {
  id:'day37-f4',source:'Day 37',brand:'FedEx',title:'Compare delivery options',name:'Brian Thompson',
  reference:'FDX-1002',status:'Live quote and delivery commitment unconfirmed',
  summary:'What is the least expensive option for sending a gift that arrives by Friday?',
  accountFields:[
   {label:'ID note',value:'Fictional practice ID; no tracking ID in source'},
   {label:'Customer',value:'Brian Thompson'},
   {label:'Origin',value:'Austin, TX 78701'},
   {label:'Destination',value:'Seattle, WA 98101'},
   {label:'Weight',value:'4 lb'},
   {label:'Dimensions',value:'12 × 9 × 6 in'},
   {label:'Contents described by customer',value:'Gift'},
   {label:'Required delivery',value:'Friday (relative to the practice call)'},
   {label:'Customer priorities',value:'Lowest cost and arrival by Friday'},
   {label:'Planned shipping date',value:'Not provided'},
   {label:'Live rates / exact price',value:'Not available'},
   {label:'Service meeting deadline',value:'Not confirmed'}
  ],
  detail:'Confirm when the customer plans to ship and compare eligible dates and live quotes before confirming a price. Do not inherit estimates from other Brian Thompson scenarios. Optional role-play change: the customer says the package contains fragile glass. Clarify packaging and service requirements before revising the comparison.'
 },
 {
  id:'day37-t1',source:'Day 37',brand:'TXU Energy',title:'Unexpected high bill',name:'Emily Parker',
  reference:'TXU-1003',status:'Higher bill · Rate change not verified',
  summary:'My electricity bill is $207. Last month it was $142. Why did it go up?',
  accountFields:[
   {label:'ID note',value:'Fictional practice ID; no account ID in source'},
   {label:'Customer',value:'Emily Parker'},
   {label:'Current bill',value:'$207.00'},
   {label:'Previous bill',value:'$142.00'},
   {label:'Energy usage',value:'kWh use increased; exact figures not provided'},
   {label:'Energy charges',value:'Included; amount not provided'},
   {label:'Delivery charges',value:'Included; amount not provided'},
   {label:'Rate change',value:'Not verified'},
   {label:'Cause of increase',value:'Not confirmed'},
   {label:'Service address / billing periods',value:'Not provided'}
  ],
  detail:'Compare usage, rates and charges separately without attributing blame or assuming a rate increase. Optional role-play change: the customer mentions an air conditioner running all weekend. Treat this as additional customer-reported context; it does not establish the exact cause or amount of the increase.'
 },
 {
  id:'day37-t2',source:'Day 37',brand:'TXU Energy',title:'Payment not reflected',name:'Marcus Lee',
  reference:'TXU-1004',status:'Balance visible · Payment posting unverified',
  summary:'I paid $142 on Tuesday, but my account still shows a balance. I have two accounts.',
  accountFields:[
   {label:'ID note',value:'Fictional practice ID; no account ID in source'},
   {label:'Customer',value:'Marcus Lee'},
   {label:'Customer-reported payment',value:'$142.00'},
   {label:'Customer-reported payment date',value:'Tuesday (relative to the practice call)'},
   {label:'Service accounts mentioned',value:'2'},
   {label:'Outstanding balance',value:'Still visible; amount not provided'},
   {label:'Payment posting status',value:'Unverified'},
   {label:'Payment destination account',value:'Not verified'},
   {label:'Second account ID / service addresses',value:'Not provided'},
   {label:'Payment confirmation number',value:'Not provided'},
   {label:'Balance removal / adjustment',value:'Not approved or confirmed'}
  ],
  detail:'Verify the intended service address, payment reference and both account records before concluding that the payment went to the wrong account. The $142 is a reported payment, not a confirmed balance. Optional role-play change: the customer says they have a confirmation email. Review its details without assuming the payment has posted or promising immediate balance removal.'
 },
 {
  id:'day37-t3',source:'Day 37',brand:'TXU Energy',title:'Start service after moving',name:'Sofia Ramirez',
  reference:'TXU-1005',status:'Address, activation and deposit unconfirmed',
  summary:'I am moving next week. I need electricity at my new apartment on Monday.',
  accountFields:[
   {label:'ID note',value:'Fictional practice ID; no account ID in source'},
   {label:'Customer',value:'Sofia Ramirez'},
   {label:'New service city',value:'Dallas, TX'},
   {label:'Full new service address',value:'Not provided; not yet verified'},
   {label:'Requested start date',value:'Monday (relative to the practice call)'},
   {label:'Service availability',value:'Unknown'},
   {label:'Deposit requirements',value:'Unknown'},
   {label:'Approved activation date',value:'Not confirmed'},
   {label:'Old address / service request',value:'Needs clarification'}
  ],
  detail:'Confirm the new service address, requested date and applicable requirements before confirming activation or a deposit waiver. Optional role-play change: the move-in date changes to Wednesday. Clarify the revised requested start date and review availability again; neither date is approved in the initial record.'
 }
];
