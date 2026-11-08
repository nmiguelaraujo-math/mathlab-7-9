/* MathLab Fichas  — 2026-11-05 */
(()=>{'use strict';
const $=s=>document.querySelector(s),levels=['','Principiante','Intermédio','Especialista'];
const structures={sem:'Sem parênteses nem denominadores',com:'Com parênteses',denom:'Com denominadores',ambos:'Com parênteses e denominadores'};
const mode=$('#worksheetMode');
mode.innerHTML=`<section class="ws-card ws-builder"><h2>Criar ficha de trabalho</h2><p>Define a composição da ficha. Os exercícios usam os mesmos geradores do treino livre.</p>
<div class="ws-grid"><label>Ano<select id="wsYear"><option value="7">7.º ano</option><option value="8">8.º ano</option><option value="9">9.º ano · Recordar</option></select></label><label>Grau de dificuldade<select id="wsLevel"><option value="1">Principiante</option><option value="2">Intermédio</option><option value="3">Especialista</option></select></label><label>Organização<select id="wsOrder"><option value="grouped">Agrupar por tipo</option><option value="mixed">Misturar exercícios</option></select></label></div>
<h3>1. Tipos de exercício</h3><div class="ws-type-grid"><label class="ws-check active"><input id="wsCalc" type="checkbox" checked><strong>Resolver equações</strong><span>Procedimentos e conjunto-solução.</span></label><label class="ws-check"><input id="wsErrors" type="checkbox"><strong>Seleção e análise de erros</strong><span>Identificar, escolher e corrigir.</span></label><label class="ws-check"><input id="wsProblems" type="checkbox"><strong>Problemas</strong><span>Modelar e interpretar.</span></label></div>
<h3>2. Número de questões</h3><div id="wsQuantities"></div><div class="ws-total"><span id="wsWarning"></span><strong>Total: <b id="wsTotal">0</b> questões</strong></div><button id="wsGenerate" class="btn-gerar">Gerar ficha</button></section>
<section id="wsPreview" class="ws-card hidden-mode"><div class="ws-toolbar"><button id="wsBack">Alterar configuração</button><button id="wsRegenerate">Gerar outra ficha</button><button id="wsSolutions">Ver soluções</button><button id="wsPrint" class="btn-gerar">Imprimir / Guardar PDF</button></div><article id="wsPaper" class="ws-paper"></article></section>`;
document.head.insertAdjacentHTML('beforeend',`<style>
.mode-switch{grid-template-columns:repeat(3,1fr)!important}.ws-card{background:#fff;border:1px solid #d8e2ef;border-radius:18px;padding:24px;margin:18px 0;box-shadow:0 5px 20px #17345a0d}.ws-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.ws-grid label{font-weight:800}.ws-type-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:11px}.ws-check{display:block;border:2px solid #d8e2ef;border-radius:12px;padding:14px;cursor:pointer}.ws-check.active{border-color:#315ee7;background:#eaf0ff}.ws-check input{width:auto;margin-right:8px}.ws-check span{display:block;color:#59697f;font-size:.83rem;font-weight:500;margin:5px 0 0 25px}.ws-quantity{display:grid;grid-template-columns:minmax(220px,1fr) 120px;align-items:center;gap:12px;padding:9px 0;border-bottom:1px solid #e5ebf3}.ws-stepper{display:grid;grid-template-columns:34px 48px 34px;gap:3px}.ws-stepper button{padding:6px}.ws-stepper input{text-align:center;padding:6px}.ws-disabled{opacity:.45}.ws-total{display:flex;justify-content:space-between;gap:15px;margin:16px 0}.ws-total span{color:#a33b32}.ws-toolbar{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:16px}.ws-paper{max-width:800px;margin:auto;color:#111;background:#fff;padding:25px}.ws-paper-header{text-align:center;border-bottom:2px solid #1e3150;padding-bottom:12px}.ws-student{display:grid;grid-template-columns:2fr 1fr 1fr;gap:18px;margin:22px 0}.ws-section{margin:25px 0}.ws-question{break-inside:avoid;margin:18px 0;min-height:62px}.ws-question.problem{min-height:100px}.ws-solution{break-inside:avoid;border-top:1px solid #d9e0e8;padding:12px 0}.ws-solution .answer{color:#168763;font-weight:800}.ws-empty{padding:14px;background:#fff4df;border-radius:10px}.ws-paper.show-solutions .student-only{display:none}.ws-paper:not(.show-solutions) .solutions-only{display:none}@media(max-width:740px){.ws-grid,.ws-type-grid,.ws-toolbar{grid-template-columns:1fr}.ws-quantity{grid-template-columns:1fr auto}.ws-student{grid-template-columns:1fr}}
@media print{body.print-worksheet>*{display:none!important}body.print-worksheet .container{display:block!important;max-width:none!important}.print-worksheet .container>*{display:none!important}.print-worksheet #worksheetMode,.print-worksheet #wsPreview,.print-worksheet #wsPaper{display:block!important}.print-worksheet #wsPreview{border:0;box-shadow:none;margin:0;padding:0}.print-worksheet .ws-toolbar{display:none!important}.print-worksheet #wsPaper{max-width:none;padding:0}.print-worksheet footer{display:none!important}@page{size:A4;margin:16mm}}
.ws-options{margin:6px 0 0 12px;display:grid;gap:4px}.ws-options>div{min-height:1.5em}

/* V14: sem negritos nos enunciados, fichas e soluções */
.ws-paper, .ws-paper *, .ws-paper h1, .ws-paper h2, .ws-paper strong, .ws-paper b, .ws-paper .answer, .ws-question>strong {font-weight:400!important}
</style>`);
document.head.insertAdjacentHTML('beforeend',`<style>
/* Folha de trabalho: visual de documento A4 */
.ws-paper{box-sizing:border-box;width:210mm;max-width:100%;min-height:297mm;margin:0 auto;padding:19mm 19mm 17mm;background:#fff;color:#171717;font-family:Arial,Helvetica,sans-serif;font-size:11pt;line-height:1.5;box-shadow:0 2px 18px #1c29431a;border:1px solid #e3e3e3;position:relative}
.ws-paper-header{text-align:left;border:0;border-bottom:1px solid #333;padding:0 0 8mm;margin:0 0 7mm}
.ws-paper-header h1{font-size:15pt;line-height:1.3;font-weight:700;letter-spacing:0;margin:0 0 2mm;color:#111}
.ws-paper-header p{font-size:10pt;color:#444;margin:0}
.ws-student{display:grid;grid-template-columns:minmax(0,1fr) 34mm 40mm;gap:5mm;margin:0 0 11mm;font-size:10pt;align-items:end}
.ws-student span{white-space:nowrap}.ws-section{margin:0 0 9mm}.ws-section h2{font-size:11pt;font-weight:700;margin:0 0 5mm;line-height:1.4}
.ws-question{display:grid;grid-template-columns:10mm minmax(0,1fr);column-gap:2mm;align-items:start;min-height:32mm;margin:0 0 4mm;break-inside:avoid;page-break-inside:avoid}
.ws-question.problem{min-height:43mm}.ws-question>strong{font-weight:700}.ws-question .ws-statement{min-width:0}.ws-question .MathJax,.ws-question mjx-container[display="true"]{text-align:left!important;margin:0!important}
.ws-question .ws-statement>div{margin:0}.ws-task{font-size:10pt;margin:0 0 2mm!important;font-weight:400}.ws-question mjx-container{max-width:100%}
.ws-paper-footer{font-size:8pt;color:#666;border-top:1px solid #aaa;margin-top:15mm;padding-top:3mm;text-align:center;break-inside:avoid}
.ws-paper-footer a{color:inherit;text-decoration:none}.ws-paper .solutions-only h1{font-size:15pt;margin:0 0 8mm}.ws-solution{break-inside:avoid;page-break-inside:avoid;border-top:1px solid #ddd;padding:4mm 0;margin:0;font-size:10pt}
.ws-solution .answer{color:#111;font-weight:700}.ws-solution mjx-container[display="true"]{text-align:left!important;margin:2mm 0!important}
@media(max-width:740px){.ws-paper{width:100%;min-height:0;padding:18px;font-size:10pt}.ws-student{grid-template-columns:1fr;gap:5px}.ws-question{min-height:100px}.ws-question.problem{min-height:140px}}
@media print{
 @page{size:A4;margin:23mm 19mm 20mm}
 html,body{background:#fff!important;margin:0!important;padding:0!important}
 body.print-worksheet .container{margin:0!important;padding:0!important;width:100%!important;box-shadow:none!important;border:0!important}
 body.print-worksheet #worksheetMode,body.print-worksheet #wsPreview{margin:0!important;padding:0!important;width:100%!important;box-shadow:none!important;border:0!important}
 body.print-worksheet #wsPaper{width:100%!important;max-width:none!important;min-height:0!important;padding:0!important;margin:0!important;border:0!important;box-shadow:none!important;font-size:11pt!important}
 .ws-question{min-height:32mm!important}.ws-question.problem{min-height:43mm!important}
 .ws-paper-footer{color:#555!important}
}

/* V14: sem negritos nos enunciados, fichas e soluções */
.ws-paper, .ws-paper *, .ws-paper h1, .ws-paper h2, .ws-paper strong, .ws-paper b, .ws-paper .answer, .ws-question>strong {font-weight:400!important}
</style>`);
const entry=+new URLSearchParams(location.search).get('ano'),year=$('#wsYear'),level=$('#wsLevel'),quantities=$('#wsQuantities');year.value=[7,8,9].includes(entry)?String(entry):'9';level.value=year.value==='9'?'3':'1';
function allowed(s){const y=+year.value,l=+level.value;if(s==='com')return !(y===7&&l===1);if(s==='denom')return y>=8;if(s==='ambos')return y===9||(y===8&&l>=2);return true}
function quantityRow(key,label,value,enabled=true){return `<div class="ws-quantity ${enabled?'':'ws-disabled'}"><span>${label}${enabled?'':' · não disponível neste nível'}</span><div class="ws-stepper"><button type="button" data-step="-1" data-target="${key}" ${enabled?'':'disabled'}>−</button><input id="${key}" type="number" min="0" max="10" value="${enabled?value:0}" ${enabled?'':'disabled'}><button type="button" data-step="1" data-target="${key}" ${enabled?'':'disabled'}>+</button></div></div>`}
function drawQuantities(){let html='';if($('#wsCalc').checked){html+='<h4>Resolver equações</h4>';Object.entries(structures).forEach(([k,v],i)=>html+=quantityRow(`q_calc_${k}`,v,i<2?3:2,allowed(k)))}if($('#wsErrors').checked){html+='<h4>Seleção e análise de erros</h4>';Object.entries(structures).forEach(([k,v])=>html+=quantityRow(`q_selecao_${k}`,v,1,allowed(k)))}if($('#wsProblems').checked)html+='<h4>Problemas</h4>'+quantityRow('q_problema','Problemas adequados ao ano e nível',2,true);quantities.innerHTML=html||'<div class="ws-empty">Seleciona pelo menos um tipo de exercício.</div>';quantities.querySelectorAll('[data-step]').forEach(b=>b.onclick=()=>{const i=$('#'+b.dataset.target);i.value=Math.max(0,Math.min(10,+i.value + +b.dataset.step));updateTotal()});quantities.querySelectorAll('input').forEach(i=>i.oninput=updateTotal);updateTotal()}
function updateTotal(){const total=[...quantities.querySelectorAll('input')].reduce((n,i)=>n+(+i.value||0),0);$('#wsTotal').textContent=total;$('#wsWarning').textContent=total>30?'O máximo absoluto é 30 questões.':total>20?'Ficha extensa: recomendamos até 20 questões.':'';$('#wsGenerate').disabled=!total||total>30}
function typeset(){if(window.MathJax?.typesetPromise){MathJax.typesetClear?.();return MathJax.typesetPromise()}return Promise.resolve()}
function makeItems(){
 const y=+year.value,l=+level.value,E=window.__equations,out=[];
 const usedText=new Set(),familyCount=new Map(),familyLast=new Map(),categoryCount=new Map(),classificationCount=new Map(),truthCount=new Map();
 // Amostragem de várias famílias do motor original, sem alterar os níveis nem as soluções.
 function pick(type,structure){
   let best=null,bestScore=-Infinity;
   const attempts=type==='problema'?90:type==='selecao'?130:40;
   for(let k=0;k<attempts;k++){
     let ex;
     try{ex=E.generate(y,l,type,structure)}catch(err){if(best)break;throw err}
     if(!ex||!ex.question)continue;
     const family=String(ex.family||'desconhecida');
     const question=String(ex.question).replace(/\s+/g,' ').trim().toLowerCase();
     const duplicate=usedText.has(question);
     const count=familyCount.get(type+'|'+family)||0;
     const last=familyLast.get(type+'|'+family)??-1000;
     const category=type==='selecao'?(family==='classificacao'?'classificacao':family.startsWith('equivalente-')?'equivalencia':family==='operacao-inversa'?'operacoes':'erros'):family;
     const categoryUses=categoryCount.get(type+'|'+category)||0;
     const cls=ex.classification|| (family==='classificacao'?(ex.solution?.answer==='\\text{Todos os números reais verificam a igualdade.}'?'identity':null):null);
     const clsUses=cls?(classificationCount.get(cls)||0):0;
     const truth=typeof ex.equivalenceTruth==='boolean'?String(ex.equivalenceTruth):null;
     const truthUses=truth?(truthCount.get(truth)||0):0;
     const structuralPenalty=(l===3&&type==='selecao'&&family.startsWith('erro-')&&/transposicao-complexa|sinal-complexo/.test(family))?140:0;
     const score=(duplicate?-10000:0)-count*110-categoryUses*(type==='selecao'?75:0)-clsUses*230-truthUses*120-structuralPenalty-(out.length-last<=2?45:0)+Math.random()*5;
     if(score>bestScore){best={ex,family,question};bestScore=score}
     // Amostrar todas as tentativas para equilibrar famílias e categorias.
   }
   if(!best)throw new Error('Não foi possível gerar um exercício.');
   usedText.add(best.question);
   const key=type+'|'+best.family;
   familyCount.set(key,(familyCount.get(key)||0)+1);
   familyLast.set(key,out.length);
   const cat=type==='selecao'?(best.family==='classificacao'?'classificacao':best.family.startsWith('equivalente-')?'equivalencia':best.family==='operacao-inversa'?'operacoes':'erros'):best.family;
   const catKey=type+'|'+cat;categoryCount.set(catKey,(categoryCount.get(catKey)||0)+1);
   if(best.ex.classification)classificationCount.set(best.ex.classification,(classificationCount.get(best.ex.classification)||0)+1);
   if(typeof best.ex.equivalenceTruth==='boolean'){
     const truth=String(best.ex.equivalenceTruth);truthCount.set(truth,(truthCount.get(truth)||0)+1);
   }
   return best.ex;
 }
 for(const type of ['calculo','selecao'])
   for(const structure of Object.keys(structures)){
     const prefix=type==='calculo'?'calc':'selecao';
     const input=$(`#q_${prefix}_${structure}`);
     for(let n=0;n<+(input?.value||0);n++)
       out.push({type,structure,ex:pick(type,structure)});
   }
 const problems=+($('#q_problema')?.value||0);
 for(let n=0;n<problems;n++)
   out.push({type:'problema',structure:'misto',ex:pick('problema','misto')});
 if($('#wsOrder').value==='mixed')
   for(let i=out.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[out[i],out[j]]=[out[j],out[i]]}
 return out;
}
function statement(ex){const task=ex.task?`<div class="ws-task">${ex.task}</div>`:'';const options=ex.options?.length?`<div class="ws-options">${ex.options.map(o=>`<div>\\(${o}\\)</div>`).join('')}</div>`:'';return ex.family.startsWith('problema')?`<div>${ex.question}</div>`:`${task}\\[${ex.question}\\]${options}`}
function solutionStep(ex,step,index){
 const text=String(step||'');
 const isExplanation=text.includes('\\text{')||text.includes('\\neq')||text.includes('\\implies');
 const isAnalysis=ex.family.startsWith('erro-')||ex.family.startsWith('equivalente-')||ex.family==='operacao-inversa';
 const isFirstModel=ex.family.startsWith('problema')&&index===0;
 const isEquation=text.includes('=')&&!isExplanation;
 const prefix=isEquation&&!isAnalysis&&!isFirstModel?'\\Leftrightarrow\\;':'';
 return `<div>\\[${prefix}${text}\\]</div>`;
}
function generate(){const items=makeItems(),y=+year.value,l=+level.value,grouped=$('#wsOrder').value==='grouped';let body='',number=0;const groups=grouped?[['calculo','Resolve as equações.'],['selecao','Analisa, seleciona ou corrige.'],['problema','Resolve os problemas.']]:[['all','Resolve as questões seguintes.']];for(const [key,title] of groups){const list=key==='all'?items:items.filter(i=>i.type===key);if(!list.length)continue;body+=`<section class="ws-section student-only"><h2>${title}</h2>`+list.map(i=>`<div class="ws-question ${i.type==='problema'?'problem':''}"><span>${++number}.</span><div class="ws-statement">${statement(i.ex)}</div></div>`).join('')+'</section>'}body+=`<section class="solutions-only"><h1>Soluções</h1>`+items.map((i,n)=>`<div class="ws-solution"><span>${n+1}.</span> ${statement(i.ex)}${i.ex.steps.map((s,j)=>solutionStep(i.ex,s,j)).join('')}<div class="answer">${i.type==='calculo'||i.ex.family==='classificacao'?`\\[S=${i.ex.solution.set}\\]`:`Resposta: \\(${i.ex.solution.answer}\\)`}</div></div>`).join('')+'</section>';$('#wsPaper').classList.remove('show-solutions');$('#wsPaper').innerHTML=`<header class="ws-paper-header"><h1>Ficha de trabalho — Equações do 1.º grau</h1><p>${y}.º ano · ${levels[l]}</p></header><div class="ws-student student-only"><span>Nome: __________________________________</span><span>Turma: ______</span><span>Data: ____ / ____ / ______</span></div>${body}<footer class="ws-paper-footer">© 2026 — Nuno Araújo · MathLab 7–9 · nmiguelaraujo-math.github.io/mathlab-7-9</footer>`;$('.ws-builder').classList.add('hidden-mode');$('#wsPreview').classList.remove('hidden-mode');$('#wsSolutions').textContent='Ver soluções';typeset()}
function showMode(name){$('#freeMode').classList.toggle('hidden-mode',name!=='free');$('#worksheetMode').classList.toggle('hidden-mode',name!=='worksheet');$('#testMode').classList.toggle('hidden-mode',name!=='test');$('#freeModeBtn').classList.toggle('active',name==='free');$('#worksheetModeBtn').classList.toggle('active',name==='worksheet');$('#testModeBtn').classList.toggle('active',name==='test')}
['#wsCalc','#wsErrors','#wsProblems'].forEach(id=>$(id).onchange=e=>{e.target.closest('.ws-check').classList.toggle('active',e.target.checked);drawQuantities()});year.onchange=drawQuantities;level.onchange=drawQuantities;$('#wsGenerate').onclick=generate;$('#wsRegenerate').onclick=generate;$('#wsBack').onclick=()=>{$('#wsPreview').classList.add('hidden-mode');$('.ws-builder').classList.remove('hidden-mode')};$('#wsSolutions').onclick=()=>{const show=$('#wsPaper').classList.toggle('show-solutions');$('#wsSolutions').textContent=show?'Ver ficha do aluno':'Ver soluções';typeset()};$('#wsPrint').onclick=()=>{document.body.classList.add('print-worksheet');window.print();setTimeout(()=>document.body.classList.remove('print-worksheet'),500)};
$('#freeModeBtn').onclick=()=>showMode('free');$('#worksheetModeBtn').onclick=()=>showMode('worksheet');$('#testModeBtn').onclick=()=>showMode('test');drawQuantities();
})();
