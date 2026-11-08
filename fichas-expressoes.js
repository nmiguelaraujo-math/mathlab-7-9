(()=>{'use strict';
const E=window.MathLabExpressions,$=id=>document.getElementById(id),years={7:['linguagem','valor','reducao','distributiva','equivalencia','problemas'],8:['monomios','adicao','multiplicacao','escondidas','demonstracoes','problemas'],9:['desenvolver','identificar','fatorizar','equivalencia']},names={linguagem:'Linguagem algébrica',valor:'Valor numérico',reducao:'Redução de termos',distributiva:'Propriedade distributiva',equivalencia:'Expressões equivalentes',problemas:'Problemas e figuras',monomios:'Monómios',adicao:'Adição e subtração',multiplicacao:'Multiplicação',escondidas:'Polinómio em falta',demonstracoes:'Demonstrações',desenvolver:'Desenvolver casos notáveis',identificar:'Reconhecer e completar',fatorizar:'Fatorização'};
const root=$('sheetMode');if(!root||!E)return;
const css=document.createElement('style');css.textContent=`
.ws-card{background:#fff;border:1px solid #d8e2ef;border-radius:18px;padding:24px;margin:18px 0;box-shadow:0 5px 20px #17345a0d}.ws-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.ws-grid label{font-weight:800}.ws-type-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:11px}.ws-check{display:block;border:2px solid #d8e2ef;border-radius:12px;padding:14px;cursor:pointer}.ws-check.active{border-color:#315ee7;background:#eaf0ff}.ws-check input{width:auto;margin-right:8px}.ws-check span{display:block;color:#59697f;font-size:.83rem;font-weight:500;margin:5px 0 0 25px}.ws-quantity{display:grid;grid-template-columns:minmax(220px,1fr) 120px;align-items:center;gap:12px;padding:9px 0;border-bottom:1px solid #e5ebf3}.ws-stepper{display:grid;grid-template-columns:34px 48px 34px;gap:3px}.ws-stepper button{padding:6px}.ws-stepper input{text-align:center;padding:6px}.ws-total{display:flex;justify-content:space-between;gap:15px;margin:16px 0}.ws-toolbar{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin-bottom:16px}.ws-paper{box-sizing:border-box;width:210mm;max-width:100%;min-height:297mm;margin:0 auto;padding:19mm 19mm 17mm;background:#fff;color:#171717;font-family:Arial,Helvetica,sans-serif;font-size:11pt;line-height:1.5;box-shadow:0 2px 18px #1c29431a;border:1px solid #e3e3e3}.ws-paper-header{border-bottom:1px solid #333;padding-bottom:8mm;margin-bottom:7mm}.ws-paper-header h1{font-size:15pt;margin:0 0 2mm;color:#111}.ws-paper-header p{font-size:10pt;margin:0;color:#444}.ws-student{display:grid;grid-template-columns:minmax(0,1fr) 25mm 39mm;gap:4mm;margin-bottom:9mm;font-size:10pt}.ws-student span{white-space:nowrap}.ws-section{margin-bottom:7mm}.ws-section h2{font-size:11pt;margin:0 0 4mm}.ws-question{display:grid;grid-template-columns:9mm minmax(0,1fr);gap:2mm;margin-bottom:6mm;break-inside:avoid;page-break-inside:avoid;min-height:27mm}.ws-question.problem{min-height:40mm}.ws-question .ws-number{font-weight:normal}.ws-prompt{margin:0 0 2mm}.ws-math{margin:2mm 0;text-align:left}.ws-math mjx-container[display="true"]{text-align:left!important;margin:2mm 0!important}.ws-question .problem-svg{max-width:110mm;max-height:58mm}.ws-credit{font-size:8pt;color:#666;border-top:1px solid #aaa;margin-top:10mm;padding-top:3mm;text-align:center;break-inside:avoid}.ws-solution{break-inside:avoid;border-top:1px solid #ddd;padding:4mm 0}.ws-solution mjx-container[display="true"]{text-align:left!important;margin:2mm 0!important}.ws-paper.show-solutions .student-only{display:none}.ws-paper:not(.show-solutions) .solutions-only{display:none}.ws-empty{padding:14px;background:#fff4df;border-radius:10px}.ws-paper .ws-statement strong{font-weight:normal}@media(max-width:740px){.ws-grid,.ws-type-grid,.ws-toolbar{grid-template-columns:1fr}.ws-quantity{grid-template-columns:1fr auto}.ws-paper{width:100%;min-height:0;padding:18px}.ws-student{grid-template-columns:1fr;gap:5px}}
@media print{@page{size:A4;margin:19mm 19mm 20mm}html,body{background:#fff!important}body.print-worksheet>header,body.print-worksheet>footer{display:none!important}body.print-worksheet main{max-width:none!important;width:100%!important;margin:0!important;padding:0!important}body.print-worksheet main>*:not(#sheetMode){display:none!important}body.print-worksheet #sheetMode,body.print-worksheet #wsPreview{display:block!important;margin:0!important;padding:0!important;border:0!important;box-shadow:none!important}body.print-worksheet #sheetMode>*:not(#wsPreview){display:none!important}body.print-worksheet .ws-toolbar{display:none!important}body.print-worksheet #wsPaper{width:100%!important;max-width:none!important;min-height:0!important;margin:0!important;padding:0!important;border:0!important;box-shadow:none!important}body.print-worksheet .ws-question{min-height:25mm}body.print-worksheet .ws-question.problem{min-height:38mm}body.print-worksheet .ws-section{margin-bottom:5mm}}

/* V4 — folha A4 limpa, sem negritos nos conteúdos e sem molduras de interface */
.ws-paper,.ws-paper *{font-weight:400!important}
.ws-paper{font-family:Arial,Helvetica,sans-serif;font-size:10.5pt;line-height:1.38}
.ws-paper-header,.ws-paper header.ws-paper-header{display:block!important;background:#fff!important;color:#171717!important;border-radius:0!important;box-shadow:none!important;text-align:left!important;padding:0 0 6mm!important;margin:0 0 6mm!important;min-height:0!important;max-width:none!important}
.ws-paper-header h1{font-weight:400!important;font-size:15pt!important;margin:0 0 2mm!important}
.ws-paper-header p{font-weight:400!important;font-size:10pt!important}
.ws-student{display:flex!important;justify-content:space-between;gap:4mm;margin-bottom:8mm;font-size:9pt;align-items:baseline;white-space:nowrap}
.ws-student span:first-child{flex:1}
.ws-student span{font-weight:400!important}
.ws-section{margin-bottom:4mm!important}
.ws-section h2{font-weight:400!important;font-size:11pt!important;margin:0 0 4mm!important;border:0!important}
.ws-question{min-height:19mm!important;margin-bottom:4mm!important;line-height:1.4!important}
.ws-question.problem{min-height:28mm!important}
.ws-question .ws-number,.ws-question .ws-prompt{font-weight:400!important}
.ws-math{margin:1mm 0!important;text-align:left!important}
.ws-paper mjx-container,.ws-paper mjx-container *{font-weight:400!important}
.ws-paper mjx-container[display="true"]{text-align:left!important;margin:1mm 0!important}
.ws-credit{font-weight:400!important;margin-top:8mm!important;font-size:7.5pt!important}
.ws-paper .solutions-only{break-before:page;page-break-before:always}
@media print{
 @page{size:A4;margin:21mm 19mm 20mm}
 body.print-worksheet header:not(.ws-paper-header){display:none!important}
 body.print-worksheet .ws-paper-header,body.print-worksheet #wsPaper .ws-paper-header{background:#fff!important;border-radius:0!important;box-shadow:none!important;padding:0 0 6mm!important}
 body.print-worksheet .ws-paper{border:0!important;border-radius:0!important;box-shadow:none!important}
 body.print-worksheet .ws-question{min-height:19mm!important;margin-bottom:4mm!important}
 body.print-worksheet .ws-question.problem{min-height:28mm!important}
 body.print-worksheet .ws-section{margin-bottom:4mm!important}
 body.print-worksheet .ws-credit{margin-top:7mm!important}
 body.print-worksheet .ws-paper .solutions-only{break-before:page;page-break-before:always}
}

/* V5: paginação real A4 com espaço proporcional à complexidade */
.ws-paper{width:100%!important;max-width:none!important;min-height:0!important;padding:0!important;border:0!important;background:transparent!important;box-shadow:none!important}
.ws-page{box-sizing:border-box;width:210mm;max-width:100%;min-height:297mm;padding:19mm 19mm 18mm;background:#fff;margin:0 auto 18px;border:1px solid #e3e3e3;box-shadow:0 2px 18px #1c29431a;font-family:Arial,Helvetica,sans-serif;font-size:10.5pt;line-height:1.38;color:#171717}
.ws-page,.ws-page *{font-weight:400!important}
.ws-page mjx-container,.ws-page mjx-container *{font-weight:400!important}
.ws-page .ws-paper-header{padding-bottom:5mm!important;margin-bottom:5mm!important}
.ws-page .ws-student{margin-bottom:8mm!important}
.ws-page .ws-group-heading{font-size:11pt;font-weight:400!important;margin:0 0 4mm;break-after:avoid}
.ws-page .ws-question{min-height:21mm!important;margin-bottom:0!important;padding-bottom:3mm;break-inside:avoid;page-break-inside:avoid}
.ws-page .ws-question.ws-complexity-2{min-height:29mm!important}
.ws-page .ws-question.problem{min-height:40mm!important}
.ws-page .ws-prompt{font-size:10.5pt;margin-bottom:2mm}
.ws-page .ws-credit{margin-top:7mm}
.ws-page .solutions-only{display:none}
.ws-paper:not(.show-solutions) .ws-page.solutions-only{display:none!important}
.ws-paper.show-solutions .ws-page.student-only{display:none!important}
.ws-paper.show-solutions .ws-page.solutions-only{display:block!important}
@media(max-width:740px){.ws-page{width:100%;min-height:0;padding:18px}.ws-page .ws-student{display:grid!important;grid-template-columns:1fr!important;white-space:normal}}
@media print{
 @page{size:A4;margin:0}
 html,body{margin:0!important;padding:0!important}
 body.print-worksheet #wsPaper{padding:0!important;margin:0!important;overflow:visible!important}
 body.print-worksheet .ws-page{width:210mm!important;max-width:none!important;min-height:297mm!important;max-height:297mm!important;box-sizing:border-box!important;padding:19mm 19mm 18mm!important;margin:0!important;border:0!important;box-shadow:none!important;break-after:page;page-break-after:always;overflow:hidden!important}
 body.print-worksheet .ws-page:last-child{break-after:auto;page-break-after:auto}
 body.print-worksheet .ws-page .ws-question{min-height:21mm!important;margin-bottom:0!important}
 body.print-worksheet .ws-page .ws-question.ws-complexity-2{min-height:29mm!important}
 body.print-worksheet .ws-page .ws-question.problem{min-height:40mm!important}
 body.print-worksheet .ws-page .ws-credit{margin-top:7mm!important}
 body.print-worksheet .ws-paper:not(.show-solutions) .ws-page.solutions-only{display:none!important}
 body.print-worksheet .ws-paper.show-solutions .ws-page.student-only{display:none!important}
}

/* V6: medidas calibradas para folhas A4; enunciados sem negrito */
.ws-page{padding:17mm 18mm 16mm!important}
.ws-page .ws-paper-header{margin-bottom:4mm!important;padding-bottom:4mm!important}
.ws-page .ws-student{display:flex!important;flex-direction:row!important;flex-wrap:nowrap!important;align-items:center!important;justify-content:space-between!important;gap:3mm!important;margin:0 0 6mm!important;white-space:nowrap!important}
.ws-page .ws-student span{display:inline-block!important;flex:0 0 auto!important;font-size:9pt!important;white-space:nowrap!important}
.ws-page .ws-student span:first-child{flex:1 1 auto!important;min-width:0!important}
.ws-page .ws-group-heading{margin:2mm 0 3mm!important;font-size:10.5pt!important}
.ws-page .ws-question{min-height:17mm!important;padding-bottom:1mm!important;margin:0!important}
.ws-page .ws-question.ws-complexity-2{min-height:23mm!important}
.ws-page .ws-question.problem{min-height:34mm!important}
.ws-page .ws-credit{margin-top:5mm!important}
.ws-page mjx-container{font-weight:400!important}
.ws-page mjx-container[display="true"]{margin:1mm 0!important}
@media print{
 body.print-worksheet .ws-page{padding:17mm 18mm 16mm!important;min-height:297mm!important;max-height:297mm!important}
 body.print-worksheet .ws-page .ws-question{min-height:17mm!important;padding-bottom:1mm!important}
 body.print-worksheet .ws-page .ws-question.ws-complexity-2{min-height:23mm!important}
 body.print-worksheet .ws-page .ws-question.problem{min-height:34mm!important}
 body.print-worksheet .ws-page .ws-student{display:flex!important;flex-direction:row!important;flex-wrap:nowrap!important}
}
`;document.head.append(css);
root.innerHTML=`<section class="ws-card ws-builder"><h2>Criar ficha de trabalho</h2><p>Define a composição da ficha. Os exercícios utilizam os geradores do treino livre.</p><div class="ws-grid"><label>Ano<select id="wsYear"><option value="7">7.º ano</option><option value="8">8.º ano</option><option value="9">9.º ano</option></select></label><label>Grau de dificuldade<select id="wsLevel"><option value="1">Principiante</option><option value="2">Intermédio</option><option value="3">Especialista</option></select></label><label>Organização<select id="wsOrder"><option value="grouped">Agrupar por tipo</option><option value="mixed">Misturar exercícios</option></select></label></div><h3>1. Tipos de exercício</h3><div id="wsTypes" class="ws-type-grid"></div><h3>2. Número de questões</h3><div id="wsQuantities"></div><div class="ws-total"><span id="wsWarning"></span><strong>Total: <b id="wsTotal">0</b> questões</strong></div><button id="wsGenerate" class="primary">Gerar ficha</button></section><section id="wsPreview" class="ws-card hidden-mode"><div class="ws-toolbar"><button id="wsBack">Alterar configuração</button><button id="wsRegenerate">Gerar outra ficha</button><button id="wsSolutions">Ver soluções</button><button id="wsPrint" class="primary">Imprimir / Guardar PDF</button></div><article id="wsPaper" class="ws-paper"></article></section>`;
const categories={7:[{name:'Conceitos e cálculo',keys:['linguagem','valor','reducao']},{name:'Propriedades e equivalências',keys:['distributiva','equivalencia']},{name:'Problemas e aplicações',keys:['problemas']}],8:[{name:'Monómios e polinómios',keys:['monomios','adicao','multiplicacao']},{name:'Expressões e demonstrações',keys:['escondidas','demonstracoes']},{name:'Problemas e aplicações',keys:['problemas']}],9:[{name:'Casos notáveis',keys:['desenvolver','identificar']},{name:'Fatorização',keys:['fatorizar']},{name:'Simplificação e equivalências',keys:['equivalencia']}]};
const escapeHTML=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let items=[],showSolutions=false,recent=[];try{recent=JSON.parse(sessionStorage.getItem('mathlab-expressions-recent')||'[]')}catch{}
function drawTypes(){const y=+$('wsYear').value;const selected=new Set([...root.querySelectorAll('[data-group]:checked')].map(e=>+e.dataset.group));$('wsTypes').innerHTML=categories[y].map((g,i)=>`<label class="ws-check ${selected.size?selected.has(i)?'active':'':i===0?'active':''}"><input type="checkbox" data-group="${i}" ${selected.size?selected.has(i)?'checked':'':i===0?'checked':''}><strong>${g.name}</strong><span>${g.keys.map(k=>names[k]).join(' · ')}</span></label>`).join('');root.querySelectorAll('[data-group]').forEach(e=>e.onchange=()=>{e.closest('.ws-check').classList.toggle('active',e.checked);drawQuantities()});drawQuantities()}
function drawQuantities(){const y=+$('wsYear').value;let html='';categories[y].forEach((g,i)=>{if(!root.querySelector(`[data-group="${i}"]`)?.checked)return;html+=`<h4>${g.name}</h4>`;g.keys.forEach((k,j)=>{const def=i===0?2:1;html+=`<div class="ws-quantity"><span>${names[k]}</span><div class="ws-stepper"><button type="button" data-step="-1" data-key="${k}">−</button><input id="q_${k}" data-topic="${k}" type="number" min="0" max="15" value="${def}"><button type="button" data-step="1" data-key="${k}">+</button></div></div>`})});$('wsQuantities').innerHTML=html||'<div class="ws-empty">Seleciona pelo menos um tipo de exercício.</div>';root.querySelectorAll('[data-step]').forEach(b=>b.onclick=()=>{let input=$('q_'+b.dataset.key);input.value=Math.max(0,Math.min(15,+input.value+(+b.dataset.step)));total()});root.querySelectorAll('[data-topic]').forEach(e=>e.oninput=total);total()}
function total(){let n=[...root.querySelectorAll('[data-topic]')].reduce((sum,e)=>sum+(+e.value||0),0);$('wsTotal').textContent=n;$('wsWarning').textContent=n>30?'Máximo de 30 questões.':n>20?'Ficha extensa: considera reduzir o número de questões.':'';$('wsGenerate').disabled=!n||n>30}
function sig(ex){return String(ex.statement||ex.visualHtml||'').replace(/\s+/g,' ').trim()+'|'+ex.prompt}
function pickExercise(y,l,k,used,families){let best=null,score=-Infinity;for(let t=0;t<220;t++){let ex=E.generate(y,l,k),signature=sig(ex);if(used.has(signature))continue;if(y===9&&k==='fatorizar'&&['fator-comum-racional','fator-comum'].includes(ex.family))continue;
if(y===9&&l===3&&k==='fatorizar'&&!(/fator-comum-x|fator-comum-polinomial|dois-passos|encadead/.test(ex.family)))continue;let repetition=families[ex.family]||0;
let value=(recent.includes(signature)?-120:0)-repetition*250+Math.random()*3;
if(y===7&&l===3&&ex.family?.startsWith('v10-7-'))value+=45;
if(y===8&&l===3&&ex.family?.startsWith('v10-8-'))value+=45;
if(y===7&&l===3&&/v9-reducao-(?:terms|ordered)|v9-distributiva-single/.test(ex.family))value-=100;
if(y===8&&l===3&&/v9-monomio-(?:degree|coefficient)|v9-demonstracao-(?:even-sum|odd-sum)/.test(ex.family))value-=100;
if(y===7&&l===3&&/valor-numerico-linear|termos-semelhantes|distributiva-positiva/.test(ex.family))value-=200;
if(y===8&&l===3&&/demonstracao-even|demonstracao-odd|monomio-coeficiente$/.test(ex.family))value-=150;
if(y===9&&k==='fatorizar'&&l===3&&/fator-comum-polinomial|fator-comum-x/.test(ex.family))value+=12;
if(y===9&&l===1&&/irracional|encadead/.test(ex.family))value-=300;if(value>score){score=value;best=ex}if(t>=35&&value>=1&&!(families[ex.family]||0))break}if(!best){for(let retry=0;retry<50;retry++){const ex=E.generate(y,l,k);if(!used.has(sig(ex))&&!(y===9&&l===3&&k==='fatorizar'&&!(/fator-comum-x|fator-comum-polinomial|dois-passos|encadead/.test(ex.family)))){best=ex;break}}}if(!best)throw Error('Não foi possível gerar exercício de '+k);used.add(sig(best));families[best.family]=(families[best.family]||0)+1;return best}
function statement(ex){if(ex.visualHtml)return `<div class="ws-math">${ex.visualHtml}</div>`;if(ex.isText)return `<p>${escapeHTML(ex.statement)}</p>`;return `<div class="ws-math">\\[${ex.statement}\\]</div>`}
function typeset(){if(window.MathJax?.typesetPromise){MathJax.typesetClear?.();MathJax.typesetPromise().catch(console.error)}}
function complexity(ex){
 const str=String(ex.statement||'');
 const family=String(ex.family||'');
 if(ex.visualHtml||ex.isText)return 2;
 if(/irracional|encadead|polinomio-comum|fator-comum-polinomio/.test(family)||/\\sqrt/.test(str))return 2;
 if(str.length>105||(/\\frac/.test(str)&&str.length>65))return 2;
 if(/^(reconhecer|completar)/.test(family)||/quadrado/.test(ex.prompt))return 1;
 return 1;
}
function pagePlan(rows,first){
 // Planeamento em milímetros: espaço útil entre margens A4.
 // O cabeçalho e identificação ocupam cerca de 49 mm na primeira página.
 // O rodapé é reservado na última página.
 const pages=[];let current=[],remaining=first?202:247;
 rows.forEach(row=>{
   const height=row.heading?8:row.height;
   if(current.length&&(height>remaining||(row.heading&&remaining<27))){pages.push(current);current=[];remaining=247}
   current.push(row);remaining-=height;
 });
 if(current.length)pages.push(current);
 // Nunca deixar uma página final com um único exercício.
 if(pages.length>1&&pages[pages.length-1].filter(r=>!r.heading).length===1){
   const previous=pages[pages.length-2],last=pages[pages.length-1];
   const movable=previous.pop();
   if(movable?.heading){previous.push(movable)}
   else last.unshift(movable);
 }
 return pages;
}
function render(){
 const y=+$('wsYear').value,l=+$('wsLevel').value,levels=['','Principiante','Intermédio','Especialista'],grouped=$('wsOrder').value==='grouped';
 let number=0,rows=[],lastCategory='';
 const makeRow=({k,ex})=>{
   const category=categories[y].find(g=>g.keys.includes(k))?.name||'Exercícios';
   if(grouped&&category!==lastCategory){rows.push({heading:true,title:category});lastCategory=category}
   const c=complexity(ex),h=ex.visualHtml?44:ex.isText?34:c===2?23:17;
   rows.push({heading:false,height:h,html:`<div class="ws-question ws-complexity-${c} ${ex.visualHtml||ex.isText?'problem':''}"><span class="ws-number">${++number}.</span><div class="ws-statement"><p class="ws-prompt">${escapeHTML(ex.prompt)}</p>${statement(ex)}</div></div>`});
 };
 items.forEach(makeRow);
 const planned=pagePlan(rows,true);
 const header=`<header class="ws-paper-header"><h1>Ficha de trabalho — Expressões algébricas</h1><p>${y}.º ano · ${levels[l]}</p></header><div class="ws-student"><span>Nome: _______________________________</span><span>Turma: ______</span><span>Data: ____ / ____ / ______</span></div>`;
 const footer=`<footer class="ws-credit">© 2026 — Nuno Araújo · MathLab 7–9 · nmiguelaraujo-math.github.io/mathlab-7-9</footer>`;
 const pages=planned.map((page,i)=>`<section class="ws-page student-only">${i===0?header:''}<div class="ws-page-questions">${page.map(r=>r.heading?`<h2 class="ws-group-heading">${escapeHTML(r.title)}</h2>`:r.html).join('')}</div>${i===planned.length-1?footer:''}</section>`).join('');
 const solutions=`<section class="ws-page solutions-only"><h2>Soluções e resoluções</h2>`+items.map(({ex},i)=>`<div class="ws-solution"><p>${i+1}. ${escapeHTML(ex.prompt)}</p>${statement(ex)}<p>\\[${ex.answerTex||ex.answer}\\]</p>${ex.steps.map(st=>`<p>${escapeHTML(st[0])}</p><div class="ws-math">\\[${st[1]}\\]</div>`).join('')}</div>`).join('')+'</section>';
 $('wsPaper').classList.remove('show-solutions');
 $('wsPaper').innerHTML=pages+solutions;
 root.querySelector('.ws-builder').classList.add('hidden-mode');$('wsPreview').classList.remove('hidden-mode');$('wsSolutions').textContent='Ver soluções';typeset();
}
function build(){let y=+$('wsYear').value,l=+$('wsLevel').value,counts=[...root.querySelectorAll('[data-topic]')].map(e=>({k:e.dataset.topic,n:Math.min(15,Math.max(0,+e.value||0))}));if(!counts.some(c=>c.n))return;items=[];const used=new Set(),families={};try{for(const {k,n} of counts)for(let i=0;i<n;i++)items.push({k,ex:pickExercise(y,l,k,used,families)})}catch(e){alert('Erro ao gerar a ficha: '+e.message);console.error(e);return}if($('wsOrder').value==='mixed')for(let i=items.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[items[i],items[j]]=[items[j],items[i]]}recent=[...items.map(({ex})=>sig(ex)),...recent].slice(0,250);try{sessionStorage.setItem('mathlab-expressions-recent',JSON.stringify(recent))}catch{}showSolutions=false;render()}
$('wsYear').value=$('year').value;$('wsLevel').value=$('level').value;drawTypes();$('wsYear').onchange=drawTypes;$('wsGenerate').onclick=build;$('wsRegenerate').onclick=build;$('wsBack').onclick=()=>{$('wsPreview').classList.add('hidden-mode');root.querySelector('.ws-builder').classList.remove('hidden-mode')};$('wsSolutions').onclick=()=>{if(!items.length)return;showSolutions=!showSolutions;$('wsPaper').classList.toggle('show-solutions',showSolutions);$('wsSolutions').textContent=showSolutions?'Ver ficha do aluno':'Ver soluções';typeset()};$('wsPrint').onclick=()=>{document.body.classList.add('print-worksheet');window.print();window.addEventListener('afterprint',()=>document.body.classList.remove('print-worksheet'),{once:true})};
})();