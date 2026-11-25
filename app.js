const fields=['prodEp','prodFil','bagEp','bagFil'];
const labels={prodEp:'Épissure',prodFil:'Fil torsadé',bagEp:'Épissure',bagFil:'Fil torsadé'};
const $=id=>document.getElementById(id);
const number=id=>Math.max(0,Math.floor(Number($(id).value)||0));
function fmt(n){return n.toLocaleString('fr-FR');}
function calculate(){
 const pEp=number('prodEp'),pFil=number('prodFil'),bEp=number('bagEp'),bFil=number('bagFil');
 const p=pEp+pFil,b=bEp+bFil,d=p-b,combined=p+b;
 $('totalProd').textContent=fmt(p);$('totalBag').textContent=fmt(b);$('totalCombined').textContent=fmt(combined);$('totalDiff').textContent=(d>0?'+':'')+fmt(d);
 $('prodSum').textContent=fmt(p)+' pièces';$('bagSum').textContent=fmt(b)+' pièces';$('finalTotal').innerHTML=fmt(combined)+' <small>pièces</small>';
 const rows=[['Épissure',pEp,bEp],['Fil torsadé',pFil,bFil]];
 $('reportRows').innerHTML=rows.map(([name,prod,bag])=>{const diff=prod-bag,total=prod+bag;const status=diff===0?'Équilibré':diff>0?'Plus en production':'Plus à Bagouda';return `<tr><td>${name}</td><td class="num">${fmt(prod)}</td><td class="num">${fmt(bag)}</td><td class="num">${diff>0?'+':''}${fmt(diff)}</td><td class="num">${fmt(total)}</td><td class="status">${status}</td></tr>`}).join('');
 $('reportFoot').innerHTML=`<tr><td>Total</td><td class="num">${fmt(p)}</td><td class="num">${fmt(b)}</td><td class="num">${d>0?'+':''}${fmt(d)}</td><td class="num">${fmt(combined)}</td><td>${d===0?'Équilibré':d>0?'Écart production':'Écart Bagouda'}</td></tr>`;
 const now=new Date();localStorage.setItem('inv_prod_bag',JSON.stringify({pEp,pFil,bEp,bFil,updated:now.toISOString()}));$('lastSaved').textContent='Dernière mise à jour : '+now.toLocaleString('fr-FR');$('statusBanner').textContent='✓ Calcul mis à jour automatiquement — données sauvegardées sur cet appareil';}
function load(){const saved=localStorage.getItem('inv_prod_bag');if(saved){try{const x=JSON.parse(saved);$('prodEp').value=x.pEp||0;$('prodFil').value=x.pFil||0;$('bagEp').value=x.bEp||0;$('bagFil').value=x.bFil||0;}catch(e){}}}
function exportCsv(){const data=[['Famille','Production','Bagouda','Écart','Total cumulé'],['Épissure',number('prodEp'),number('bagEp'),number('prodEp')-number('bagEp'),number('prodEp')+number('bagEp')],['Fil torsadé',number('prodFil'),number('bagFil'),number('prodFil')-number('bagFil'),number('prodFil')+number('bagFil')],['Total',number('prodEp')+number('prodFil'),number('bagEp')+number('bagFil'),number('prodEp')+number('prodFil')-number('bagEp')-number('bagFil'),number('prodEp')+number('prodFil')+number('bagEp')+number('bagFil')]];const csv='\ufeff'+data.map(r=>r.map(v=>'"'+String(v).replaceAll('"','""')+'"').join(';')).join('\n');const blob=new Blob([csv],{type:'text/csv;charset=utf-8'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='rapport-inventaire-production-bagouda.csv';a.click();URL.revokeObjectURL(a.href);}
fields.forEach(id=>$(id).addEventListener('input',calculate));$('printBtn').addEventListener('click',()=>window.print());$('csvBtn').addEventListener('click',exportCsv);$('resetBtn').addEventListener('click',()=>{if(confirm('Réinitialiser toutes les quantités à zéro ?')){fields.forEach(id=>$(id).value=0);calculate();}});
$('dateLabel').textContent=new Date().toLocaleDateString('fr-FR',{weekday:'long',day:'2-digit',month:'long',year:'numeric'});load();calculate();
