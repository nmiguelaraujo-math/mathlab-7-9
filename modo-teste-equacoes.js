(()=>{'use strict';
const $=s=>document.querySelector(s),ri=(a,b)=>Math.floor(Math.random()*(b-a+1))+a,pick=a=>a[ri(0,a.length-1)],shuffle=a=>{const b=[...a];for(let i=b.length-1;i;i--){const j=ri(0,i);[b[i],b[j]]=[b[j],b[i]]}return b};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const levels=['','Principiante','Intermédio','Especialista'],storeKey='mathlab-equacoes-teste-v1';let state=null;
const optionQuestion=(topic,prompt,statement,correct,wrong,steps,generator,isText=false)=>{const raw=[{text:correct,ok:true,feedback:''},...wrong.map((text,i)=>({text,ok:false,feedback:['Confirma a operação inversa e os sinais.','Substitui o valor na equação inicial para verificares.','Revê a propriedade aplicada neste passo.'][i%3]}))],options=shuffle(raw);return{type:'choice',topic,prompt,statement,options,correct:options.findIndex(o=>o.ok),answerTex:correct,steps,generator,isText}};
function equationQuestion(level,type='calculo'){
 let ex=window.__equations.generate(level,type),guard=0;while(ex.solution.value===undefined&&guard++<8)ex=window.__equations.generate(level,type);
 if(ex.solution.value===undefined)return classifyQuestion(level);
 const v=ex.solution.value,integer=Number.isInteger(v),answer=integer?String(v):ex.solution.x;
 if(Math.random()<.45)return{type:'numeric',topic:ex.label,prompt:ex.family.startsWith('problema')?ex.question:'Resolve a equação.',statement:ex.family.startsWith('problema')?'':ex.question,expected:v,answerTex:answer,steps:ex.steps,generator:ex.family,isText:ex.family.startsWith('problema')};
 const wrong=[String(integer?-v:v+1),String(integer?v+1:v-1),String(integer?v-1:v*2)].filter((x,i,a)=>x!==answer&&a.indexOf(x)===i).slice(0,3);
 return optionQuestion(ex.label,ex.family.startsWith('problema')?ex.question:'Seleciona a solução da equação.',ex.family.startsWith('problema')?'':ex.question,answer,wrong,ex.steps,ex.family,ex.family.startsWith('problema'));
}
function classifyQuestion(level){
 const ex=window.__equations.classify(level),identity=ex.solution.set==='\\mathbb R';
 return optionQuestion('Classificação de equações','Classifica a equação.',ex.question,identity?'\\text{Possível indeterminada}':'\\text{Impossível}',identity?['\\text{Impossível}','\\text{Possível determinada}','\\text{Sem resolução}']:['\\text{Possível indeterminada}','\\text{Possível determinada}','\\text{Solução }0'],ex.steps,ex.family);
}
function trueFalse(level){
 const a=ri(2,7),b=ri(2,8),correct=Math.random()<.5,statement=correct?`${a}(x+${b})=${a}x+${a*b}`:`${a}(x+${b})=${a}x+${b}`;
 return optionQuestion('Propriedade distributiva','Indica se a igualdade é verdadeira ou falsa.',statement,correct?'\\text{Verdadeira}':'\\text{Falsa}',[correct?'\\text{Falsa}':'\\text{Verdadeira}'],[`${a}(x+${b})=${a}x+${a*b}`],'distributiva');
}
function missingNumber(level){
 const x=ri(-8,10),a=ri(2,7),b=ri(-9,9),c=a*x+b;
 return{type:'numeric',topic:'Completar uma equação',prompt:'Completa com o número que torna a igualdade verdadeira.',statement:`${a}\\times${x}+\\square=${c}`,expected:b,answerTex:String(b),steps:[`\\square=${c}-${a*x}`,`\\square=${b}`],generator:'completar'};
}
function chooseStep(level){
 const x=ri(-7,9),a=ri(2,8),b=ri(2,10),c=a*x+b;
 return optionQuestion('Passo equivalente','Escolhe a transformação equivalente correta.',`${a}x+${b}=${c}`,`${a}x=${c}-${b}`,[`${a}x=${c}+${b}`,`x=${c}-${b}`,`${a}x=${b}-${c}`],[`${a}x+${b}=${c}\\Leftrightarrow ${a}x=${c}-${b}`,`x=${x}`],'passo-equivalente');
}
function modelProblem(level){
 const n=ri(5,16),extra=ri(2,7),total=2*n+extra;
 return optionQuestion('Modelação','Escolhe a equação que representa corretamente a situação.',`A Leonor tem mais ${extra} cromos do que o Rui. Juntos têm ${total} cromos. Considera que x representa o número de cromos do Rui.`,`x+(x+${extra})=${total}`,[`x+${extra}=${total}`,`2x-${extra}=${total}`,`x+(x-${extra})=${total}`],[`x+(x+${extra})=${total}`,`2x+${extra}=${total}`,`x=${n}`],'modelacao',true);
}
function buildTest(year,level){
 const blueprint=level===1?['calc','calc','tf','missing','step','model','problem','calc','tf','problem']:level===2?['calc','paren','frac','tf','missing','step','model','problem','calc','classify']:['paren','frac','advanced','classify','tf','step','model','problem','problem','advanced'];
 return blueprint.map(k=>k==='tf'?trueFalse(level):k==='missing'?missingNumber(level):k==='step'?chooseStep(level):k==='model'?modelProblem(level):k==='classify'?classifyQuestion(level):k==='problem'?equationQuestion(level,'problema'):equationQuestion(level,k==='advanced'?'calculo':k==='paren'||k==='frac'?'calculo':'calculo'));
}
function buildErrorTraining(year,level,keys){const unique=keys.length?[...new Set(keys)]:['passo-equivalente'];return Array.from({length:10},(_,i)=>{const k=unique[i%unique.length];if(k==='distributiva')return trueFalse(level);if(k==='completar')return missingNumber(level);if(k==='passo-equivalente')return chooseStep(level);if(k==='modelacao')return modelProblem(level);if(k==='classificacao')return classifyQuestion(level);return equationQuestion(level,k.startsWith('problema')?'problema':'calculo')})}
const numericValue=s=>{if(s===null||s===undefined)return NaN;const t=String(s).trim().replace(',','.');if(/^[-+]?\d+(\.\d+)?$/.test(t))return Number(t);const m=t.match(/^([-+]?\d+)\s*\/\s*([-+]?\d+)$/);return m&&+m[2]!==0?+m[1]/+m[2]:NaN};
const isCorrect=(q,a)=>q.type==='choice'?a===q.correct:Math.abs(numericValue(a)-q.expected)<1e-9;
function typeset(){if(window.MathJax?.typesetPromise){MathJax.typesetClear?.();return MathJax.typesetPromise()}return Promise.resolve()}
function save(){try{localStorage.setItem(storeKey,JSON.stringify(state))}catch{}}
function load(){try{return JSON.parse(localStorage.getItem(storeKey)||'null')}catch{return null}}
function clearSaved(){try{localStorage.removeItem(storeKey)}catch{}}
function showMode(mode){const free=mode==='free';$('#freeMode').classList.toggle('hidden-mode',!free);$('#testMode').classList.toggle('hidden-mode',free);$('#freeModeBtn').classList.toggle('active',free);$('#testModeBtn').classList.toggle('active',!free);if(!free)refreshResume()}
function refreshResume(){const s=load();$('#resumeTest').classList.toggle('hidden-mode',!(s?.active&&!s.finished))}
function resetViews(){['#testRunner','#testResult','#testReview'].forEach(id=>$(id).classList.add('hidden-mode'));$('#testSetup').classList.remove('hidden-mode')}
function openQuestions(questions,year,level,mode='test'){state={active:true,finished:false,questions,answers:Array(questions.length).fill(null),year,level,mode,index:0,score:null};save();$('#testSetup').classList.add('hidden-mode');$('#testResult').classList.add('hidden-mode');$('#testReview').classList.add('hidden-mode');$('#testRunner').classList.remove('hidden-mode');renderQuestion()}
function startTest(){openQuestions(buildTest(+$('#testYear').value,+$('#testLevel').value),+$('#testYear').value,+$('#testLevel').value)}
function resumeTest(){state=load();if(!state)return;$('#testSetup').classList.add('hidden-mode');$('#testRunner').classList.remove('hidden-mode');renderQuestion()}
function renderQuestion(){const q=state.questions[state.index],a=state.answers[state.index],total=state.questions.length;$('#testTags').textContent=`${state.year}.º ano · ${levels[state.level]}${state.mode==='errors'?' · Treino dos erros':''}`;$('#testProgress').textContent=`Questão ${state.index+1} de ${total}`;$('#progressFill').style.width=`${(state.index+1)*100/total}%`;$('#testPrompt').textContent=q.prompt;$('#testStatement').innerHTML=q.statement?(q.isText?esc(q.statement):`\\[${q.statement}\\]`):'';
 if(q.type==='choice'){$('#testResponse').innerHTML=`<div class="answer-options">${q.options.map((o,i)=>`<button class="option-btn ${a===i?'selected':''}" data-option="${i}"><span class="option-key">${String.fromCharCode(65+i)}</span><span>\\(${o.text}\\)</span></button>`).join('')}</div>`;$('#testResponse').querySelectorAll('[data-option]').forEach(b=>b.onclick=()=>{state.answers[state.index]=+b.dataset.option;save();renderQuestion()})}else{$('#testResponse').innerHTML=`<input id="testInput" class="test-input" inputmode="decimal" placeholder="Escreve o número" value="${esc(a??'')}"><p style="text-align:center;color:#64748b">Podes usar vírgula, ponto ou uma fração como 1/2.</p>`;$('#testInput').oninput=e=>{state.answers[state.index]=e.target.value;save();renderDots()}}
 renderDots();$('#previousQuestion').disabled=state.index===0;$('#nextQuestion').disabled=state.index===total-1;typeset()}
function answered(i){const a=state.answers[i];return a!==null&&String(a).trim()!==''}
function renderDots(){$('#questionDots').innerHTML=state.questions.map((q,i)=>`<button class="question-dot ${i===state.index?'current':''} ${answered(i)?'answered':''}" data-i="${i}">${i+1}</button>`).join('');$('#questionDots').querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>{state.index=+b.dataset.i;save();renderQuestion()})}
function finish(){const missing=state.answers.filter((a,i)=>!answered(i)).length;if(missing&&!confirm(`Ainda tens ${missing} ${missing===1?'questão por responder':'questões por responder'}. Queres terminar mesmo assim?`))return;state.score=state.questions.reduce((n,q,i)=>n+(isCorrect(q,state.answers[i])?1:0),0);state.finished=true;save();showResult()}
function showResult(){const errors=state.score<10;$('#testRunner').classList.add('hidden-mode');$('#testReview').classList.add('hidden-mode');$('#testResult').classList.remove('hidden-mode');$('#resultTitle').textContent=state.mode==='errors'?'Resultado do treino dos erros':'Resultado do teste';$('#resultScore').textContent=`${state.score}/10`;$('#resultMessage').textContent=state.score<=4?'Revê os procedimentos e treina os erros identificados.':state.score<=6?'Estás a progredir. Consolida os tipos de questão em que falhaste.':state.score<=8?'Bom domínio. Revê os pormenores assinalados.':'Excelente domínio das equações!';$('#trainErrors').classList.toggle('hidden-mode',!errors)}
function review(){const list=$('#reviewList');list.innerHTML=state.questions.map((q,i)=>{const ok=isCorrect(q,state.answers[i]),a=state.answers[i],user=q.type==='choice'?(Number.isInteger(a)?`\\(${q.options[a].text}\\)`:'Sem resposta'):esc(a??'Sem resposta');return`<article class="review-card ${ok?'':'wrong'}"><strong>Questão ${i+1} · ${esc(q.topic)}</strong><div>${esc(q.prompt)}</div>${q.statement?`<div class="test-statement">${q.isText?esc(q.statement):`\\[${q.statement}\\]`}</div>`:''}<div class="review-answer"><strong>A tua resposta:</strong> ${user}</div>${ok?'':`<div class="feedback">${q.type==='choice'&&Number.isInteger(a)?esc(q.options[a].feedback):'Confirma as operações e verifica a solução na equação inicial.'}</div>`}<div class="review-answer correct"><strong>Resposta correta:</strong> \\(${q.answerTex}\\)</div>${q.steps.map(s=>`<div>\\[${s}\\]</div>`).join('')}</article>`}).join('');$('#testResult').classList.add('hidden-mode');$('#testReview').classList.remove('hidden-mode');typeset()}
function trainErrors(){const keys=state.questions.filter((q,i)=>!isCorrect(q,state.answers[i])).map(q=>q.generator);openQuestions(buildErrorTraining(state.year,state.level,keys),state.year,state.level,'errors')}
$('#freeModeBtn').onclick=()=>showMode('free');$('#testModeBtn').onclick=()=>showMode('test');$('#startTest').onclick=startTest;$('#resumeTest').onclick=resumeTest;$('#previousQuestion').onclick=()=>{if(state.index){state.index--;save();renderQuestion()}};$('#nextQuestion').onclick=()=>{if(state.index<9){state.index++;save();renderQuestion()}};$('#finishTest').onclick=finish;$('#reviewTest').onclick=review;$('#trainErrors').onclick=trainErrors;$('#closeReview').onclick=showResult;$('#newTest').onclick=()=>{clearSaved();state=null;resetViews();refreshResume()};
window.__equationsTest={buildTest,buildErrorTraining,isCorrect};refreshResume();
})();
