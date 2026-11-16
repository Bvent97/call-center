export interface AccountField { label: string; value: string; }
export interface PracticeScenario {
 id: string;
 brand: 'FedEx' | 'TXU Energy';
 title: string;
 name: string;
 summary: string;
 reference: string;
 status: string;
 detail: string;
 accountFields?: AccountField[];
}
export const scenarioTemplate = `Empresa: FedEx
Escenario: Address correction
Cliente: Sarah Miller
Resumen: Customer needs to correct the delivery address
Referencia: 7946 2108 5632
Estado: In transit
Datos:
Delivery address | 410 Pine Street, Apt 3C, Austin, TX
Last tracking update | In transit
Requested change | Correct apartment number
Change eligibility | Not confirmed; review needed
Detalle: The customer noticed an incorrect apartment number. Ask for the correct address, review the available options, and explain that a change is not guaranteed.
`;
export function parseScenarioFile(text: string): Omit<PracticeScenario, 'id'> {
 if (text.length > 64000) throw new Error('El archivo es demasiado largo. Usa la plantilla con un solo escenario.');
 const allowed = ['Empresa','Escenario','Cliente','Resumen','Referencia','Estado','Detalle','Datos'];
 const fields: Record<string,string> = {};
 const accountFields: AccountField[] = [];
 let key = '';
 for (const line of text.replace(/^\uFEFF/,'').split(/\r?\n/)) {
  if (!line.trim()) continue;
  const match = /^([^:]+):\s*(.*)$/.exec(line);
  if (match && allowed.includes(match[1].trim())) {
   key = match[1].trim();
   if (Object.hasOwn(fields,key)) throw new Error(`El campo ${key} está repetido.`);
   fields[key] = match[2].trim();
  } else if (key === 'Datos') {
   const separator = line.indexOf('|');
   if (separator < 1) throw new Error('En Datos, usa una línea por campo: Nombre | Valor.');
   const label = line.slice(0, separator).trim();
   const value = line.slice(separator + 1).trim();
   if (!label || !value || label.length > 100 || value.length > 1000) throw new Error('Cada dato necesita un nombre (máximo 100 caracteres) y un valor (máximo 1000).');
   if (accountFields.length >= 40) throw new Error('Puedes incluir hasta 40 datos por escenario.');
   accountFields.push({label,value});
  } else if (key === 'Detalle') {
   fields[key] += '\n' + line.trim();
  } else {
   throw new Error('Formato no reconocido. Usa los nombres de campo de la plantilla.');
  }
 }
 for (const field of allowed.slice(0,6)) {
  if (!fields[field]) throw new Error(`Falta el campo ${field}.`);
  if (fields[field].length > 250) throw new Error(`El campo ${field} debe tener menos de 250 caracteres.`);
 }
 if (fields.Empresa !== 'FedEx' && fields.Empresa !== 'TXU Energy') throw new Error('Empresa debe ser FedEx o TXU Energy.');
 if ((fields.Detalle || '').length > 6000) throw new Error('El detalle debe tener menos de 6000 caracteres.');
 return {brand:fields.Empresa,title:fields.Escenario,name:fields.Cliente,summary:fields.Resumen,reference:fields.Referencia,status:fields.Estado,detail:fields.Detalle || '',accountFields};
}
