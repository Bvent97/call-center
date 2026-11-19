import type { PracticeScenario } from './scenario-file';

// Day36_Student_Readiness_Casebook.pdf, slides 8–13. Fictional training records.
// Missing identifiers are assigned simple fictional practice IDs at the user's request.
// Quotes, eligibility and outcomes remain unconfirmed where the source does not provide them.
export const day36Scenarios: PracticeScenario[] = [
 {
  id:'day36-f1',source:'Day 36',brand:'FedEx',title:'Change delivery destination',name:'Rachel Morgan',
  reference:'7824 6130 5582',status:'In transit · Change eligibility not verified',
  summary:'I need to send this package to my office in Dallas instead of my home in Austin.',
  accountFields:[
   {label:'Customer',value:'Rachel Morgan'},
   {label:'Shipment status',value:'In transit'},
   {label:'Current destination',value:'Austin, TX 78704'},
   {label:'Requested destination',value:'Dallas, TX 75201'},
   {label:'Requested change',value:'Office in Dallas instead of home in Austin'},
   {label:'Change eligibility',value:'Not verified'},
   {label:'Applicable restrictions',value:'Not confirmed in training record'},
   {label:'Change fee',value:'Not confirmed'},
   {label:'Requested delivery',value:'Tomorrow (customer request; not confirmed)'},
   {label:'Approved destination change',value:'Not confirmed'}
  ],
  detail:'Review whether a destination change is eligible before offering an option. The customer asks about an extra charge and delivery tomorrow; neither is confirmed. Practice explaining the next step without guaranteeing a fee, date or approval.'
 },
 {
  id:'day36-f2',source:'Day 36',brand:'FedEx',title:'Hold for pickup / find a location',name:'Kevin Brooks',
  reference:'7810 4492 6601',status:'Out for delivery · Pickup not confirmed',
  summary:'I will not be home. Can I pick up the package near my office?',
  accountFields:[
   {label:'Customer',value:'Kevin Brooks'},
   {label:'Shipment status',value:'Out for delivery'},
   {label:'Preferred ZIP code',value:'30309'},
   {label:'Requested option',value:'Pickup near work'},
   {label:'Reason for request',value:'Customer will not be home'},
   {label:'Hold / pickup eligibility',value:'Not confirmed'},
   {label:'Pickup location',value:'Not confirmed'},
   {label:'Pickup requirements',value:'Not provided; review needed'},
   {label:'Ready for pickup',value:'Not confirmed'}
  ],
  detail:'Check whether a hold is permitted and which locations are eligible near ZIP 30309. The customer asks whether they can go now. A nearby location does not establish that the package is ready there; explain that pickup must be confirmed first.'
 },
 {
  id:'day36-f3',source:'Day 36',brand:'FedEx',title:'Compare shipping choices',name:'Brian Thompson',
  reference:'FDX-1001',status:'Quote and service commitment not confirmed',
  summary:'I need to ship a gift. What is the cheapest way to get it there by Friday?',
  accountFields:[
   {label:'ID note',value:'Fictional practice ID; no tracking ID in source'},
   {label:'Customer',value:'Brian Thompson'},
   {label:'Origin ZIP code',value:'78701'},
   {label:'Destination ZIP code',value:'98101'},
   {label:'Weight',value:'4 lb'},
   {label:'Dimensions',value:'12 × 9 × 6 in'},
   {label:'Contents described by customer',value:'Gift'},
   {label:'Required delivery',value:'Friday (relative to the practice call)'},
   {label:'Customer priority',value:'Lowest cost among services meeting Friday'},
   {label:'Price requested by customer',value:'$20.00 (request only; not a quote)'},
   {label:'Live shipping rate',value:'Not available'},
   {label:'Eligible service / delivery commitment',value:'Not confirmed'}
  ],
  detail:'This is separate from the earlier Brian Thompson shipping-estimate case. This record has no verified quote or service commitment. The customer asks for a $20 guarantee; do not use the older $18.40 or $43.20 estimates. Compare eligible delivery dates and prices before choosing an option.'
 },
 {
  id:'day36-f4',source:'Day 36',brand:'FedEx',title:'Damaged package / contents',name:'Olivia Bennett',
  reference:'7940 2261 5518',status:'Marked delivered · Claim eligibility unknown',
  summary:'My package arrived, but the box is crushed and the item is broken.',
  accountFields:[
   {label:'Customer',value:'Olivia Bennett'},
   {label:'Tracking status',value:'Marked delivered'},
   {label:'Box condition',value:'Crushed'},
   {label:'Damaged contents',value:'Glass item broken'},
   {label:'Photos',value:'Available according to the case; images not attached'},
   {label:'Customer question',value:'Should I throw the box away?'},
   {label:'Claim eligibility',value:'Unknown'},
   {label:'Claim / refund approval',value:'Not confirmed'},
   {label:'Refund timing',value:'Not confirmed; customer requests a refund today'},
   {label:'Item value',value:'Not provided'}
  ],
  detail:'Gather the damage details and check the applicable instructions before anything is discarded. Photos can document the concern, but the training file contains no actual photos. Review the process without promising claim approval or a same-day refund.'
 },
 {
  id:'day36-t1',source:'Day 36',brand:'TXU Energy',title:'Start service at a new address',name:'Daniel Harris',
  reference:'TXU-1001',status:'Service availability and start date unconfirmed',
  summary:'I am moving next week. Can you start electricity at my new apartment?',
  accountFields:[
   {label:'ID note',value:'Fictional practice ID; no account ID in source'},
   {label:'Customer',value:'Daniel Harris'},
   {label:'Request',value:'Electricity service at a new apartment'},
   {label:'New ZIP code',value:'77002'},
   {label:'Full new service address',value:'Not provided'},
   {label:'Move-in date',value:'Next Monday (relative to the practice call)'},
   {label:'Requested activation',value:'Monday morning (not confirmed)'},
   {label:'Service availability',value:'Not confirmed'},
   {label:'Approved start date',value:'Not confirmed'},
   {label:'Old service address / end date',value:'Not provided'},
   {label:'Transfer or close old service',value:'Needs clarification'}
  ],
  detail:'Confirm the new address, preferred date and availability before confirming activation. The customer also asks whether the old service must be canceled; clarify whether the request involves a transfer or closure. No account number, approved start date or old-service end date is provided.'
 },
 {
  id:'day36-t2',source:'Day 36',brand:'TXU Energy',title:'Payment applied to wrong account?',name:'Sarah Mitchell',
  reference:'TXU-1002',status:'Balance still showing · Payment allocation unconfirmed',
  summary:'I paid one hundred forty-two dollars, but my balance is still there.',
  accountFields:[
   {label:'ID note',value:'Fictional practice ID; no account ID in source'},
   {label:'Customer',value:'Sarah Mitchell'},
   {label:'Customer-reported payment',value:'$142.00'},
   {label:'Customer-reported payment date',value:'Friday (relative to the practice call)'},
   {label:'Service accounts mentioned',value:'2'},
   {label:'Current account',value:'Still shows a balance'},
   {label:'Outstanding balance amount',value:'Not provided'},
   {label:'Payment confirmation number',value:'Not provided'},
   {label:'Payment status / allocation',value:'Not confirmed'},
   {label:'Customer concern',value:'May have paid the account for the other address'},
   {label:'Transfer of payment',value:'Requested by customer; not approved or confirmed'}
  ],
  detail:'Verify the payment date, amount, confirmation and both account details. The $142 is a customer-reported payment, not the amount due. Do not assume it was applied to the wrong account or promise an immediate transfer. Review the allocation and available process first.'
 }
];
