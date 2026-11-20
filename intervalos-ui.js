(()=>{'use strict';
const $=s=>document.querySelector(s), api=window.__intervals, keys=['convert','graphical','membership','integers','operations','complement','selection','challenge'];
const groups={represent:['convert','graphical','membership','integers'],operations:['operations','complement','selection'],problems:['challenge']};
const names={convert:'Representações equivalentes',graphical:'Retas reais',membership:'Pertença e inclusão',integers:'Inteiros e naturais',operations:'Reunião e interseção',complement:'Complementar',selection:'Análise de erros',challenge:'Problemas e desafios'};
let training='represent',topic='mixed',counts={represent:0,operations:0,problems:0},sheetExercises=[];
function typeset(){if(window.MathJax?.typesetPromise)window.MathJax.typesetPromise().catch(()=>{});}
function setMode(mode){for(const [name,id,btn] of [['free','#freeMode','#freeModeBtn'],['sheet','#sheetMode','#sheetModeBtn'],['test','#testMode','#testModeBtn']]){$(id).classList.toggle('hidden-mode',mode!==name);$(id).hidden=mode!==name;$(btn).classList.toggle('active',mode===name)}typeset()}
window.MathLabIntervalsUI={setMode};$('#sheetModeBtn').addEventListener('click',()=>setMode('sheet'));
// O separador Criar ficha não depende do motor do teste.

function renderTopics(){const allowed=groups[training];if(topic!=='mixed'&&!allowed.includes(topic))topic='mixed';$('#category').value=topic;$('#topicCards').innerHTML=[['mixed','Treino misto'],...allowed.map(k=>[k,names[k]])].map(([k,n])=>`<button class="choice ${topic===k?'active':''}" data-topic="${k}"><span class="choiceTitle">${n}</span></button>`).join('');$('#topicCards').querySelectorAll('[data-topic]').forEach(b=>b.onclick=()=>{topic=b.dataset.topic;renderTopics();$('#new').click()});typeset()}
// A escolha mista conserva os geradores originais, mas limita a seleção ao grupo escolhido.
const originalGenerator=api.generators;
function syncGroup(){ $('#category').value={represent:'convert',operations:'operations',problems:'challenge'}[training]; }
$('#new').addEventListener('click',()=>{syncGroup()},true);
$('#levelCards').querySelectorAll('[data-level]').forEach(b=>b.onclick=()=>{$('#level').value=b.dataset.level;$('#levelCards').querySelectorAll('[data-level]').forEach(x=>x.classList.toggle('active',x===b));$('#new').click()});
$('#trainingCards').querySelectorAll('[data-training]').forEach(b=>b.onclick=()=>{training=b.dataset.training;$('#trainingCards').querySelectorAll('[data-training]').forEach(x=>x.classList.toggle('active',x===b));renderTopics();$('#new').click()});
renderTopics();
const groupNames={represent:'Representação e interpretação de intervalos',operations:'Operações com conjuntos',problems:'Problemas e aplicações'};
function controls(){const el=$('#sheetTopicControls');el.innerHTML=Object.keys(groups).map(k=>`<div class="sheetCountRow"><span>${groupNames[k]}</span><div class="stepper"><button type="button" data-count="${k}" data-step="-1" aria-label="Retirar exercício">−</button><output id="count-${k}">${counts[k]}</output><button type="button" data-count="${k}" data-step="1" aria-label="Adicionar exercício">+</button></div></div>`).join('');el.querySelectorAll('[data-count]').forEach(b=>b.onclick=()=>{const k=b.dataset.count;counts[k]=Math.max(0,Math.min(30,counts[k]+Number(b.dataset.step)));$('#count-'+k).textContent=counts[k];$('#sheetTotal').textContent=Object.values(counts).reduce((a,b)=>a+b,0)})}
controls();
function uniqueSheet(level){
 const all=[];
 for(const group of Object.keys(groups))for(let i=0;i<counts[group];i++){
  const e=window.MathLabDiversidade.choose(group,level);
  all.push({k:group,e});
 }
 if($('#sheetOrder').value==='mix')for(let i=all.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[all[i],all[j]]=[all[j],all[i]]}
 return all;
}
function esc(s){return String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
// A ficha nunca reutiliza opções de escolha múltipla como se fossem um enunciado aberto.
function sheetQuestion(e){
 const prompt=String(e.prompt||'').trim();
 if(!e.choices)return prompt;
 if(e.family?.includes('notação') || /representação correta/i.test(prompt))return 'Escreve uma condição equivalente ao intervalo apresentado e representa-o na reta real.';
 if(/afirmação verdadeira|resposta correta|seleciona/i.test(prompt))return 'Analisa os conjuntos apresentados, determina a operação indicada e justifica a resposta.';
 return 'Resolve a questão apresentada e justifica a resposta.';
}
function safeMath(t){
 let s=String(t||'').trim();
 // Corrige delimitadores matemáticos incompletos e evita que apareçam como código na impressão.
 if(s.startsWith('\\[')&&!s.endsWith('\\]'))s+='\\]';
 if(s.startsWith('\\(')&&!s.endsWith('\\)'))s+='\\)';
 if(!s.startsWith('\\[')&&!s.startsWith('\\(')&&/\\(?:sqrt|frac|infty|leq|geq|cup|cap)\b/.test(s))s='\\['+s+'\\]';
 return s;
}
let mathTypeset=Promise.resolve();
function queueMath(root){
 mathTypeset=mathTypeset.catch(()=>{}).then(async()=>{
  if(window.MathJax?.startup?.promise)await window.MathJax.startup.promise;
  if(window.MathJax?.typesetPromise){window.MathJax.typesetClear?.([root]);await window.MathJax.typesetPromise([root]);}
 });
 return mathTypeset;
}
function createSheet(){
 const total=Object.values(counts).reduce((a,b)=>a+b,0);
 if(!total){alert('Seleciona pelo menos um exercício.');return}
 if(total>60){alert('Para garantir uma ficha legível, seleciona até 60 exercícios.');return}
 const level=Number($('#sheetLevel').value);sheetExercises=uniqueSheet(level);
 const paper=$('#paper');paper.classList.remove('showSolutions');
 paper.innerHTML=`<div class="paperHeader"><h2>Matemática — 9.º ano</h2><p>Ficha de trabalho · Intervalos de números reais</p><p>Nome: ___________________________________ &nbsp; Turma: ______ &nbsp; Data: ____ / ____ / ______</p></div>`+
 sheetExercises.map(({e},i)=>{
  const question=sheetQuestion(e);
  const statement=safeMath(e.statement);
  // Não mostrar gráficos de apoio quando o aluno tem de construir a representação.
  const mustDraw=/representa.{0,30}reta real|desenha.{0,30}reta real/i.test(question);
  const showVisual=e.visual&&!mustDraw;
  const solutionSteps=(e.steps||[]).map(s=>`<div class="paperStep"><span class="paperMath">\\[${s.math}\\]</span>${s.reason?`<span>${esc(s.reason)}</span>`:''}</div>`).join('');
  return `<article class="paperExercise"><div class="paperQuestion">${i+1}. ${question}</div>${statement?`<div class="paperMath">${statement}</div>`:''}${showVisual?`<div class="visual paperGraph">${e.visual}</div>`:''}<div class="paperAnswerSpace"></div><div class="paperSolution"><div class="paperMath">\\[${e.answer}\\]</div>${e.answerVisual||''}${solutionSteps}</div></article>`;
 }).join('')+`<div class="paperFooter">© 2026 — Nuno Araújo · MathLab 7–9</div>`;
 $('#sheetSettings').classList.add('hidden-mode');$('#sheetPreview').classList.remove('hidden-mode');$('#toggleSolutions').textContent='Ver soluções';
 queueMath(paper).catch(e=>console.warn('MathJax na ficha:',e));
}
$('#makeSheet').onclick=createSheet;$('#newSheet').onclick=createSheet;$('#changeSheet').onclick=()=>{$('#sheetPreview').classList.add('hidden-mode');$('#sheetSettings').classList.remove('hidden-mode')};$('#toggleSolutions').onclick=()=>{const on=$('#paper').classList.toggle('showSolutions');$('#toggleSolutions').textContent=on?'Ocultar soluções':'Ver soluções';typeset()};$('#printSheet').onclick=async()=>{if($('#paper').classList.contains('showSolutions')){$('#paper').classList.remove('showSolutions');$('#toggleSolutions').textContent='Ver soluções'}await queueMath($('#paper')).catch(()=>{});if(!window.MathJax?.typesetPromise){alert('A formatação matemática ainda não carregou. Verifica a ligação à Internet antes de imprimir.');return}window.print()};
})();