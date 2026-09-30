(()=>{'use strict';
const api=window.__rationals;if(!api)return;
const $=s=>document.querySelector(s),ri=(a,b)=>Math.floor(Math.random()*(b-a+1))+a,pick=a=>a[ri(0,a.length-1)];
const shuffle=a=>{const b=[...a];for(let i=b.length-1;i;i--){const j=ri(0,i);[b[i],b[j]]=[b[j],b[i]]}return b};
const {Q,add,sub,mul,div,tex}=api,neg=q=>Q(-q.n,q.d),val=q=>q.n/q.d,eq=(a,b)=>a.n===b.n&&a.d===b.d;
const par=q=>q.n<0?`\\left(${tex(q)}\\right)`:tex(q),fmt=n=>String(+Number(n).toFixed(8)).replace('.',','),esc=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const levelName=['','Principiante','Intermédio','Especialista'],storeKey='mathlab-racionais-teste-v2';
let state=null;

function typeset(){if(window.MathJax?.typesetPromise)window.MathJax.typesetPromise()}
function uniqueOptions(options){const seen=new Set();return options.filter(o=>{if(seen.has(o.text))return false;seen.add(o.text);return true})}
function choice(prompt,statement,options,steps,topic,format='choice'){
 let opts=uniqueOptions(options),k=2,needed=['truefalse','sign','membership'].includes(format)?opts.length:4;
 while(opts.length<needed){const fallback=tex(Q(k+1,k+3));if(!opts.some(o=>o.text===fallback))opts.push({text:fallback,feedback:'Esta opção não satisfaz a condição pedida.'});k++}
 opts=shuffle(opts.slice(0,needed));return{type:format,prompt,statement,options:opts,correct:opts.findIndex(o=>o.correct),steps,topic,answerTex:opts.find(o=>o.correct).text};
}
function inputQuestion(type,prompt,statement,expected,answerTex,steps,topic){return{type,prompt,statement,expected,answerTex,steps,topic}}
function parseNumber(s){s=String(s??'').trim().replace(/−/g,'-').replace(/,/g,'.').replace(/\s/g,'');if(!s)return NaN;if(/^[-+]?\d+\/[-+]?\d+$/.test(s)){const [a,b]=s.split('/').map(Number);return b? a/b:NaN}return /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(s)?Number(s):NaN}
function numericEqual(answer,expected){const n=parseNumber(answer),target=typeof expected==='number'?expected:val(expected);return Number.isFinite(n)&&Math.abs(n-target)<1e-9}
function wrong(text,feedback){return{text,feedback}}
function right(text){return{text,correct:true,feedback:''}}

function equivalentQuestion(year,level){
 const pools=level===1?[[1,2],[2,3],[3,4],[2,5]]:level===2?[[3,5],[5,8],[7,10],[4,9]]:[[7,12],[11,15],[13,18],[17,20]];
 const [a,b]=pick(pools),k=ri(2,level+4),correct=`\\frac{${a*k}}{${b*k}}`;
 return choice('Seleciona a fração equivalente.',`\\[\\frac{${a}}{${b}}\\]`,[
  right(correct),wrong(`\\frac{${a+k}}{${b+k}}`,'Adicionaste o mesmo número aos dois termos; isso não conserva o valor da fração.'),
  wrong(`\\frac{${a*k}}{${b}}`,'Multiplicaste apenas o numerador.'),wrong(`\\frac{${a}}{${b*k}}`,'Multiplicaste apenas o denominador.')
 ],[`\\frac{${a}}{${b}}=\\frac{${a}\\times${k}}{${b}\\times${k}}=${correct}`],'Frações equivalentes','representation');
}

function trueFalseQuestion(year,level){
 const common=[
  {s:'Todo o número inteiro é racional.',c:true,e:'Qualquer inteiro pode escrever-se com denominador 1.',step:'n=\\frac{n}{1}\\in\\mathbb Q'},
  {s:'Entre dois números racionais distintos existe sempre outro número racional.',c:true,e:'Por exemplo, a média dos dois números fica entre eles.',step:'a<b\\Longrightarrow a<\\frac{a+b}{2}<b'},
  {s:'Para adicionar duas frações, adicionam-se os numeradores e os denominadores.',c:false,e:'É necessário escrever as frações com denominadores iguais.',step:'\\frac ab+\\frac cd\\ne\\frac{a+c}{b+d}'},
  {s:'Uma fração com numerador zero representa o número zero, desde que o denominador seja diferente de zero.',c:true,e:'Zero dividido por qualquer número não nulo é zero.',step:'\\frac0b=0\\quad(b\\ne0)'}
 ];
 const advanced7=[
  {s:'Subtrair um número racional é o mesmo que adicionar o seu simétrico.',c:true,e:'Esta equivalência permite transformar qualquer subtração numa adição algébrica.',step:'a-b=a+(-b)'},
  {s:'Duas frações com o mesmo denominador representam sempre o mesmo número.',c:false,e:'Com denominadores iguais, o valor também depende dos numeradores.',step:'\\frac25\\ne\\frac35'},
  {s:'O valor absoluto de um número racional negativo é positivo.',c:true,e:'O valor absoluto representa a distância do número a zero.',step:'a<0\\Longrightarrow |a|=-a>0'}
 ];
 const advanced8=[
  {s:'O produto de dois números racionais negativos é positivo.',c:true,e:'Dois fatores com o mesmo sinal originam um produto positivo.',step:'(-a)\\times(-b)=ab'},
  {s:'O inverso de zero é zero.',c:false,e:'O número zero não tem inverso, pois não existe divisão por zero.',step:'\\frac10\\text{ não está definido}'},
  {s:'Toda a fração irredutível cuja dízima é finita tem denominador apenas com fatores primos 2 e/ou 5.',c:true,e:'Este é o critério das dízimas finitas.',step:'d=2^m5^n'},
  {s:'Se dois números racionais têm denominadores diferentes, o que tiver maior denominador é sempre menor.',c:false,e:'Também é necessário considerar os numeradores e os sinais.',step:'\\frac23>\\frac35'}
 ];
 const specialist7=[
  {s:'A soma de um número racional com o seu simétrico é zero.',c:true,e:'Os dois números têm o mesmo valor absoluto e sinais contrários.',step:'a+(-a)=0'},
  {s:'Se dois números racionais são negativos, o que está mais afastado de zero é o maior.',c:false,e:'Na parte negativa da reta, o número mais afastado de zero é o menor.',step:'-5<-2'},
  {s:'Existe apenas um número racional entre duas frações distintas.',c:false,e:'Entre dois racionais distintos existem infinitos números racionais.',step:'a<b\\Longrightarrow a<\\frac{a+b}{2}<b'}
 ];
 const specialist8=[
  {s:'Se a e b são racionais negativos e a é menor do que b, então o valor absoluto de a é maior do que o valor absoluto de b.',c:true,e:'Na parte negativa da reta, o menor número está mais afastado de zero.',step:'a<b<0\\Longrightarrow |a|>|b|'},
  {s:'O quociente de dois números racionais não nulos é sempre racional.',c:true,e:'Os racionais são fechados para a divisão por um número não nulo.',step:'a,b\\in\\mathbb Q,\\ b\\ne0\\Longrightarrow a:b\\in\\mathbb Q'},
  {s:'O produto de três números racionais negativos é positivo.',c:false,e:'Um número ímpar de fatores negativos origina um produto negativo.',step:'(-)\\times(-)\\times(-)=(-)'}
 ];
 const advanced=year===7?advanced7:advanced8,specialist=year===7?specialist7:specialist8,item=pick(level===1?common:level===2?[...common,...advanced]:[...advanced,...specialist]);
 return choice('Indica se a afirmação é verdadeira ou falsa.',item.s,[right(item.c?'\\text{Verdadeiro}':'\\text{Falso}'),wrong(item.c?'\\text{Falso}':'\\text{Verdadeiro}',item.e)],[item.step,item.e],'Compreensão de propriedades','truefalse');
}

function completeQuestion(year,level){
 const bases=level===1?[[1,3],[2,5],[3,4]]:level===2?[[3,7],[5,8],[7,12]]:[[11,15],[13,18],[17,24]];
 const [a,b]=pick(bases),k=ri(2,level+5),expected=a*k;
 return inputQuestion('fill','Completa com o número correto.',`\\[\\frac{${a}}{${b}}=\\frac{\\square}{${b*k}}\\]`,expected,String(expected),[
  `\\frac{${a}}{${b}}=\\frac{${a}\\times${k}}{${b}\\times${k}}=\\frac{${expected}}{${b*k}}`
 ],'Frações equivalentes');
}

function signQuestion(year,level){
 let A,B;
 if(level===1){const d=pick([4,5,6,8]);A=Q(ri(1,d-1),d);B=Q(ri(1,d-1),d);if(eq(A,B))B=Q(B.n===d-1?B.n-1:B.n+1,d)}
 else if(level===2){A=Q(ri(-8,8)||-3,pick([4,5,6,8,10]));B=Q(ri(-8,8)||2,pick([4,5,6,8,10]));if(eq(A,B))B=add(B,Q(1,10))}
 else{A=pick([Q(-7,8),Q(-5,6),Q(11,12),Q(-13,15)]);B=pick([Q(-4,5),Q(-9,10),Q(7,8),Q(-17,20)]);if(eq(A,B))B=Q(1,3)}
 const correct=val(A)<val(B)?'<':val(A)>val(B)?'>':'=';
 return choice('Escolhe o sinal correto.',`\\[${tex(A)}\\quad\\square\\quad${tex(B)}\\]`,[
  correct==='<'?right('<'):wrong('<','Esta opção inverte a ordem dos números.'),correct==='='?right('='):wrong('=','Os dois números não representam o mesmo valor.'),correct==='>'?right('>'):wrong('>','Esta opção inverte a ordem dos números.')
 ],[`${tex(A)}=${fmt(val(A))}\\quad\\text{e}\\quad${tex(B)}=${fmt(val(B))}`,`${tex(A)}${correct}${tex(B)}`],'Comparação','sign');
}

function orderQuestion(year,level){
 const pools=level===1?[Q(-1,2),Q(1,4),Q(3,4)]:level===2?[Q(-3,4),Q(2,5),Q(-1,2),Q(4,5)]:[Q(-7,8),Q(5,6),Q(-2,3),Q(3,10),Q(11,12)];
 const selected=shuffle(pools).slice(0,level+2),cards=selected.map((q,i)=>({id:`c${i}`,text:tex(q),value:val(q)})),correctOrder=[...cards].sort((a,b)=>a.value-b.value).map(c=>c.id);
 return{type:'order',prompt:'Ordena os cartões por ordem crescente.',statement:'Toca nos cartões pela ordem em que devem aparecer.',cards:shuffle(cards),correctOrder,answerTex:[...cards].sort((a,b)=>a.value-b.value).map(c=>c.text).join('\\lt '),steps:[...cards].sort((a,b)=>a.value-b.value).map(c=>c.text).join('\\lt '),topic:'Ordenação'};
}

function representationQuestion(year,level){
 const choices=level===1?[[Q(1,2),'0,5'],[Q(3,4),'0,75'],[Q(2,5),'0,4']]:level===2?[[Q(7,8),'0,875'],[Q(-3,5),'-0,6'],[Q(9,20),'0,45']]:[[Q(-11,8),'-1,375'],[Q(13,25),'0,52'],[Q(-17,20),'-0,85']];
 const [q,decimal]=pick(choices),wrong1=fmt(val(q)+0.1),wrong2=fmt(Math.abs(q.n)/(q.d+1)),wrong3=fmt(q.d/q.n);
 return choice('Seleciona a representação decimal equivalente.',`\\[${tex(q)}\\]`,[
  right(decimal),wrong(wrong1,'O valor apresentado difere do quociente indicado.'),wrong(wrong2,'Alteraste o denominador da fração.'),wrong(wrong3,'Inverteste o quociente entre o numerador e o denominador.')
 ],[`${tex(q)}=${decimal}`],'Representações equivalentes','representation');
}

function membershipQuestion(year,level){
 const bank=level===1?[{q:Q(-3),set:'\\mathbb Z',yes:true},{q:Q(2,5),set:'\\mathbb Z',yes:false},{q:Q(7),set:'\\mathbb Q',yes:true}]:level===2?[{q:Q(-4,3),set:'\\mathbb Q',yes:true},{q:Q(-2),set:'\\mathbb N',yes:false},{q:Q(0),set:'\\mathbb Z',yes:true}]:[{q:Q(13,7),set:'\\mathbb Z',yes:false},{q:Q(-11,5),set:'\\mathbb Q',yes:true},{q:Q(-8),set:'\\mathbb N',yes:false}];
 const x=pick(bank),correct=x.yes?'\\in':'\\notin';
 return choice('Indica a relação de pertença correta.',`\\[${tex(x.q)}\\quad\\square\\quad${x.set}\\]`,[
  correct==='\\in'?right('\\in'):wrong('\\in','Esse número não pertence ao conjunto indicado.'),correct==='\\notin'?right('\\notin'):wrong('\\notin','Esse número pertence ao conjunto indicado.')
 ],[`${tex(x.q)}${correct}${x.set}`],'Pertença','membership');
}

function numericQuestion(year,level){
 const d=pick(level===1?[4,5,6,8]:level===2?[6,8,10,12]:[8,10,12,15,20]),A=Q(ri(-d,d)||1,d),B=Q(ri(-d,d)||2,d),useSub=level>1&&Math.random()<.5,result=useSub?sub(A,B):add(A,B),op=useSub?'-':'+';
 return inputQuestion('numeric','Calcula e escreve uma resposta numérica.',`\\[${tex(A)}${op}${par(B)}\\]`,result,tex(result),[
  `${tex(A)}${op}${par(B)}=${tex(result)}`,'Apresenta-se o resultado como fração irredutível.'
 ],'Adição e subtração');
}

function operationQuestion(year,level){
 const templates=level===1?[[5,7,21,10],[3,8,16,9]]:level===2?[[7,12,18,7],[13,8,24,13],[15,28,14,25]]:[[14,33,55,21],[22,39,65,44],[26,45,75,52]];
 let [a,b,c,d]=pick(templates),A=Q(a,b),B=Q(c,d);if(year===8&&Math.random()<.65)A=neg(A);if(year===8&&Math.random()<.45)B=neg(B);
 const division=level>1&&Math.random()<.45,correct=division?div(A,B):mul(A,B),wrongProduct=division?mul(A,B):add(A,B),wrongCross=division?div(B,A):div(A,B),wrongAdd=Q(A.n+B.n,A.d+B.d),op=division?':':'\\times';
 return choice(division?'Calcula usando o inverso e simplificando antes de multiplicar.':'Calcula simplificando antes de multiplicar.',`\\[${par(A)}${op}${par(B)}\\]`,[
  right(tex(correct)),wrong(tex(wrongProduct),division?'Multiplicaste sem inverter o divisor.':'Efetuaste uma adição em vez de uma multiplicação.'),
  wrong(tex(wrongCross),division?'Esta opção resulta de uma inversão incorreta.':'Trataste a multiplicação como uma divisão.'),wrong(tex(wrongAdd),'Adicionaste numeradores e denominadores.')
 ],division?[`${par(A)}:${par(B)}=${par(A)}\\times${par(Q(B.d,B.n))}`,tex(correct)]:[`${par(A)}\\times${par(B)}`,'Simplificam-se fatores comuns entre numeradores e denominadores.',tex(correct)],division?'Divisão estratégica':'Multiplicação estratégica');
}

function problemQuestion(year,level){
 if(year===7){const [total,fraction]=pick(level===1?[[24,Q(1,3)],[30,Q(1,2)],[36,Q(1,4)]]:level===2?[[40,Q(3,5)],[48,Q(5,8)],[60,Q(7,12)]]:[[72,Q(7,9)],[84,Q(11,12)],[96,Q(13,16)]]),used=total*val(fraction),askRest=level>1&&Math.random()<.5,expected=askRest?total-used:used;return inputQuestion('numeric',askRest?`Uma biblioteca tinha ${total} livros para catalogar. Durante o dia foram catalogados \\(${tex(fraction)}\\) do total. Quantos livros ficaram por catalogar?`:`Numa coleção com ${total} cromos, \\(${tex(fraction)}\\) são de animais. Quantos cromos de animais há?`,'',expected,fmt(expected),askRest?[`${tex(fraction)}\\times${total}=${fmt(used)}`,`${total}-${fmt(used)}=${fmt(expected)}`]:[`${tex(fraction)}\\times${total}=${fmt(expected)}`],askRest?'Problema de várias etapas':'Problema com fração de uma quantidade')}
 const price=pick(level===1?[40,60,80]:level===2?[80,120,160]:[120,180,240]),rate=pick(level===1?[10,25,50]:level===2?[15,20,25]:[12.5,20,30]),discount=Math.random()<.55,expected=price*(discount?(1-rate/100):(1+rate/100));return inputQuestion('numeric',`Um artigo custava ${price} €. O preço sofreu ${discount?'um desconto':'um aumento'} de ${fmt(rate)}%. Qual é o novo preço, em euros?`,'',expected,fmt(expected),[`${fmt(100+(discount?-rate:rate))}\\%\\text{ de }${price}`,`${fmt((100+(discount?-rate:rate))/100)}\\times${price}=${fmt(expected)}`],discount?'Problema de desconto':'Problema de aumento percentual')
}

const generatorRegistry={
 equivalent:equivalentQuestion,properties:trueFalseQuestion,complete:completeQuestion,compare:signQuestion,
 order:orderQuestion,representation:representationQuestion,membership:membershipQuestion,
 numeric:numericQuestion,operation:operationQuestion,problem:problemQuestion
};
const generatorKeys=Object.keys(generatorRegistry);
function generatedQuestion(key,year,level,i=0){return{...generatorRegistry[key](year,level),generator:key,id:`RAC-${year}-${level}-${Date.now().toString(36)}-${key}-${i}-${Math.random().toString(36).slice(2,7)}`}}
function buildTest(year,level){return shuffle(generatorKeys.map((key,i)=>generatedQuestion(key,year,level,i)))}
function buildErrorTraining(year,level,failedKeys){
 const keys=failedKeys.filter(key=>generatorRegistry[key]);
 if(!keys.length)return[];
 return shuffle(Array.from({length:10},(_,i)=>generatedQuestion(keys[i%keys.length],year,level,i)));
}

function showMode(mode){const test=mode==='test';$('#freeMode').classList.toggle('hidden-mode',test);$('#testMode').classList.toggle('hidden-mode',!test);$('#freeModeBtn').classList.toggle('active',!test);$('#testModeBtn').classList.toggle('active',test);if(test)refreshResume()}
function save(){try{localStorage.setItem(storeKey,JSON.stringify(state))}catch{}}
function load(){try{return JSON.parse(localStorage.getItem(storeKey)||'null')}catch{return null}}
function clearSaved(){try{localStorage.removeItem(storeKey)}catch{}}
function refreshResume(){const saved=load();$('#resumeTest').classList.toggle('hidden-mode',!(saved&&saved.active&&!saved.finished))}
function resetTestViews(){['#testRunner','#testResult','#testReview'].forEach(id=>$(id).classList.add('hidden-mode'));$('#testSetup').classList.remove('hidden-mode')}
function openQuestions(questions,year,level,mode='test'){state={active:true,finished:false,year,level,mode,index:0,questions,answers:Array(questions.length).fill(null),score:null};save();$('#testSetup').classList.add('hidden-mode');$('#testResult').classList.add('hidden-mode');$('#testReview').classList.add('hidden-mode');$('#testRunner').classList.remove('hidden-mode');renderQuestion()}
function startTest(year=+$('#testYear').value,level=+$('#testLevel').value){openQuestions(buildTest(year,level),year,level,'test')}
function trainErrors(){
 const failed=[...new Set(state.questions.filter((q,i)=>!isCorrect(q,state.answers[i])).map(q=>q.generator).filter(Boolean))];
 const questions=buildErrorTraining(state.year,state.level,failed);
 if(questions.length)openQuestions(questions,state.year,state.level,'errors');
}
function resumeTest(){state=load();if(!state?.active)return;$('#testSetup').classList.add('hidden-mode');$('#testRunner').classList.remove('hidden-mode');renderQuestion()}

function renderQuestion(){const q=state.questions[state.index],answer=state.answers[state.index],total=state.questions.length;$('#testTags').textContent=`${state.year}.º ano · ${levelName[state.level]}${state.mode==='errors'?' · Treino dos erros':''}`;$('#testProgress').textContent=`Questão ${state.index+1} de ${total}`;$('#progressFill').style.width=`${(state.index+1)*100/total}%`;$('#testPrompt').innerHTML=esc(q.prompt);$('#testStatement').innerHTML=q.statement||'';const box=$('#testResponse');
 if(['choice','truefalse','sign','representation','membership'].includes(q.type)){const short=['truefalse','sign','membership'].includes(q.type);box.innerHTML=`<div class="${short?'short-options':'answer-options'}">${q.options.map((o,i)=>`<button class="option-btn ${answer===i?'selected':''}" data-option="${i}"><span class="option-key">${String.fromCharCode(65+i)}</span><span>\\(${o.text}\\)</span></button>`).join('')}</div>`;box.querySelectorAll('[data-option]').forEach(b=>b.onclick=()=>{state.answers[state.index]=+b.dataset.option;save();renderQuestion()})}
 else if(q.type==='fill'||q.type==='numeric'){box.innerHTML=`<div class="test-input-wrap"><input id="testInput" class="test-input" inputmode="decimal" autocomplete="off" placeholder="Escreve a resposta" value="${esc(answer??'')}"></div><p class="test-intro" style="text-align:center">Podes usar vírgula, ponto ou uma fração como 1/2.</p>`;const input=$('#testInput');input.oninput=()=>{state.answers[state.index]=input.value;save();renderDots()};setTimeout(()=>input.focus(),0)}
 else if(q.type==='order'){const chosen=Array.isArray(answer)?answer:[],available=q.cards.filter(c=>!chosen.includes(c.id));box.innerHTML=`<p class="test-intro">Cartões disponíveis</p><div class="order-bank">${available.map(c=>`<button class="order-card" data-add="${c.id}">\\(${c.text}\\)</button>`).join('')||'<span>Todos os cartões foram usados.</span>'}</div><p class="test-intro">A tua ordenação</p><div class="order-answer">${chosen.map(id=>{const c=q.cards.find(x=>x.id===id);return`<button class="order-card" data-remove="${id}">\\(${c.text}\\)</button>`}).join('')||'<span>Toca nos cartões pela ordem crescente.</span>'}</div><button id="resetOrder" style="width:auto;display:block;margin:auto">Recomeçar ordenação</button>`;box.querySelectorAll('[data-add]').forEach(b=>b.onclick=()=>{state.answers[state.index]=[...chosen,b.dataset.add];save();renderQuestion()});box.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{const copy=[...chosen],i=copy.indexOf(b.dataset.remove);copy.splice(i,1);state.answers[state.index]=copy;save();renderQuestion()});$('#resetOrder').onclick=()=>{state.answers[state.index]=[];save();renderQuestion()}}
 renderDots();$('#previousQuestion').disabled=state.index===0;$('#nextQuestion').disabled=state.index===total-1;typeset()
}
function answered(i){const a=state.answers[i],q=state.questions[i];return q.type==='order'?Array.isArray(a)&&a.length===q.cards.length:a!==null&&String(a).trim()!==''}
function renderDots(){$('#questionDots').innerHTML=state.questions.map((q,i)=>`<button class="question-dot ${i===state.index?'current':''} ${answered(i)?'answered':''}" data-question="${i}" aria-label="Questão ${i+1}">${i+1}</button>`).join('');$('#questionDots').querySelectorAll('[data-question]').forEach(b=>b.onclick=()=>{state.index=+b.dataset.question;save();renderQuestion()})}
function isCorrect(q,a){if(['choice','truefalse','sign','representation','membership'].includes(q.type))return a===q.correct;if(q.type==='fill'||q.type==='numeric')return numericEqual(a,q.expected);if(q.type==='order')return Array.isArray(a)&&a.length===q.correctOrder.length&&a.every((id,i)=>id===q.correctOrder[i]);return false}
function finish(){const missing=state.questions.map((q,i)=>answered(i)?null:i+1).filter(Boolean);if(missing.length&&!confirm(`Ainda tens ${missing.length} ${missing.length===1?'questão por responder':'questões por responder'}. Queres terminar mesmo assim?`))return;state.score=state.questions.reduce((n,q,i)=>n+(isCorrect(q,state.answers[i])?1:0),0);state.finished=true;save();showResult()}
function resultText(score){return score<=4?'Ainda precisas de rever este conteúdo. A revisão mostra-te onde melhorar.':score<=6?'Estás a progredir. Revê os erros e tenta novamente.':score<=8?'Bom domínio do conteúdo. Revê as questões em que tiveste dificuldade.':'Excelente domínio do conteúdo!'}
function showResult(){const total=state.questions.length,hasErrors=state.score<total;$('#testRunner').classList.add('hidden-mode');$('#testReview').classList.add('hidden-mode');$('#testResult').classList.remove('hidden-mode');$('#resultTitle').textContent=state.mode==='errors'?'Resultado do treino dos erros':'Resultado do teste';$('#resultScore').textContent=`${state.score}/${total}`;$('#resultMessage').textContent=!hasErrors&&state.mode==='errors'?'Muito bem! Corrigiste todas as dificuldades neste treino.':resultText(state.score);$('#trainErrors').classList.toggle('hidden-mode',!hasErrors)}
function displayAnswer(q,a){if(a===null||a===''||Array.isArray(a)&&!a.length)return 'Sem resposta';if(['choice','truefalse','sign','representation','membership'].includes(q.type))return `\\(${q.options[a]?.text??'—'}\\)`;if(q.type==='order')return a.map(id=>`\\(${q.cards.find(c=>c.id===id)?.text??'?'}\\)`).join(' &lt; ');return esc(a)}
function correctDisplay(q){if(q.type==='order')return q.correctOrder.map(id=>`\\(${q.cards.find(c=>c.id===id).text}\\)`).join(' &lt; ');return `\\(${q.answerTex}\\)`}
function feedbackFor(q,a){if(['choice','truefalse','sign','representation','membership'].includes(q.type)&&Number.isInteger(a))return q.options[a]?.feedback||'Revê o procedimento apresentado na resolução.';if(q.type==='order')return 'A sequência não está integralmente por ordem crescente.';return 'O valor introduzido não é equivalente à resposta correta.'}
function review(){const list=$('#reviewList');list.innerHTML=state.questions.map((q,i)=>{const ok=isCorrect(q,state.answers[i]),steps=Array.isArray(q.steps)?q.steps:[q.steps];return`<article class="review-card ${ok?'correct':'wrong'}"><div class="review-title"><span>Questão ${i+1} · ${esc(q.topic)}</span><span>${ok?'✓ Correta':'✗ A rever'}</span></div><div class="test-question">${esc(q.prompt)}</div><div class="test-statement">${q.statement||''}</div><div class="review-answer user"><strong>A tua resposta:</strong> ${displayAnswer(q,state.answers[i])}</div>${ok?'':`<div class="feedback">${esc(feedbackFor(q,state.answers[i]))}</div>`}<div class="review-answer correct-answer"><strong>Resposta correta:</strong> ${correctDisplay(q)}</div><div>${steps.filter(Boolean).map(s=>`<div class="step"><div class="math">\\[${s}\\]</div></div>`).join('')}</div></article>`}).join('');$('#testResult').classList.add('hidden-mode');$('#testReview').classList.remove('hidden-mode');typeset()}

$('#freeModeBtn').onclick=()=>showMode('free');$('#testModeBtn').onclick=()=>showMode('test');$('#startTest').onclick=()=>startTest();$('#resumeTest').onclick=resumeTest;$('#previousQuestion').onclick=()=>{if(state.index>0){state.index--;save();renderQuestion()}};$('#nextQuestion').onclick=()=>{if(state.index<state.questions.length-1){state.index++;save();renderQuestion()}};$('#finishTest').onclick=finish;$('#reviewTest').onclick=review;$('#trainErrors').onclick=trainErrors;$('#closeReview').onclick=showResult;$('#newTest').onclick=()=>{clearSaved();state=null;resetTestViews();refreshResume()};
window.__rationalsTest={buildTest,buildErrorTraining,isCorrect,parseNumber,startTest};refreshResume();
})();
